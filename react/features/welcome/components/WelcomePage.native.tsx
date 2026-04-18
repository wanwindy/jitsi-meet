import React from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleProp,
    View,
    ViewStyle
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { connect } from 'react-redux';

import { appNavigate } from '../../app/actions.native';
import { getName } from '../../app/functions.native';
import { IReduxState } from '../../app/types';
import { getStoredLoginCredentials } from '../../authentication/functions';
import type { MeetingEntryType } from '../../base/conference/reducer';
import { connect as connectAction } from '../../base/connection/actions.native';
import { toJid } from '../../base/connection/functions';
import { translate } from '../../base/i18n/functions';
import Icon from '../../base/icons/components/Icon';
import {
    IconArrowRight,
    IconPlus,
    IconSecurityOn,
    IconUser,
    IconVideo
} from '../../base/icons/svg';
import Text from '../../base/react/components/native/Text';
import Input from '../../base/ui/components/native/Input';
import { navigateRoot } from '../../mobile/navigation/rootNavigationContainerRef';
import { screen } from '../../mobile/navigation/routes';

import {
    IProps as AbstractProps,
    AbstractWelcomePage,
    _mapStateToProps as _abstractMapStateToProps
} from './AbstractWelcomePage';
import styles from './styles.native';

const APP_ICON = require('../../../../images/app-icon.png');

interface IProps extends AbstractProps {
    _configHosts?: {
        anonymousdomain?: string;
        authdomain?: string;
        domain?: string;
        focus?: string;
        muc?: string;
        visitorFocus?: string;
    };

    _jwt?: string;

    /**
     * Default prop for navigating between screen components(React Navigation).
     */
    navigation: any;
}

/**
 * Decorative artwork for the hero card.
 *
 * @returns {ReactElement}
 */
function WelcomeHeroArtwork() {
    return (
        <Svg
            height = '100%'
            preserveAspectRatio = 'xMidYMid slice'
            viewBox = '0 0 360 220'
            width = '100%'>
            <Defs>
                <LinearGradient
                    id = 'heroGradient'
                    x1 = '16'
                    x2 = '332'
                    y1 = '12'
                    y2 = '214'
                    gradientUnits = 'userSpaceOnUse'>
                    <Stop
                        offset = '0'
                        stopColor = '#2A6CC2' />
                    <Stop
                        offset = '0.56'
                        stopColor = '#184B92' />
                    <Stop
                        offset = '1'
                        stopColor = '#0E2E66' />
                </LinearGradient>
                <LinearGradient
                    id = 'heroHighlight'
                    x1 = '66'
                    x2 = '264'
                    y1 = '38'
                    y2 = '180'
                    gradientUnits = 'userSpaceOnUse'>
                    <Stop
                        offset = '0'
                        stopColor = '#FFFFFF'
                        stopOpacity = '0.16' />
                    <Stop
                        offset = '1'
                        stopColor = '#FFFFFF'
                        stopOpacity = '0' />
                </LinearGradient>
            </Defs>
            <Rect
                fill = 'url(#heroGradient)'
                height = '220'
                rx = '28'
                width = '360' />
            <Path
                d = 'M-12 44 C 48 22, 130 20, 214 74 C 276 114, 332 160, 380 204 L 380 260 L -12 260 Z'
                fill = 'url(#heroHighlight)' />
            <Path
                d = 'M178 102 L264 70 L338 106 L338 118 L178 118 Z'
                fill = '#FFFFFF'
                fillOpacity = '0.16' />
            <Rect
                fill = '#FFFFFF'
                fillOpacity = '0.14'
                height = '12'
                rx = '6'
                width = '124'
                x = '198'
                y = '126' />
            <Rect
                fill = '#FFFFFF'
                fillOpacity = '0.11'
                height = '46'
                rx = '7'
                width = '16'
                x = '208'
                y = '140' />
            <Rect
                fill = '#FFFFFF'
                fillOpacity = '0.11'
                height = '54'
                rx = '7'
                width = '16'
                x = '240'
                y = '132' />
            <Rect
                fill = '#FFFFFF'
                fillOpacity = '0.11'
                height = '54'
                rx = '7'
                width = '16'
                x = '272'
                y = '132' />
            <Rect
                fill = '#FFFFFF'
                fillOpacity = '0.11'
                height = '46'
                rx = '7'
                width = '16'
                x = '304'
                y = '140' />
            <Rect
                fill = '#FFFFFF'
                fillOpacity = '0.14'
                height = '12'
                rx = '6'
                width = '156'
                x = '188'
                y = '188' />
        </Svg>
    );
}

