import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import DefaultPreference from 'react-native-default-preference';
import { v4 as uuidv4 } from 'uuid';

import { IReduxState } from '../app/types';

import logger from './logger';
import {
    IBusinessAuthDeviceInfo,
    IBusinessAuthPendingNavigation,
    IBusinessAuthSession,
    IBusinessAuthUser
} from './types';

const BUSINESS_AUTH_PREFERENCES_NAME = 'jitsi-business-auth-preferences';
const DEVICE_ID_KEY = 'businessAuthDeviceId';
const SESSION_KEY = 'businessAuthSession';
const BUSINESS_AUTH_SERVICE_URL = 'https://admin.fangxinbanmeet.com';

interface IBusinessAuthResponseData {
    accessToken?: string;
    boundDeviceId?: string;
    deviceBoundAt?: string;
    deviceBoundNow?: boolean;
    deviceName?: string;
    devicePlatform?: string;
    jwt?: string;
    lastLoginAt?: string;
    nickname?: string;
    token?: string;
    userId?: number;
    username?: string;
}

interface IBusinessAuthResponsePayload {
    accessToken?: string;
    data?: IBusinessAuthResponseData;
    jwt?: string;
    message?: string;
    success?: boolean;
    token?: string;
}

async function _prepareBusinessAuthPreferences() {
    await DefaultPreference.setName(BUSINESS_AUTH_PREFERENCES_NAME);
}

function _normalizePersistedSession(rawSession: string): IBusinessAuthSession | undefined {
    const parsedSession = JSON.parse(rawSession) as IBusinessAuthSession | IBusinessAuthUser | undefined;

    if (!parsedSession || typeof parsedSession !== 'object') {
        return undefined;
    }

    if ('user' in parsedSession || 'token' in parsedSession) {
        return parsedSession as IBusinessAuthSession;
    }

    if ('username' in parsedSession) {
        return {
            user: parsedSession as IBusinessAuthUser
        };
    }

    return undefined;
}

async function _getPersistedSession(): Promise<IBusinessAuthSession | undefined> {
    await _prepareBusinessAuthPreferences();

    const rawSession = await DefaultPreference.get(SESSION_KEY);

    if (!rawSession) {
        return undefined;
    }

    try {
        return _normalizePersistedSession(rawSession);
    } catch (error) {
        logger.warn('Failed to parse persisted business session, clearing corrupted state');
        await DefaultPreference.clearMultiple([ SESSION_KEY ]);

        return undefined;
    }
}

async function _getPersistedDeviceId() {
    await _prepareBusinessAuthPreferences();

    return DefaultPreference.get(DEVICE_ID_KEY);
}

async function _persistDeviceId(deviceId: string) {
    await _prepareBusinessAuthPreferences();
    await DefaultPreference.set(DEVICE_ID_KEY, deviceId);
}

async function _resolveDeviceName() {
    try {
        const deviceName = await DeviceInfo.getDeviceName();

        if (deviceName) {
            return deviceName;
        }
    } catch (error) {
        logger.warn('Failed to read device name, falling back to model');
    }

    return DeviceInfo.getModel();
}

function _getPlatformLabel() {
    return Platform.OS === 'ios' ? 'iOS' : 'Android';
}

function _getAppVersion() {
    return DeviceInfo.getReadableVersion?.() || DeviceInfo.getVersion();
}

export async function bootstrapBusinessAuthState() {
    const [ deviceInfo, session ] = await Promise.all([
        getCurrentBusinessAuthDeviceInfo(),
        _getPersistedSession()
    ]);

    return {
        deviceInfo,
        token: session?.token,
        user: session?.user
    };
}

export async function clearPersistedBusinessAuthSession() {
    await _prepareBusinessAuthPreferences();
    await DefaultPreference.clearMultiple([ SESSION_KEY ]);
}

