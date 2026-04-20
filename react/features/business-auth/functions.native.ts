import { Platform } from 'react-native';
import jwtDecode from 'jwt-decode';
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
import {
    getSecureStorageItem,
    removeSecureStorageItems,
    setSecureStorageItem
} from './secureStorage.native';

const BUSINESS_AUTH_PREFERENCES_NAME = 'jitsi-business-auth-preferences';
const DEVICE_ID_KEY = 'businessAuthDeviceId';
const SESSION_KEY = 'businessAuthSession';
const BUSINESS_AUTH_SERVICE_URL = 'https://admin.fangxinbanmeet.com';
const SECURE_DEVICE_ID_KEY = 'businessAuth.deviceId';
const SECURE_SESSION_KEY = 'businessAuth.session';

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
    tokenExpiresAt?: number | string;
    userId?: number;
    username?: string;
    exp?: number;
    expiresAt?: number | string;
}

interface IBusinessAuthResponsePayload {
    accessToken?: string;
    data?: IBusinessAuthResponseData;
    jwt?: string;
    message?: string;
    success?: boolean;
    token?: string;
    tokenExpiresAt?: number | string;
    exp?: number;
    expiresAt?: number | string;
}

interface IBusinessAuthJwtPayload {
    exp?: number;
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

async function _clearLegacyPersistedBusinessAuthSession() {
    await _prepareBusinessAuthPreferences();
    await DefaultPreference.clearMultiple([ SESSION_KEY ]);
}

async function _getLegacyPersistedSession(): Promise<IBusinessAuthSession | undefined> {
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
    const secureDeviceId = await getSecureStorageItem(SECURE_DEVICE_ID_KEY);

    if (secureDeviceId) {
        return secureDeviceId;
    }

    await _prepareBusinessAuthPreferences();

    const legacyDeviceId = await DefaultPreference.get(DEVICE_ID_KEY);

    if (legacyDeviceId) {
        try {
            await _persistSecureDeviceId(legacyDeviceId);
        } catch (error) {
            logger.warn('Failed to migrate device id into secure storage, keeping legacy cache');
        }
    }

    return legacyDeviceId;
}

async function _getPersistedSession(): Promise<IBusinessAuthSession | undefined> {
    const rawSecureSession = await getSecureStorageItem(SECURE_SESSION_KEY);

    if (rawSecureSession) {
        try {
            return _normalizePersistedSession(rawSecureSession);
        } catch (error) {
            logger.warn('Failed to parse secure business session, clearing corrupted state');
            await removeSecureStorageItems([ SECURE_SESSION_KEY ]);

            return undefined;
        }
    }

    const legacySession = await _getLegacyPersistedSession();

    if (legacySession) {
        try {
            await persistBusinessAuthSession(legacySession);
            await _clearLegacyPersistedBusinessAuthSession();
        } catch (error) {
            logger.warn('Failed to migrate business session into secure storage, using legacy cache for now');
        }
    }

    return legacySession;
}

async function _persistLegacyDeviceId(deviceId: string) {
    await _prepareBusinessAuthPreferences();
    await DefaultPreference.set(DEVICE_ID_KEY, deviceId);
}

async function _persistSecureDeviceId(deviceId: string) {
    await setSecureStorageItem(SECURE_DEVICE_ID_KEY, deviceId);
}

async function _persistDeviceId(deviceId: string) {
    let secureStoragePersisted = false;

    try {
        await _persistSecureDeviceId(deviceId);
        secureStoragePersisted = true;
    } catch (error) {
        logger.warn('Failed to persist device id in secure storage, falling back to legacy cache');
    }

    try {
        await _persistLegacyDeviceId(deviceId);
    } catch (error) {
        if (!secureStoragePersisted) {
            throw error;
        }

        logger.warn('Failed to update legacy device id cache, continuing with secure storage only');
    }
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
        tokenExpiresAt: session?.tokenExpiresAt,
        user: session?.user
    };
}

export async function clearPersistedBusinessAuthSession() {
    await Promise.all([
        removeSecureStorageItems([ SECURE_SESSION_KEY ]),
        _clearLegacyPersistedBusinessAuthSession()
    ]);
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

function _normalizeTokenExpiresAt(value?: number | string) {
    if (typeof value === 'number' && Number.isFinite(value)) {
        const timestamp = value > 1_000_000_000_000 ? value : value * 1000;

        return new Date(timestamp).toISOString();
    }

    if (typeof value === 'string') {
        const trimmedValue = value.trim();

        if (!trimmedValue) {
            return undefined;
        }

        if (/^\d+$/.test(trimmedValue)) {
            return _normalizeTokenExpiresAt(Number(trimmedValue));
        }

        const parsedDate = new Date(trimmedValue);

        if (!Number.isNaN(parsedDate.getTime())) {
            return parsedDate.toISOString();
        }
    }

    return undefined;
}

export function extractBusinessAuthTokenExpiresAt(payload?: IBusinessAuthResponsePayload, token?: string) {
    const normalizedExpiration = _normalizeTokenExpiresAt(
        payload?.data?.tokenExpiresAt
            || payload?.data?.expiresAt
            || payload?.data?.exp
            || payload?.tokenExpiresAt
            || payload?.expiresAt
            || payload?.exp
    );

    if (normalizedExpiration) {
        return normalizedExpiration;
    }

    const resolvedToken = token || extractBusinessAuthToken(payload);

    if (!resolvedToken) {
        return undefined;
    }

    try {
        const decodedToken = jwtDecode<IBusinessAuthJwtPayload>(resolvedToken);

        return _normalizeTokenExpiresAt(decodedToken?.exp);
    } catch (error) {
        logger.warn('Failed to decode business auth token expiration', error);
    }

    return undefined;
}

export function mapBusinessAuthUser(
        data?: IBusinessAuthResponseData,
        fallbackUsername?: string,
        fallbackUser?: IBusinessAuthUser): IBusinessAuthUser {
    return {
        boundDeviceId: data?.boundDeviceId ?? fallbackUser?.boundDeviceId,
        deviceBoundAt: data?.deviceBoundAt ?? fallbackUser?.deviceBoundAt,
        deviceBoundNow: data?.deviceBoundNow ?? fallbackUser?.deviceBoundNow,
        deviceName: data?.deviceName ?? fallbackUser?.deviceName,
        devicePlatform: data?.devicePlatform ?? fallbackUser?.devicePlatform,
        lastLoginAt: data?.lastLoginAt ?? fallbackUser?.lastLoginAt,
        nickname: data?.nickname ?? fallbackUser?.nickname,
        userId: data?.userId ?? fallbackUser?.userId,
        username: data?.username || fallbackUsername || fallbackUser?.username || ''
    };
}

export async function persistBusinessAuthSession(session: IBusinessAuthSession, deviceId?: string) {
    await setSecureStorageItem(SECURE_SESSION_KEY, JSON.stringify(session));

    try {
        await _clearLegacyPersistedBusinessAuthSession();
    } catch (error) {
        logger.warn('Failed to clear legacy business session cache after secure persistence');
    }

    if (deviceId) {
        await _persistDeviceId(deviceId);
    }
}

export type {
    IBusinessAuthDeviceInfo,
    IBusinessAuthPendingNavigation,
    IBusinessAuthSession,
    IBusinessAuthUser
};