/**
 * The native container rendering the welcome page.
 *
 * @augments AbstractWelcomePage
 */
class WelcomePage extends AbstractWelcomePage<IProps> {

    /**
     * Constructor of the Component.
     *
     * @inheritdoc
     */
    constructor(props: IProps) {
        super(props);

        this.state.isSettingsScreenFocused = true;

        this._onCreateMeeting = this._onCreateMeeting.bind(this);
        this._onJoinMeeting = this._onJoinMeeting.bind(this);
        this._onMeetingNumberChange = this._onMeetingNumberChange.bind(this);
        this._closeJoinPanel = this._closeJoinPanel.bind(this);
        this._openAccountPage = this._openAccountPage.bind(this);
        this._toggleJoinPanel = this._toggleJoinPanel.bind(this);
    }

    /**
     * Implements React's {@link Component#componentDidMount()}.
     *
     * @inheritdoc
     * @returns {void}
     */
    override componentDidMount() {
        super.componentDidMount();

        this.props.navigation.setOptions({
            headerShown: false
        });
    }

    /**
     * Generates a random numeric meeting number.
     *
     * @private
     * @returns {string}
     */
    _generateMeetingNumber() {
        const min = 100000;
        const max = 999999;

        return `${Math.floor(Math.random() * (max - min + 1)) + min}`;
    }

    /**
     * Navigates to a meeting room.
     *
     * @private
     * @param {string} room - Room/meeting number.
     * @param {MeetingEntryType} meetingEntryType - How the user entered the meeting flow.
     * @returns {void}
     */
    _navigateToMeeting(room: string, meetingEntryType?: MeetingEntryType) {
        const onAppNavigateSettled = () => {
            this._mounted && this.setState({ joining: false });
        };

        this.setState({ joining: true });
        this.props.dispatch(appNavigate(room, { meetingEntryType }))
            .then(onAppNavigateSettled, onAppNavigateSettled);
    }

    /**
     * Handles create meeting.
     *
     * @private
     * @returns {void}
     */
    _onCreateMeeting() {
        const { _configHosts, _jwt } = this.props;

        if (this.state.joining) {
            return;
        }

        if (!_jwt) {
            void getStoredLoginCredentials()
                .then(credentials => {
                    if (!this._mounted) {
                        return;
                    }

                    if (!credentials) {
                        this._openAccountPage();

                        return;
                    }

                    const room = this._generateMeetingNumber();
                    const jid = toJid(credentials.username, _configHosts || {});
                    const onCreateMeetingSettled = () => {
                        this._mounted && this.setState({ joining: false });
                    };

                    this.setState({
                        joining: true,
                        room
                    });
                    this.props.dispatch(appNavigate(room, {
                        hidePrejoin: true,
                        meetingEntryType: 'create',
                        skipConnect: true
                    }))
                        .then(() => {
                            this.props.dispatch(connectAction(jid, credentials.password));
                            navigateRoot(screen.conference.root);
                        }, onCreateMeetingSettled)
                        .then(onCreateMeetingSettled, onCreateMeetingSettled);
                })
                .catch(() => {
                    this._mounted && this._openAccountPage();
                });

            return;
        }

        const room = this._generateMeetingNumber();

        this.setState({ room });
        this._navigateToMeeting(room, 'create');
    }