export async function getCurrentBusinessAuthDeviceInfo(
        existingDeviceId?: string): Promise<IBusinessAuthDeviceInfo> {
    let deviceId = existingDeviceId;

    if (!deviceId) {
        try {
            deviceId = await _getPersistedDeviceId();
        } catch (error) {
            logger.warn('Failed to restore device id, generating a fallback id');
        }
    }

    if (!deviceId) {
        deviceId = uuidv4();

        try {
            await _persistDeviceId(deviceId);
        } catch (error) {
            logger.warn('Failed to persist generated device id, continuing with an in-memory fallback');
        }
    }

    return {
        appVersion: _getAppVersion(),
        deviceId,
        deviceName: await _resolveDeviceName(),
        platform: _getPlatformLabel()
    };
}

export function getBusinessAuthDeviceInfo(state: IReduxState) {
    return state['features/business-auth'].deviceInfo;
}

export function getBusinessAuthDisplayName(state: IReduxState) {
    const user = getBusinessAuthUser(state);

    return user?.nickname || user?.username || '';
}

export function getBusinessAuthErrorMessage(status?: number, fallbackMessage?: string) {
    switch (status) {
    case 401:
        return '账号或密码错误';
    case 403:
        return '账号已禁用，请联系管理员';
    case 409:
        return '账号已绑定其他设备，请联系管理员解绑';
    default:
        return fallbackMessage || '网络异常，请稍后重试';
    }
}

/**
 * Business APIs must always target the admin service, while meeting pages and
 * the Jitsi SDK continue using the conference domain.
 */
function _getBusinessAuthEndpoint(pathname: string) {
    return new URL(pathname, BUSINESS_AUTH_SERVICE_URL).toString();
}

export function getBusinessAuthLoginEndpoint() {
    return _getBusinessAuthEndpoint('/api/auth/login');
}

export function getBusinessAuthMeEndpoint() {
    return _getBusinessAuthEndpoint('/api/auth/me');
}

export function getBusinessAuthLogoutEndpoint() {
    return _getBusinessAuthEndpoint('/api/auth/logout');
}

export function getBusinessAuthPendingNavigation(state: IReduxState) {
    return state['features/business-auth'].pendingNavigation;
}

export function getBusinessAuthToken(state: IReduxState) {
    return state['features/business-auth'].token;
}

export function getBusinessAuthUser(state: IReduxState) {
    return state['features/business-auth'].user;
}

export function isBusinessAuthHydrated(state: IReduxState) {
    return state['features/business-auth'].hydrated;
}

export function isBusinessAuthLoggedIn(state: IReduxState) {
    return state['features/business-auth'].isLoggedIn;
}

export async function parseBusinessAuthResponse(response: Response): Promise<IBusinessAuthResponsePayload | undefined> {
    const rawText = await response.text();

    if (!rawText) {
        return undefined;
    }

    try {
        return JSON.parse(rawText) as IBusinessAuthResponsePayload;
    } catch (error) {
        logger.warn('Received a non-JSON response from business login endpoint');

        return undefined;
    }
}

export function getBusinessAuthRequestHeaders(token?: string, includeJsonContentType = false) {
    const headers: Record<string, string> = {
        Accept: 'application/json'
    };

    if (includeJsonContentType) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
}

export function extractBusinessAuthToken(payload?: IBusinessAuthResponsePayload) {
    return payload?.data?.token
        || payload?.data?.jwt
        || payload?.data?.accessToken
        || payload?.token
        || payload?.jwt
        || payload?.accessToken;
}

export function mapBusinessAuthUser(data?: IBusinessAuthResponseData, fallbackUsername?: string): IBusinessAuthUser {
    return {
        boundDeviceId: data?.boundDeviceId,
        deviceBoundAt: data?.deviceBoundAt,
        deviceBoundNow: data?.deviceBoundNow,
        deviceName: data?.deviceName,
        devicePlatform: data?.devicePlatform,
        lastLoginAt: data?.lastLoginAt,
        nickname: data?.nickname,
        userId: data?.userId,
        username: data?.username || fallbackUsername || ''
    };
}

export async function persistBusinessAuthSession(session: IBusinessAuthSession) {
    await _prepareBusinessAuthPreferences();
    await DefaultPreference.set(SESSION_KEY, JSON.stringify(session));
}

export type {
    IBusinessAuthDeviceInfo,
    IBusinessAuthPendingNavigation,
    IBusinessAuthSession,
    IBusinessAuthUser
};
