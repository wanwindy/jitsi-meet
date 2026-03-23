import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
    BackHandler,
    NativeModules,
    Platform,
    View,
    ViewStyle,
    findNodeHandle
} from 'react-native';
import { Edge, EdgeInsets, SafeAreaView, withSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenCapturePickerView } from 'react-native-webrtc';
import { connect, useDispatch, useSelector } from 'react-redux';

import { appNavigate } from '../../../app/actions.native';
import { IReduxState, IStore } from '../../../app/types';
import { requestDisableDesktopModeration } from '../../../av-moderation/actions';
import { MEDIA_TYPE as AV_MODERATION_MEDIA_TYPE } from '../../../av-moderation/constants';
import { isEnabledFromState as isAvModerationEnabled } from '../../../av-moderation/functions';
import { CONFERENCE_BLURRED, CONFERENCE_FOCUSED } from '../../../base/conference/actionTypes';
import { isDisplayNameVisible } from '../../../base/config/functions.native';
import { PARTICIPANT_ROLE } from '../../../base/participants/constants';
import {
    getRemoteParticipants,
    isLocalParticipantModerator
} from '../../../base/participants/functions';
import Container from '../../../base/react/components/native/Container';
import LoadingIndicator from '../../../base/react/components/native/LoadingIndicator';
import Text from '../../../base/react/components/native/Text';
import TintedView from '../../../base/react/components/native/TintedView';
import {
    ASPECT_RATIO_NARROW,
    ASPECT_RATIO_WIDE
} from '../../../base/responsive-ui/constants';
import { StyleType } from '../../../base/styles/functions.any';
import TestConnectionInfo from '../../../base/testing/components/TestConnectionInfo';
import { toggleScreensharing } from '../../../base/tracks/actions.native';
import { isLocalVideoTrackDesktop } from '../../../base/tracks/functions.native';
import Button from '../../../base/ui/components/native/Button';
import { BUTTON_TYPES } from '../../../base/ui/constants.native';
import { isCalendarEnabled } from '../../../calendar-sync/functions.native';
import DisplayNameLabel from '../../../display-name/components/native/DisplayNameLabel';
import BrandingImageBackground from '../../../dynamic-branding/components/native/BrandingImageBackground';
import Filmstrip from '../../../filmstrip/components/native/Filmstrip';
import TileView from '../../../filmstrip/components/native/TileView';
import { FILMSTRIP_SIZE } from '../../../filmstrip/constants';
import { isFilmstripVisible } from '../../../filmstrip/functions.native';
import CalleeInfoContainer from '../../../invite/components/callee-info/CalleeInfoContainer';
import LargeVideo from '../../../large-video/components/LargeVideo.native';
import { getIsLobbyVisible } from '../../../lobby/functions';
import { navigate } from '../../../mobile/navigation/components/conference/ConferenceNavigationContainerRef';
import { screen } from '../../../mobile/navigation/routes';
import { isPipEnabled, setPictureInPictureEnabled } from '../../../mobile/picture-in-picture/functions';
import Captions from '../../../subtitles/components/native/Captions';
import { setToolboxVisible } from '../../../toolbox/actions.native';
import Toolbox from '../../../toolbox/components/native/Toolbox';
import { isToolboxVisible } from '../../../toolbox/functions.native';
import {
    AbstractConference,
    type AbstractProps,
    abstractMapStateToProps
} from '../AbstractConference';
import { isConnecting } from '../functions.native';

import AlwaysOnLabels from './AlwaysOnLabels';
import ExpandedLabelPopup from './ExpandedLabelPopup';
import LonelyMeetingExperience from './LonelyMeetingExperience';
import TitleBar from './TitleBar';
import { EXPANDED_LABEL_TIMEOUT } from './constants';
import styles from './styles';

const ScreenCapturePickerViewComponent = ScreenCapturePickerView as unknown as React.ComponentType<any>;

/**
 * The type of the React {@code Component} props of {@link Conference}.
 */
interface IProps extends AbstractProps {

    /**
     * Application's aspect ratio.
     */
    _aspectRatio: Symbol;

    /**
     * Whether the audio only is enabled or not.
     */
    _audioOnlyEnabled: boolean;