    /**
     * Handles joining with meeting number.
     *
     * @private
     * @returns {void}
     */
    _onJoinMeeting() {
        const room = this.state.room;

        if (!room || this.state.joining) {
            return;
        }

        this._navigateToMeeting(room, 'join');
        this.setState({
            isSettingsScreenFocused: false
        });
    }

    /**
     * Handles meeting number input changes.
     *
     * @private
     * @param {string} value - Input value.
     * @returns {void}
     */
    _onMeetingNumberChange(value: string) {
        this._onRoomChange(value.replace(/\D+/g, ''));
    }

    /**
     * Closes the join panel.
     *
     * @private
     * @returns {void}
     */
    _closeJoinPanel() {
        this.setState({
            isSettingsScreenFocused: false
        });
    }

    /**
     * Toggles the join panel visibility.
     *
     * @private
     * @returns {void}
     */
    _toggleJoinPanel() {
        const showJoinPanel = Boolean(this.state.isSettingsScreenFocused);

        this.setState({
            isSettingsScreenFocused: !showJoinPanel,
            room: showJoinPanel ? '' : this.state.room
        });
    }

    /**
     * Opens the account page.
     *
     * @private
     * @returns {void}
     */
    _openAccountPage() {
        this.props.navigation.navigate(screen.account.main);
    }

