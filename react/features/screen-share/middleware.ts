import { IStore } from '../app/types';
import { CONFERENCE_JOINED, CONFERENCE_LEFT } from '../base/conference/actionTypes';
import { MEDIA_TYPE } from '../base/media/constants';
import MiddlewareRegistry from '../base/redux/MiddlewareRegistry';

import {
    SET_SCREENSHARE_CAPTURE_FRAME_RATE,
    SET_SCREEN_AUDIO_SHARE_STATE,
    SET_SCREENSHARE_TRACKS
} from './actionTypes';
import logger from './logger';

/**
 * Implements the middleware of the feature screen-share.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => action => {
    const result = next(action);
    const { getState } = store;
    const state = getState();

    switch (action.type) {
    case CONFERENCE_JOINED: {
        _setScreenshareCaptureFps(store);
        break;
    }
    case CONFERENCE_LEFT: {
        _resetScreenShareState(store);
        break;
    }
    case SET_SCREENSHARE_CAPTURE_FRAME_RATE: {
        const { captureFrameRate } = action;

        _setScreenshareCaptureFps(store, captureFrameRate);
        break;
    }

    case SET_SCREEN_AUDIO_SHARE_STATE: {
        const { isSharingAudio } = action;
        const { participantId } = state['features/large-video'];

        if (isSharingAudio) {
            logger.debug(`User with id: ${participantId} playing audio sharing.`);
            APP.API.notifyAudioOrVideoSharingToggled(MEDIA_TYPE.AUDIO, 'playing', participantId);
        } else {
            logger.debug(`User with id: ${participantId} stop audio sharing.`);
            APP.API.notifyAudioOrVideoSharingToggled(MEDIA_TYPE.AUDIO, 'stop', participantId);
        }
    }
    }

    return result;
});

/**
 * Sets the capture frame rate for screenshare.
 *
 * @param {Store} store - The redux store.
 * @param {number} frameRate - Frame rate to be configured.
 * @private
 * @returns {void}
 */
function _setScreenshareCaptureFps(store: IStore, frameRate?: number) {
    const state = store.getState();
    const { conference } = state['features/base/conference'];
    const { captureFrameRate } = state['features/screen-share'];
    const screenShareFps = frameRate ?? captureFrameRate;

    if (!conference) {
        return;
    }

    if (screenShareFps) {
        logger.debug(`Setting screenshare capture frame rate as ${screenShareFps}`);
        conference.setDesktopSharingFrameRate(screenShareFps);
    }
}

/**
 * Resets the screen share state when leaving a conference.
 * This ensures that when a participant rejoins, the screen share state is clean
 * and screen sharing can be properly initiated again.
 *
 * @param {IStore} store - The redux store.
 * @private
 * @returns {void}
 */
function _resetScreenShareState(store: IStore) {
    const { dispatch, getState } = store;
    const state = getState();
    const screenShareState = state['features/screen-share'];
    const { desktopAudioTrack, isSharingAudio } = screenShareState;

    // Clean up desktop audio track if it exists and not already disposed
    if (desktopAudioTrack) {
        try {
            desktopAudioTrack.dispose();
        } catch (e) {
            logger.debug('Desktop audio track already disposed', e);
        }
        dispatch({
            type: SET_SCREENSHARE_TRACKS,
            desktopAudioTrack: null
        });
    }

    // Reset audio share state if it was active
    if (isSharingAudio) {
        dispatch({
            type: SET_SCREEN_AUDIO_SHARE_STATE,
            isSharingAudio: false
        });
    }

    logger.debug('Screen share state reset after conference left.');
}