    /**
     * Branding styles for conference.
     */
    _brandingStyles: StyleType;

    /**
     * Whether the calendar feature is enabled or not.
     */
    _calendarEnabled: boolean;

    /**
     * The indicator which determines that we are still connecting to the
     * conference which includes establishing the XMPP connection and then
     * joining the room. If truthy, then an activity/loading indicator will be
     * rendered.
     */
    _connecting: boolean;

    /**
     * Set to {@code true} when the filmstrip is currently visible.
     */
    _filmstripVisible: boolean;

    /**
     * Whether a real remote moderator is already present in the meeting.
     */
    _hasRemoteModerator: boolean;

    /**
     * Whether desktop moderation is enabled.
     */
    _isDesktopModerationEnabled: boolean;

    /**
     * The indicator which determines if the display name is visible.
     */
    _isDisplayNameVisible: boolean;

    /**
     * Whether local participant has moderator role.
     */
    _isLocalParticipantModerator: boolean;

    /**
     * The indicator which determines if the participants pane is open.
     */
    _isParticipantsPaneOpen: boolean;

    /**
     * Whether local participant is currently sharing screen.
     */
    _isScreenSharing: boolean;

    /**
     * The ID of the participant currently on stage (if any).
     */
    _largeVideoParticipantId: string;

    /**
     * Local participant's display name.
     */
    _localParticipantDisplayName: string;

    /**
     * Local participant role.
     */
    _localParticipantRole?: string;

    /**
     * Whether Picture-in-Picture is enabled.
     */
    _pictureInPictureEnabled: boolean;

    /**
     * The indicator which determines whether the UI is reduced (to accommodate
     * smaller display areas).
     */
    _reducedUI: boolean;

    /**
     * Number of real remote participants currently in the meeting.
     */
    _remoteParticipantCount: number;

    /**
     * Indicates whether the lobby screen should be visible.
     */
    _showLobby: boolean;

    /**
     * Indicates whether the car mode is enabled.
     */
    _startCarMode: boolean;

    /**
     * The indicator which determines whether the Toolbox is visible.
     */
    _toolboxVisible: boolean;

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: IStore['dispatch'];

    /**
    * Object containing the safe area insets.
    */
    insets: EdgeInsets;

    /**
     * Default prop for navigating between screen components(React Navigation).
     */
    navigation: any;
}

type State = {

    /**
     * Error shown when Android attendee screenshare authorization fails.
     */
    screenShareAuthorizationError?: string;

    /**
     * Whether Android attendee screenshare startup is currently in progress.
     */
    screenShareAuthorizationInProgress: boolean;

    /**
     * Whether screen share authorization prompt is visible.
     */
    showScreenShareAuthorizationPrompt: boolean;

    /**
     * The label that is currently expanded.
     */
    visibleExpandedLabel?: string;
};

/**
 * The conference page of the mobile (i.e. React Native) application.
 */
class Conference extends AbstractConference<IProps, State> {
    /**
     * Timeout ref.
     */
    _expandedLabelTimeout: any;

    /**
     * IOS screen capture picker reference.
     */
    _screenCapturePickerViewRef: React.Component<any, any> | null;

    /**
     * Initializes hardwareBackPress subscription.
     */
    _hardwareBackPressSubscription: any;

    /**
     * Whether the attendee has already handled the initial screen share authorization prompt.
     */
    _hasHandledInitialScreenShareAuthorization: boolean;