    /**
     * Renders the "create meeting" icon.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderCreateMeetingIcon() {
        return (
            <View style = { styles.actionIconShell }>
                <Icon
                    color = '#1E56A0'
                    size = { 30 }
                    src = { IconVideo } />
                <View style = { styles.actionIconBadge }>
                    <Icon
                        color = '#FFFFFF'
                        size = { 14 }
                        src = { IconPlus } />
                </View>
            </View>
        );
    }

    /**
     * Renders the "join meeting" icon.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderJoinMeetingIcon() {
        return (
            <View style = { styles.actionIconShell }>
                <View style = { styles.joinDoorFrame }>
                    <View style = { styles.joinDoorHandle } />
                </View>
                <Icon
                    color = '#1E56A0'
                    size = { 18 }
                    src = { IconArrowRight }
                    style = { styles.joinDoorArrow } />
            </View>
        );
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    override render() {
        const canJoinMeeting = Boolean(this.state.room) && !this.state.joining;
        const showJoinPanel = Boolean(this.state.isSettingsScreenFocused);

        return (
            <SafeAreaView
                edges = { [ 'left', 'right', 'bottom', 'top' ] }
                style = { styles.simpleWelcomePage as StyleProp<ViewStyle> }>
                <ScrollView
                    bounces = { false }
                    contentContainerStyle = { styles.pageContent as StyleProp<ViewStyle> }
                    keyboardShouldPersistTaps = { 'handled' }
                    showsVerticalScrollIndicator = { false }>
                    <View style = { styles.topBar as StyleProp<ViewStyle> }>
                        <View style = { styles.topBarBrand as StyleProp<ViewStyle> }>
                            <Image
                                resizeMode = { 'cover' }
                                source = { APP_ICON }
                                style = { styles.topBarLogo } />
                            <Text style = { styles.topBarTitle }>
                                { getName() }
                            </Text>
                        </View>
                        <View style = { styles.topBarActions as StyleProp<ViewStyle> }>
                            <Pressable
                                accessibilityLabel = { '个人账号' }
                                onPress = { this._openAccountPage }
                                style = { ({ pressed }) => [
                                    styles.topBarActionButton,
                                    pressed && styles.topBarActionButtonPressed
                                ] }>
                                <Icon
                                    color = '#1E56A0'
                                    size = { 18 }
                                    src = { IconUser } />
                            </Pressable>
                        </View>
                    </View>
                    <View style = { styles.heroCard as StyleProp<ViewStyle> }>
                        <View style = { styles.heroArtwork as StyleProp<ViewStyle> }>
                            <WelcomeHeroArtwork />
                        </View>
                        <View style = { styles.heroContent as StyleProp<ViewStyle> }>
                            <Text style = { styles.heroTitle }>
                                { '线上服务，放心办理' }
                            </Text>
                            <Text style = { styles.heroSubtitle }>
                                { 'Secure, Reliable, and Efficient Government Digital Services' }
                            </Text>
                            <View style = { styles.heroSecurityBadge as StyleProp<ViewStyle> }>
                                <Icon
                                    color = '#FFFFFF'
                                    size = { 16 }
                                    src = { IconSecurityOn } />
                                <Text style = { styles.heroSecurityBadgeText }>
                                    { '您的安全是我们最大的保障' }
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style = { styles.actionCardsRow as StyleProp<ViewStyle> }>
                        <Pressable
                            accessibilityLabel = { '创建会议' }
                            onPress = { this._onCreateMeeting }
                            style = { ({ pressed }) => [
                                styles.actionCard,
                                pressed && styles.actionCardPressed
                            ] }>
                            { this._renderCreateMeetingIcon() }
                            <Text style = { styles.actionCardTitle }>
                                { '创建会议' }
                            </Text>
                        </Pressable>
                        <Pressable
                            accessibilityLabel = { '加入会议' }
                            onPress = { this._toggleJoinPanel }
                            style = { ({ pressed }) => [
                                styles.actionCard,
                                pressed && styles.actionCardPressed
                            ] }>
                            { this._renderJoinMeetingIcon() }
                            <Text style = { styles.actionCardTitle }>
                                { '加入会议' }
                            </Text>
                        </Pressable>
                    </View>
                    {
                        showJoinPanel
                            && <View style = { styles.joinMeetingSection as StyleProp<ViewStyle> }>
                                <View style = { styles.joinMeetingPanel as StyleProp<ViewStyle> }>
                                    <Text style = { styles.joinMeetingTitle }>
                                        { '输入会议号' }
                                    </Text>
                                    <Text style = { styles.joinMeetingSubtitle }>
                                        { '请输入会议号后加入会议' }
                                    </Text>
                                    <Input
                                        accessibilityLabel = { '会议号输入' }
                                        autoCapitalize = { 'none' }
                                        clearable = { true }
                                        customStyles = {{
                                            container: styles.joinMeetingInputContainer,
                                            input: styles.joinMeetingInput
                                        }}
                                        keyboardType = { 'number-pad' }
                                        maxLength = { 12 }
                                        onChange = { this._onMeetingNumberChange }
                                        onSubmitEditing = { this._onJoinMeeting }
                                        placeholder = { '请输入会议号' }
                                        returnKeyType = { 'go' }
                                        value = { this.state.room } />
                                    <View style = { styles.joinPanelActions as StyleProp<ViewStyle> }>
                                        <Pressable
                                            accessibilityLabel = { '取消' }
                                            onPress = { this._closeJoinPanel }
                                            style = { ({ pressed }) => [
                                                styles.joinPanelCancelButton,
                                                pressed && styles.joinPanelCancelButtonPressed
                                            ] }>
                                            <Text style = { styles.joinPanelCancelText }>
                                                { '取消' }
                                            </Text>
                                        </Pressable>
                                        <Pressable
                                            accessibilityLabel = { '加入会议' }
                                            disabled = { !canJoinMeeting }
                                            onPress = { this._onJoinMeeting }
                                            style = { ({ pressed }) => [
                                                    styles.joinPanelConfirmButton,
                                                    !canJoinMeeting && styles.joinPanelConfirmButtonDisabled,
                                                    pressed && canJoinMeeting && styles.joinPanelConfirmButtonPressed
                                                ] }>
                                            <Text style = { styles.joinPanelConfirmText }>
                                                { '加入会议' }
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Object}
 */
function _mapStateToProps(state: IReduxState) {
    return {
        ..._abstractMapStateToProps(state),
        _configHosts: state['features/base/config'].hosts,
        _jwt: state['features/base/jwt'].jwt
    };
}

export default translate(connect(_mapStateToProps)(WelcomePage));
