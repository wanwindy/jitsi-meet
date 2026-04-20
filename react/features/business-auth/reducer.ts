import ReducerRegistry from '../base/redux/ReducerRegistry';
import { assign } from '../base/redux/functions';

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
    IBusinessAuthDeviceInfo,
    IBusinessAuthPendingNavigation,
    IBusinessAuthUser
} from './types';

export interface IBusinessAuthState {
    deviceInfo?: IBusinessAuthDeviceInfo;
    error?: string;
    hydrated: boolean;
    isLoggedIn: boolean;
    isSubmitting: boolean;
    pendingNavigation?: IBusinessAuthPendingNavigation;
    token?: string;
    user?: IBusinessAuthUser;
}

const DEFAULT_STATE: IBusinessAuthState = {
    hydrated: false,
    isLoggedIn: false,
    isSubmitting: false
};

ReducerRegistry.register<IBusinessAuthState>('features/business-auth',
(state = DEFAULT_STATE, action): IBusinessAuthState => {
    switch (action.type) {
    case BUSINESS_AUTH_BOOTSTRAP_FINISHED:
        return assign(state, {
            deviceInfo: action.deviceInfo,
            error: undefined,
            hydrated: true,
            isLoggedIn: Boolean(action.user),
            token: action.token,
            user: action.user
        });

    case BUSINESS_AUTH_LOGIN_STARTED:
        return assign(state, {
            error: undefined,
            isSubmitting: true
        });

    case BUSINESS_AUTH_LOGIN_FAILED:
        return assign(state, {
            deviceInfo: action.deviceInfo,
            error: action.error,
            hydrated: true,
            isSubmitting: false,
            user: state.user
        });

    case BUSINESS_AUTH_LOGIN_SUCCEEDED:
        return assign(state, {
            deviceInfo: action.deviceInfo,
            error: undefined,
            hydrated: true,
            isLoggedIn: true,
            isSubmitting: false,
            token: action.token,
            user: action.user
        });

    case BUSINESS_AUTH_LOGOUT:
        return assign(state, {
            error: undefined,
            isLoggedIn: false,
            isSubmitting: false,
            pendingNavigation: undefined,
            token: undefined,
            user: undefined
        });

    case SET_PENDING_BUSINESS_AUTH_NAVIGATION:
        return assign(state, {
            pendingNavigation: action.pendingNavigation
        });

    case CLEAR_PENDING_BUSINESS_AUTH_NAVIGATION:
        return assign(state, {
            pendingNavigation: undefined
        });
    }

    return state;
});