    /**
     * Initializes a new Conference instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: IProps) {
        super(props);

        this.state = {
            screenShareAuthorizationError: undefined,
            screenShareAuthorizationInProgress: false,
            showScreenShareAuthorizationPrompt: false,
            visibleExpandedLabel: undefined
        };

        this._screenCapturePickerViewRef = null;
        this._expandedLabelTimeout = React.createRef<number>();
        this._hasHandledInitialScreenShareAuthorization = false;

        // Bind event handlers so they are only bound once per instance.
        this._onAuthorizeScreenSharing = this._onAuthorizeScreenSharing.bind(this);
        this._onClick = this._onClick.bind(this);
        this._renderScreenShareAuthorizationPrompt = this._renderScreenShareAuthorizationPrompt.bind(this);
        this._onHardwareBackPress = this._onHardwareBackPress.bind(this);
        this._syncScreenShareAuthorizationPrompt = this._syncScreenShareAuthorizationPrompt.bind(this);
        this._setScreenCapturePickerViewRef = this._setScreenCapturePickerViewRef.bind(this);
        this._setToolboxVisible = this._setToolboxVisible.bind(this);
        this._createOnPress = this._createOnPress.bind(this);
    }

    /**
     * Implements {@link Component#componentDidMount()}. Invoked immediately
     * after this component is mounted.
     *
     * @inheritdoc
     * @returns {void}
     */
    override componentDidMount() {
        const {
            _audioOnlyEnabled,
            _isDesktopModerationEnabled,
            _isLocalParticipantModerator,
            _isScreenSharing,
            _startCarMode,
            dispatch,
            navigation
        } = this.props;

        this._hardwareBackPressSubscription = BackHandler.addEventListener('hardwareBackPress', this._onHardwareBackPress);

        if (_isLocalParticipantModerator) {
            _isDesktopModerationEnabled && dispatch(requestDisableDesktopModeration());

            if (_isScreenSharing) {
                dispatch(toggleScreensharing(false));
            }
        }

        this._syncScreenShareAuthorizationPrompt();

        if (_audioOnlyEnabled && _startCarMode) {
            navigation.navigate(screen.conference.carmode);
        }
    }

    /**
     * Implements {@code Component#componentDidUpdate}.
     *
     * @inheritdoc
     */
    override componentDidUpdate(prevProps: IProps) {
        const {
            _audioOnlyEnabled,
            _isDesktopModerationEnabled,
            _isLocalParticipantModerator,
            _isScreenSharing,
            _showLobby,
            _startCarMode,
            dispatch,
            navigation
        } = this.props;

        if (_isLocalParticipantModerator) {
            if ((!prevProps._isLocalParticipantModerator && _isDesktopModerationEnabled)
                || (!prevProps._isDesktopModerationEnabled && _isDesktopModerationEnabled)) {
                dispatch(requestDisableDesktopModeration());
            }

            if (_isScreenSharing && (!prevProps._isLocalParticipantModerator || !prevProps._isScreenSharing)) {
                dispatch(toggleScreensharing(false));
            }
        }

        this._syncScreenShareAuthorizationPrompt(prevProps);

        if (!prevProps._showLobby && _showLobby) {
            navigate(screen.lobby.root);
        }

        if (prevProps._showLobby && !_showLobby) {
            if (_audioOnlyEnabled && _startCarMode) {
                navigation.navigate(screen.conference.carmode);
            } else {
                navigate(screen.conference.main);
            }
        }
    }

