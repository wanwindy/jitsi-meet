import { NativeModules } from 'react-native';

import logger from './logger';

interface ISecureStorageModule {
    getItem: (key: string) => Promise<string | null | undefined>;
    removeItems: (keys: string[]) => Promise<void>;
    setItem: (key: string, value: string) => Promise<void>;
}

const secureStorageModule = (NativeModules.SecureStorage || NativeModules.BusinessAuthSecureStorage) as
    | ISecureStorageModule
    | undefined;

function _getSecureStorageModule() {
    if (!secureStorageModule) {
        throw new Error('SecureStorage native module is unavailable.');
    }

    return secureStorageModule;
}

export async function getSecureStorageItem(key: string) {
    try {
        const value = await _getSecureStorageModule().getItem(key);

        return value ?? undefined;
    } catch (error) {
        logger.warn(`Failed to read secure storage item: ${key}`, error);

        return undefined;
    }
}

export async function removeSecureStorageItems(keys: string[]) {
    if (!keys.length) {
        return;
    }

    try {
        await _getSecureStorageModule().removeItems(keys);
    } catch (error) {
        logger.warn(`Failed to remove secure storage items: ${keys.join(', ')}`, error);
    }
}

export async function setSecureStorageItem(key: string, value: string) {
    try {
        await _getSecureStorageModule().setItem(key, value);
    } catch (error) {
        logger.warn(`Failed to persist secure storage item: ${key}`, error);
        throw error;
    }
}
