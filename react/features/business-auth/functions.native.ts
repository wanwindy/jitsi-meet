import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import DefaultPreference from 'react-native-default-preference';
import { v4 as uuidv4 } from 'uuid';

import { getDefaultURL } from '../app/functions.native';
import { IReduxState } from '../app/types';
import { toState } from '../base/redux/functions';

import logger from './logger';
import {
    IBusinessAuthDeviceInfo,
    IBusinessAuthPendingNavigation,
    IBusinessAuthUser
} from './types';

const BUSINESS_AUTH_PREFERENCES_NAME = 'jitsi-business-auth-preferences';
const DEVICE_ID_KEY = 'businessAuthDeviceId';
const SESSION_KEY = 'businessAuthSession';

type IStateful = IReduxState | (() => IReduxState);

interface IBusinessAuthResponseData {
    boundDeviceId?: string;
    deviceBoundAt?: string;
    deviceBoundNow?: boolean;
    deviceName?: string;
    devicePlatform?: string;
    lastLoginAt?: string;
    nickname?: string;
    userId?: number;
    username?: string;
}

interface IBusinessAuthResponsePayload {
    data?: IBusinessAuthResponseData;
    message?: string;
    success?: boolean;
}

async function _prepareBusinessAuthPreferences() {
    await DefaultPreference.setName(BUSINESS_AUTH_PREFERENCES_NAME);
}

async function _getPersistedSession(): Promise<IBusinessAuthUser | undefined> {
    await _prepareBusinessAuthPreferences();

    const rawSession = await DefaultPreference.get(SESSION_KEY);

    if (!rawSession) {
        return undefined;
    }

    try {
        return JSON.parse(rawSession) as IBusinessAuthUser;
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

function _getBusinessAuthOrigin(stateful: IStateful) {
    const state = toState(stateful);
    const location = state['features/base/connection'].locationURL
        || state['features/base/config'].locationURL;
    const base = location?.toString() || getDefaultURL(state);

    return new URL(base);
}

export async function bootstrapBusinessAuthState() {
    const [ deviceInfo, user ] = await Promise.all([
        getCurrentBusinessAuthDeviceInfo(),
        _getPersistedSession()
    ]);

    return {
        deviceInfo,
        user
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

export function getBusinessAuthLoginEndpoint(stateful: IStateful) {
    return new URL('/api/auth/login', _getBusinessAuthOrigin(stateful)).toString();
}

export function getBusinessAuthPendingNavigation(state: IReduxState) {
    return state['features/business-auth'].pendingNavigation;
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

export async function persistBusinessAuthSession(user: IBusinessAuthUser) {
    await _prepareBusinessAuthPreferences();
    await DefaultPreference.set(SESSION_KEY, JSON.stringify(user));
}

export type {
    IBusinessAuthDeviceInfo,
    IBusinessAuthPendingNavigation,
    IBusinessAuthUser
};
