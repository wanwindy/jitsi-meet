import { appNavigate } from '../app/actions.native';
import { IStore } from '../app/types';
import {
    clearStoredLoginCredentials,
    getStoredLoginCredentials,
    persistStoredLoginCredentials
} from '../authentication/functions.native';
import { connect as connectAction } from '../base/connection/actions.native';
import { toJid } from '../base/connection/functions';
import { navigateRoot } from '../mobile/navigation/rootNavigationContainerRef';
import { screen } from '../mobile/navigation/routes';

import {
    BUSINESS_AUTH_BOOTSTRAP_FINISHED,
    BUSINESS_AUTH_LOGIN_FAILED,
    BUSINESS_AUTH_LOGIN_STARTED,
    BUSINESS_AUTH_LOGIN_SUCCEEDED,
    BUSINESS_AUTH_LOGOUT,
    CLEAR_PENDING_BUSINESS_AUTH_NAVIGATION,
    SET_PENDING_BUSINESS_AUTH_NAVIGATION
} from './actionTypes';
import {
    bootstrapBusinessAuthState,
    clearPersistedBusinessAuthSession,
    getBusinessAuthErrorMessage,
    getBusinessAuthLoginEndpoint,
    getBusinessAuthLogoutEndpoint,
    getBusinessAuthMeEndpoint,
    getBusinessAuthRequestHeaders,
    getCurrentBusinessAuthDeviceInfo,
    extractBusinessAuthToken,
    mapBusinessAuthUser,
    parseBusinessAuthResponse,
    persistBusinessAuthSession
} from './functions';
import logger from './logger';
import { IBusinessAuthPendingNavigation } from './types';

interface IBusinessAuthActionError extends Error {
    status?: number;
}

function _createBusinessAuthActionError(message: string, status?: number) {
    const error = new Error(message) as IBusinessAuthActionError;

    error.status = status;

    return error;
}

export function bootstrapBusinessAuth() {
    return async (dispatch: IStore['dispatch']) => {
        let deviceInfo;
        let token;
        let user;

        try {
            const restoredState = await bootstrapBusinessAuthState();

            deviceInfo = restoredState.deviceInfo;
            token = restoredState.token;
            user = restoredState.user;

            if (token) {
                try {
                    const response = await fetch(getBusinessAuthMeEndpoint(), {
                        headers: getBusinessAuthRequestHeaders(token),
                        method: 'GET'
                    });
                    const payload = await parseBusinessAuthResponse(response);

                    if (response.ok && payload?.success && payload.data) {
                        user = mapBusinessAuthUser(payload.data, user?.username);
                        await persistBusinessAuthSession({
                            token,
                            user
                        });
                    } else if (response.status === 401 || response.status === 403) {
                        await Promise.all([
                            clearPersistedBusinessAuthSession(),
                            clearStoredLoginCredentials()
                        ]);
                        token = undefined;
                        user = undefined;
                    } else {
                        logger.warn(`Failed to validate persisted business token, keeping local session (status: ${response.status})`);
                    }
                } catch (error) {
                    logger.warn('Failed to validate persisted business token, keeping local session', error);
                }
            }
        } catch (error) {
            logger.warn('Failed to bootstrap business auth state, continuing with a fresh device context');
            deviceInfo = await getCurrentBusinessAuthDeviceInfo();
        }

        dispatch({
            deviceInfo,
            token,
            type: BUSINESS_AUTH_BOOTSTRAP_FINISHED,
            user
        });
    };
}

export function clearPendingBusinessAuthNavigation() {
    return {
        type: CLEAR_PENDING_BUSINESS_AUTH_NAVIGATION
    };
}

export function continuePendingBusinessAuthNavigation(pendingNavigation: IBusinessAuthPendingNavigation) {
    return async (dispatch: IStore['dispatch']) => {
        if (pendingNavigation.meetingEntryType === 'create') {
            await dispatch(startAuthenticatedHostMeeting(pendingNavigation.uri, pendingNavigation.hidePrejoin));

            return;
        }

        await dispatch(appNavigate(pendingNavigation.uri, pendingNavigation));
    };
}

