export interface IBusinessAuthDeviceInfo {
    appVersion: string;
    deviceId: string;
    deviceName: string;
    platform: string;
}

export interface IBusinessAuthPendingNavigation {
    hidePrejoin?: boolean;
    meetingEntryType?: 'create' | 'join';
    skipConnect?: boolean;
    uri: string;
}

export interface IBusinessAuthSession {
    token?: string;
    tokenExpiresAt?: string;
    user?: IBusinessAuthUser;
}

export interface IBusinessAuthUser {
    boundDeviceId?: string;
    deviceBoundAt?: string;
    deviceBoundNow?: boolean;
    deviceName?: string;
    devicePlatform?: string;
    lastLoginAt?: string;
    nickname?: string;
    userId?: number;
    username: string;
}