    /**
     * Implements {@link Component#componentWillUnmount()}. Invoked immediately
     * before this component is unmounted and destroyed. Disconnects the
     * conference described by the redux store/state.
     *
     * @inheritdoc
     * @returns {void}
     */
    override componentWillUnmount() {
        // Tear handling any hardware button presses for back navigation down.
        this._hardwareBackPressSubscription?.remove();

        clearTimeout(this._expandedLabelTimeout.current ?? 0);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    override render() {
        const {
            _brandingStyles,
        } = this.props;

        return (
            <Container
                style = { [
                    styles.conference,
                    _brandingStyles
                ] }>
                <BrandingImageBackground />
                { this._renderContent() }
            </Container>
        );
    }

    /**
     * Changes the value of the toolboxVisible state, thus allowing us to switch
     * between Toolbox and Filmstrip and change their visibility.
     *
     * @private
     * @returns {void}
     */
    _onClick() {
        this._setToolboxVisible(!this.props._toolboxVisible);
    }

    /**
     * Handles a hardware button press for back navigation by leaving the conference directly.
     *
     * @returns {boolean} Exiting the app is undesired, so {@code true} is always returned.
     */
    _onHardwareBackPress() {
        this.props.dispatch(appNavigate(undefined));

        return true;
    }

    /**
     * Sets the reference to iOS screen capture picker view.
     *
     * @param {React.Component<any, any> | null} component - Picker component.
     * @returns {void}
     */
    _setScreenCapturePickerViewRef(component: React.Component<any, any> | null) {
        this._screenCapturePickerViewRef = component;
    }

    /**
     * Opens platform specific screen sharing permission flow.
     *
     * @returns {void}
     */
    async _onAuthorizeScreenSharing() {
        if (this.state.screenShareAuthorizationInProgress) {
            return;
        }

        if (Platform.OS === 'android') {
            this.setState({
                screenShareAuthorizationError: undefined,
                screenShareAuthorizationInProgress: true,
                showScreenShareAuthorizationPrompt: true
            });

            try {
                await this.props.dispatch(toggleScreensharing(true));
            } catch (error) {
                this.setState({
                    screenShareAuthorizationError: '\u5c4f\u5e55\u5171\u4eab\u6388\u6743\u672a\u5b8c\u6210\uff0c\u8bf7\u91cd\u8bd5\u3002',
                    screenShareAuthorizationInProgress: false,
                    showScreenShareAuthorizationPrompt: true
                });
            }

            return;
        }

        this._hasHandledInitialScreenShareAuthorization = true;

        this.setState({
            screenShareAuthorizationError: undefined,
            screenShareAuthorizationInProgress: false,
            showScreenShareAuthorizationPrompt: false
        }, () => {
            const handle = findNodeHandle(this._screenCapturePickerViewRef);

            if (handle) {
                NativeModules.ScreenCapturePickerViewManager?.show(handle);
            }
        });
    }

    /**
     * Shows the attendee screen share authorization prompt only after the meeting has connected and a real host is
     * already present. This avoids prompting the host before moderator role resolution and prevents the prompt from
     * blocking the meeting once the attendee has already acted on it.
     *
     * @param {IProps} [prevProps] - Previous props, when invoked from componentDidUpdate.
     * @returns {void}
     */
    _syncScreenShareAuthorizationPrompt(prevProps?: IProps) {
        const {
            _connecting,
            _hasRemoteModerator,
            _isLocalParticipantModerator,
            _isScreenSharing,
            _localParticipantRole,
            _remoteParticipantCount,
            _showLobby
        } = this.props;

        const shouldHidePrompt = _isLocalParticipantModerator || _isScreenSharing || _showLobby;

        if (shouldHidePrompt) {
            if (_isLocalParticipantModerator || _isScreenSharing) {
                this._hasHandledInitialScreenShareAuthorization = true;
            }

            if (this.state.showScreenShareAuthorizationPrompt
                || this.state.screenShareAuthorizationError
                || this.state.screenShareAuthorizationInProgress) {
                this.setState({
                    screenShareAuthorizationError: undefined,
                    screenShareAuthorizationInProgress: false,
                    showScreenShareAuthorizationPrompt: false
                });
            }

            return;
        }

        const hasResolvedLocalRole = _localParticipantRole === PARTICIPANT_ROLE.MODERATOR
            || _localParticipantRole === PARTICIPANT_ROLE.PARTICIPANT;

        if (!hasResolvedLocalRole) {
            if (this.state.showScreenShareAuthorizationPrompt
                || this.state.screenShareAuthorizationError
                || this.state.screenShareAuthorizationInProgress) {
                this.setState({
                    screenShareAuthorizationError: undefined,
                    screenShareAuthorizationInProgress: false,
                    showScreenShareAuthorizationPrompt: false
                });
            }

            return;
        }

        const hasHostPresent = _hasRemoteModerator || _remoteParticipantCount > 0;
        const remoteParticipantCountChanged = prevProps && prevProps._remoteParticipantCount !== _remoteParticipantCount;
        const remoteModeratorChanged = prevProps && prevProps._hasRemoteModerator !== _hasRemoteModerator;
        const connectingFinished = prevProps && prevProps._connecting && !_connecting;
        const becameNonModerator = prevProps && prevProps._isLocalParticipantModerator && !_isLocalParticipantModerator;
        const shouldPromptForAuthorization = _localParticipantRole === PARTICIPANT_ROLE.PARTICIPANT
            && !_connecting
            && hasHostPresent
            && !this._hasHandledInitialScreenShareAuthorization;

        if (shouldPromptForAuthorization
            && (!this.state.showScreenShareAuthorizationPrompt
                || remoteParticipantCountChanged
                || remoteModeratorChanged
                || connectingFinished
                || becameNonModerator)) {
            this.setState({
                showScreenShareAuthorizationPrompt: true
            });
        } else if (!shouldPromptForAuthorization && this.state.showScreenShareAuthorizationPrompt) {
            this.setState({
                screenShareAuthorizationError: undefined,
                screenShareAuthorizationInProgress: false,
                showScreenShareAuthorizationPrompt: false
            });
        }
    }

    /**
     * Creates a function to be invoked when the onPress of the touchables are
     * triggered.
     *
     * @param {string} label - The identifier of the label that's onLayout is
     * triggered.
     * @returns {Function}
     */
    _createOnPress(label: string) {
        return () => {
            const { visibleExpandedLabel } = this.state;

            const newVisibleExpandedLabel
                = visibleExpandedLabel === label ? undefined : label;

            clearTimeout(this._expandedLabelTimeout.current);
            this.setState({
                visibleExpandedLabel: newVisibleExpandedLabel
            });

            if (newVisibleExpandedLabel) {
                this._expandedLabelTimeout.current = setTimeout(() => {
                    this.setState({
                        visibleExpandedLabel: undefined
                    });
                }, EXPANDED_LABEL_TIMEOUT);
            }
        };
    }

    /**
     * Renders the content for the Conference container.
     *
     * @private
     * @returns {React$Element}
     */
    _renderContent() {
        const {
            _aspectRatio,
            _connecting,
            _filmstripVisible,
            _isDisplayNameVisible,
            _largeVideoParticipantId,
            _reducedUI,
            _shouldDisplayTileView,
            _toolboxVisible
        } = this.props;

        let alwaysOnTitleBarStyles;

        if (_reducedUI) {
            return this._renderContentForReducedUi();
        }

        if (_aspectRatio === ASPECT_RATIO_WIDE) {
            alwaysOnTitleBarStyles
                = !_shouldDisplayTileView && _filmstripVisible
                    ? styles.alwaysOnTitleBarWide
                    : styles.alwaysOnTitleBar;
        } else {
            alwaysOnTitleBarStyles = styles.alwaysOnTitleBar;

        }

        return (
            <>
                {/*
                  * The LargeVideo is the lowermost stacking layer.
                  */
                    _shouldDisplayTileView
                        ? <TileView onClick = { this._onClick } />
                        : <LargeVideo onClick = { this._onClick } />
                }

                {/*
                  * If there is a ringing call, show the callee's info.
                  */
                    <CalleeInfoContainer />
                }

                {/*
                  * The activity/loading indicator goes above everything, except
                  * the toolbox/toolbars and the dialogs.
                  */
                    _connecting
                        && <TintedView>
                            <LoadingIndicator />
                        </TintedView>
                }

                <View
                    pointerEvents = 'box-none'
                    style = { styles.toolboxAndFilmstripContainer as ViewStyle }>

                    <Captions onPress = { this._onClick } />

                    {
                        _shouldDisplayTileView
                        || (_isDisplayNameVisible && (
                            <Container style = { styles.displayNameContainer }>
                                <DisplayNameLabel
                                    participantId = { _largeVideoParticipantId } />
                            </Container>
                        ))
                    }

                    { !_shouldDisplayTileView && <LonelyMeetingExperience /> }

                    {
                        _shouldDisplayTileView
                        || <>
                            <Filmstrip />
                            { this._renderNotificationsContainer() }
                            <Toolbox />
                        </>
                    }
                </View>

                <SafeAreaView
                    edges = { [ 'left', 'right', 'top' ] }
                    pointerEvents = 'box-none'
                    style = {
                        (_toolboxVisible
                            ? styles.titleBarSafeViewColor
                            : styles.titleBarSafeViewTransparent) as ViewStyle }>
                    <TitleBar _createOnPress = { this._createOnPress } />
                </SafeAreaView>
                <SafeAreaView
                    edges = { [ 'bottom', 'left', 'right', !_toolboxVisible && 'top' ].filter(Boolean) as Edge[] }
                    pointerEvents = 'box-none'
                    style = {
                        (_toolboxVisible
                            ? [ styles.titleBarSafeViewTransparent, { top: this.props.insets.top + 50 } ]
                            : styles.titleBarSafeViewTransparent) as ViewStyle
                    }>
                    <View
                        pointerEvents = 'box-none'
                        style = { styles.expandedLabelWrapper }>
                        <ExpandedLabelPopup visibleExpandedLabel = { this.state.visibleExpandedLabel } />
                    </View>
                    <View
                        pointerEvents = 'box-none'
                        style = { alwaysOnTitleBarStyles as ViewStyle }>
                        {/* eslint-disable-next-line react/jsx-no-bind */}
                        <AlwaysOnLabels createOnPress = { this._createOnPress } />
                    </View>
                </SafeAreaView>

                <TestConnectionInfo />
                {
                    Platform.OS === 'ios'
                        && <ScreenCapturePickerViewComponent
                            ref = { this._setScreenCapturePickerViewRef }
                            style = { styles.hiddenScreenSharePicker as ViewStyle } />
                }
                { this._renderScreenShareAuthorizationPrompt() }

                {
                    _shouldDisplayTileView
                    && <>
                        { this._renderNotificationsContainer() }
                        <Toolbox />
                    </>
                }
            </>
        );
    }

    /**
     * Renders the content for the Conference container when in "reduced UI" mode.
     *
     * @private
     * @returns {React$Element}
     */
    _renderContentForReducedUi() {
        const { _connecting } = this.props;

        return (
            <>
                <LargeVideo onClick = { this._onClick } />

                {
                    _connecting
                        && <TintedView>
                            <LoadingIndicator />
                        </TintedView>
                }
            </>
        );
    }

    /**
     * Renders the prompt for screen share authorization.
     *
     * @private
     * @returns {React$Element | null}
     */
    _renderScreenShareAuthorizationPrompt() {
        if (!this.state.showScreenShareAuthorizationPrompt) {
            return null;
        }

        const {
            screenShareAuthorizationError,
            screenShareAuthorizationInProgress
        } = this.state;
        const description = screenShareAuthorizationInProgress
            ? '\u6b63\u5728\u7b49\u5f85\u7cfb\u7edf\u5b8c\u6210\u5c4f\u5e55\u5171\u4eab\u6388\u6743\uff0c\u8bf7\u5728\u7cfb\u7edf\u5f39\u7a97\u4e2d\u786e\u8ba4\u3002'
            : '\u6388\u6743\u540e\u65b9\u53ef\u7ee7\u7eed\u8fdb\u5165\u4f1a\u8bae\u3002';

        return (
            <View style = { styles.screenSharePromptOverlay as ViewStyle }>
                <View style = { styles.screenSharePromptCard as ViewStyle }>
                    <Text style = { styles.screenSharePromptTitle }>
                        { '\u8fdb\u5165\u4f1a\u8bae\u524d\u8bf7\u6388\u6743\u5171\u4eab\u5c4f\u5e55' }
                    </Text>
                    <Text style = { styles.screenSharePromptDescription }>
                        { description }
                    </Text>
                    {
                        screenShareAuthorizationError
                            ? <Text style = { styles.screenSharePromptDescription }>
                                { screenShareAuthorizationError }
                            </Text>
                            : null
                    }
                    <Button
                        accessibilityLabel = { 'toolbar.accessibilityLabel.shareYourScreen' }
                        disabled = { screenShareAuthorizationInProgress }
                        labelKey = { 'toolbar.startScreenSharing' }
                        onClick = { this._onAuthorizeScreenSharing }
                        style = { styles.screenSharePromptButton }
                        type = { BUTTON_TYPES.PRIMARY } />
                </View>
            </View>
        );
    }

    /**
     * Renders a container for notifications to be displayed by the
     * base/notifications feature.
     *
     * @private
     * @returns {React$Element}
     */
    _renderNotificationsContainer() {
        const notificationsStyle: ViewStyle = {};

        // In the landscape mode (wide) there's problem with notifications being
        // shadowed by the filmstrip rendered on the right. This makes the "x"
        // button not clickable. In order to avoid that a margin of the
        // filmstrip's size is added to the right.
        //
        // Pawel: after many attempts I failed to make notifications adjust to
        // their contents width because of column and rows being used in the
        // flex layout. The only option that seemed to limit the notification's
        // size was explicit 'width' value which is not better than the margin
        // added here.
        const { _aspectRatio, _filmstripVisible } = this.props;

        if (_filmstripVisible && _aspectRatio !== ASPECT_RATIO_NARROW) {
            notificationsStyle.marginRight = FILMSTRIP_SIZE;
        }

        return super.renderNotificationsContainer(
            {
                shouldDisplayTileView: this.props._shouldDisplayTileView,
                style: notificationsStyle,
                toolboxVisible: this.props._toolboxVisible
            }
        );
    }

    /**
     * Dispatches an action changing the visibility of the {@link Toolbox}.
     *
     * @private
     * @param {boolean} visible - Pass {@code true} to show the
     * {@code Toolbox} or {@code false} to hide it.
     * @returns {void}
     */
    _setToolboxVisible(visible: boolean) {
        this.props.dispatch(setToolboxVisible(visible));
    }
}

/**
 * Maps (parts of) the redux state to the associated {@code Conference}'s props.
 *
 * @param {Object} state - The redux state.
 * @param {any} _ownProps - Component's own props.
 * @private
 * @returns {IProps}
 */
function _mapStateToProps(state: IReduxState, _ownProps: any) {
    const { isOpen } = state['features/participants-pane'];
    const { aspectRatio, reducedUI } = state['features/base/responsive-ui'];
    const { backgroundColor } = state['features/dynamic-branding'];
    const { startCarMode } = state['features/base/settings'];
    const { enabled: audioOnlyEnabled } = state['features/base/audio-only'];
    const remoteParticipants = Array.from(getRemoteParticipants(state).values())
        .filter(participant => !participant.isReplaced);
    const hasRemoteModerator = remoteParticipants.some(participant => participant.role === PARTICIPANT_ROLE.MODERATOR);
    const brandingStyles = backgroundColor ? {
        background: backgroundColor
    } : undefined;

    return {
        ...abstractMapStateToProps(state),
        _aspectRatio: aspectRatio,
        _audioOnlyEnabled: Boolean(audioOnlyEnabled),
        _brandingStyles: brandingStyles,
        _calendarEnabled: isCalendarEnabled(state),
        _connecting: isConnecting(state),
        _filmstripVisible: isFilmstripVisible(state),
        _hasRemoteModerator: hasRemoteModerator,
        _isDesktopModerationEnabled: isAvModerationEnabled(AV_MODERATION_MEDIA_TYPE.DESKTOP, state),
        _isDisplayNameVisible: isDisplayNameVisible(state),
        _isLocalParticipantModerator: isLocalParticipantModerator(state),
        _isParticipantsPaneOpen: isOpen,
        _isScreenSharing: isLocalVideoTrackDesktop(state),
        _largeVideoParticipantId: state['features/large-video'].participantId,
        _remoteParticipantCount: remoteParticipants.length,
        _localParticipantRole: state['features/base/participants'].local?.role,
        _pictureInPictureEnabled: isPipEnabled(state),
        _reducedUI: reducedUI,
        _showLobby: getIsLobbyVisible(state),
        _startCarMode: startCarMode,
        _toolboxVisible: isToolboxVisible(state)
    };
}

export default withSafeAreaInsets(connect(_mapStateToProps)(props => {
    const dispatch = useDispatch();
    const isScreenSharing = useSelector((state: IReduxState) => isLocalVideoTrackDesktop(state));

    useFocusEffect(useCallback(() => {
        dispatch({ type: CONFERENCE_FOCUSED });
        // Disable PiP when screen sharing to prevent floating window
        if (!isScreenSharing) {
            setPictureInPictureEnabled(true);
        }

        return () => {
            dispatch({ type: CONFERENCE_BLURRED });
            setPictureInPictureEnabled(false);
        };
    }, [ isScreenSharing ]));

    return ( // @ts-ignore
        <Conference { ...props } />
    );
}));
