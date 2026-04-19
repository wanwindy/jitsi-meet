import { IStore } from '../app/types';

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
    getCurrentBusinessAuthDeviceInfo,
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
        let user;

        try {
            const restoredState = await bootstrapBusinessAuthState();

            deviceInfo = restoredState.deviceInfo;
            user = restoredState.user;
        } catch (error) {
            logger.warn('Failed to bootstrap business auth state, continuing with a fresh device context');
            deviceInfo = await getCurrentBusinessAuthDeviceInfo();
        }

        dispatch({
            deviceInfo,
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
            const response = await fetch(getBusinessAuthLoginEndpoint(getState()), {
                body: JSON.stringify({
                    appVersion: deviceInfo.appVersion,
                    deviceId: deviceInfo.deviceId,
                    deviceName: deviceInfo.deviceName,
                    password: trimmedPassword,
                    platform: deviceInfo.platform,
                    username: trimmedUsername
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
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

            const user = {
                boundDeviceId: payload.data.boundDeviceId,
                deviceBoundAt: payload.data.deviceBoundAt,
                deviceBoundNow: payload.data.deviceBoundNow,
                deviceName: payload.data.deviceName,
                devicePlatform: payload.data.devicePlatform,
                lastLoginAt: payload.data.lastLoginAt,
                nickname: payload.data.nickname,
                userId: payload.data.userId,
                username: payload.data.username || trimmedUsername
            };

            await persistBusinessAuthSession(user);

            dispatch({
                deviceInfo,
                type: BUSINESS_AUTH_LOGIN_SUCCEEDED,
                user
            });

            return {
                message: payload.message || '登录成功',
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
    return async (dispatch: IStore['dispatch']) => {
        await clearPersistedBusinessAuthSession();

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
