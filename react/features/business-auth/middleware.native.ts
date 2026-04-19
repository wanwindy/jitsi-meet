import { APP_WILL_MOUNT } from '../base/app/actionTypes';
import MiddlewareRegistry from '../base/redux/MiddlewareRegistry';

import { bootstrapBusinessAuth } from './actions.native';

MiddlewareRegistry.register(store => next => action => {
    const result = next(action);

    if (action.type === APP_WILL_MOUNT) {
        void store.dispatch(bootstrapBusinessAuth() as any);
    }

    return result;
});