export function loginBusinessAccount(username: string, password: string) {
    return async (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        if (!trimmedUsername || !trimmedPassword) {
            throw _createBusinessAuthActionError('请输入账号和密码。');
        }

        const existingDeviceId = getState()['features/business-auth'].deviceInfo?.deviceId;

        dispatch({
            type: BUSINESS_AUTH_LOGIN_STARTED
        });

        const deviceInfo = await getCurrentBusinessAuthDeviceInfo(existingDeviceId);

        try {
            const response = await fetch(getBusinessAuthLoginEndpoint(), {
                body: JSON.stringify({
                    appVersion: deviceInfo.appVersion,
                    deviceId: deviceInfo.deviceId,
                    deviceName: deviceInfo.deviceName,
                    password: trimmedPassword,
                    platform: deviceInfo.platform,
                    username: trimmedUsername
                }),
                headers: getBusinessAuthRequestHeaders(undefined, true),
                method: 'POST'
            });
            const payload = await parseBusinessAuthResponse(response);

            if (!response.ok || !payload?.success || !payload.data) {
                const errorMessage = getBusinessAuthErrorMessage(response.status, payload?.message);

                dispatch({
                    deviceInfo,
                    error: errorMessage,
                    type: BUSINESS_AUTH_LOGIN_FAILED
                });

                throw _createBusinessAuthActionError(errorMessage, response.status);
            }

            const token = extractBusinessAuthToken(payload);
            const user = mapBusinessAuthUser(payload.data, trimmedUsername);

            await Promise.all([
                persistBusinessAuthSession({
                    token,
                    user
                }),
                persistStoredLoginCredentials(trimmedUsername, trimmedPassword)
            ]);

            dispatch({
                deviceInfo,
                token,
                type: BUSINESS_AUTH_LOGIN_SUCCEEDED,
                user
            });

            return {
                message: payload.message || '登录成功',
                token,
                user
            };
        } catch (error: any) {
            if (error?.status) {
                throw error;
            }

            logger.warn('Business login request failed', error);

            const errorMessage = getBusinessAuthErrorMessage(undefined);

            dispatch({
                deviceInfo,
                error: errorMessage,
                type: BUSINESS_AUTH_LOGIN_FAILED
            });

            throw _createBusinessAuthActionError(errorMessage);
        }
    };
}

export function logoutBusinessAccount() {
    return async (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const token = getState()['features/business-auth'].token;

        if (token) {
            try {
                await fetch(getBusinessAuthLogoutEndpoint(), {
                    headers: getBusinessAuthRequestHeaders(token),
                    method: 'POST'
                });
            } catch (error) {
                logger.warn('Business logout request failed, clearing local session anyway', error);
            }
        }

        await Promise.all([
            clearPersistedBusinessAuthSession(),
            clearStoredLoginCredentials()
        ]);

        dispatch({
            type: BUSINESS_AUTH_LOGOUT
        });
    };
}

export function setPendingBusinessAuthNavigation(pendingNavigation: IBusinessAuthPendingNavigation) {
    return {
        pendingNavigation,
        type: SET_PENDING_BUSINESS_AUTH_NAVIGATION
    };
}

export function startAuthenticatedHostMeeting(room: string, hidePrejoin = true) {
    return async (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const credentials = await getStoredLoginCredentials();

        if (!credentials) {
            await dispatch(logoutBusinessAccount());
            throw _createBusinessAuthActionError('主持人登录状态已失效，请重新登录主持人账号后再试。');
        }

        await dispatch(appNavigate(room, {
            hidePrejoin,
            meetingEntryType: 'create',
            skipConnect: true
        }));

        if (getState()['features/base/conference'].room !== room) {
            throw _createBusinessAuthActionError('会议初始化失败，请稍后重试。');
        }

        const configHosts = getState()['features/base/config'].hosts;
        const jid = toJid(credentials.username, configHosts ?? {});

        void dispatch(connectAction(jid, credentials.password));
        navigateRoot(screen.conference.root);
    };
}
