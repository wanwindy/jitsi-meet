import React from 'react';
import {
    Image,
    StyleProp,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import { login } from '../../authentication/actions.native';
import { appNavigate } from '../../app/actions.native';
import { getName } from '../../app/functions.native';
import { IReduxState } from '../../app/types';
import { translate } from '../../base/i18n/functions';
import Text from '../../base/react/components/native/Text';
import Input from '../../base/ui/components/native/Input';

import {
    IProps as AbstractProps,
    AbstractWelcomePage,
    _mapStateToProps as _abstractMapStateToProps
} from './AbstractWelcomePage';
import styles from './styles.native';

interface IProps extends AbstractProps {
    _jwt?: string;

    /**
     * Default prop for navigating between screen components(React Navigation).
     */
    navigation: any;
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

        this.state.isSettingsScreenFocused = false;

        this._onCreateMeeting = this._onCreateMeeting.bind(this);
        this._onJoinMeeting = this._onJoinMeeting.bind(this);
        this._onMeetingNumberChange = this._onMeetingNumberChange.bind(this);
        this._closeJoinPanel = this._closeJoinPanel.bind(this);
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
     * @returns {void}
     */
    _navigateToMeeting(room: string, triggerLogin = false) {
        const onAppNavigateSettled = () => {
            triggerLogin && this.props.dispatch(login());
            this._mounted && this.setState({ joining: false });
        };

        this.setState({ joining: true });
        this.props.dispatch(appNavigate(room))
            .then(onAppNavigateSettled, onAppNavigateSettled);
    }

    /**
     * Handles create meeting.
     *
     * @private
     * @returns {void}
     */
    _onCreateMeeting() {
        const { _jwt } = this.props;

        if (this.state.joining) {
            return;
        }

        const room = this._generateMeetingNumber();

        this.setState({ room });
        this._navigateToMeeting(room, !_jwt);
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

        this._onJoin();
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
                <View style = { styles.heroBackground as StyleProp<ViewStyle> }>
                    <View style = { styles.heroContainer as StyleProp<ViewStyle> }>
                        <Image
                            resizeMode = { 'contain' }
                            source = { require('../../../../images/app-icon.png') }
                            style = { styles.heroImage } />
                    </View>
                </View>
                <View style = { styles.brandCard as StyleProp<ViewStyle> }>
                    <Image
                        resizeMode = { 'contain' }
                        source = { require('../../../../images/app-icon.png') }
                        style = { styles.brandIcon } />
                    <Text style = { styles.brandName }>
                        { getName() }
                    </Text>
                </View>
                <View style = { styles.actionButtonsContainer as StyleProp<ViewStyle> }>
                    <TouchableOpacity
                        accessibilityLabel = { '\u521b\u5efa\u4f1a\u8bae' }
                        onPress = { this._onCreateMeeting }
                        style = {
                            [
                                styles.actionButton,
                                styles.createMeetingCard
                            ] as StyleProp<ViewStyle>
                        }>
                        <Text style = { styles.actionButtonText }>
                            { '\u521b\u5efa\u4f1a\u8bae' }
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        accessibilityLabel = { '\u52a0\u5165\u4f1a\u8bae' }
                        onPress = { this._toggleJoinPanel }
                        style = {
                            [
                                styles.actionButton,
                                styles.joinMeetingCard
                            ] as StyleProp<ViewStyle>
                        }>
                        <Text style = { styles.actionButtonText }>
                            { '\u52a0\u5165\u4f1a\u8bae' }
                        </Text>
                    </TouchableOpacity>
                </View>
                {
                    showJoinPanel
                        && <View style = { styles.joinModalOverlay as StyleProp<ViewStyle> }>
                            <View style = { styles.joinMeetingPanel as StyleProp<ViewStyle> }>
                                <Text style = { styles.joinMeetingTitle }>
                                    { '\u8f93\u5165\u4f1a\u8bae\u53f7' }
                                </Text>
                                <Input
                                    accessibilityLabel = { '\u4f1a\u8bae\u53f7\u8f93\u5165' }
                                    autoCapitalize = { 'none' }
                                    autoFocus = { true }
                                    clearable = { true }
                                    customStyles = {{ input: styles.joinMeetingInput }}
                                    keyboardType = { 'number-pad' }
                                    maxLength = { 12 }
                                    onChange = { this._onMeetingNumberChange }
                                    onSubmitEditing = { this._onJoinMeeting }
                                    placeholder = { '\u8bf7\u8f93\u5165\u4f1a\u8bae\u53f7' }
                                    returnKeyType = { 'go' }
                                    value = { this.state.room } />
                                <View style = { styles.joinPanelActions as StyleProp<ViewStyle> }>
                                    <TouchableOpacity
                                        accessibilityLabel = { '\u53d6\u6d88' }
                                        onPress = { this._closeJoinPanel }
                                        style = { styles.joinPanelCancelButton as StyleProp<ViewStyle> }>
                                        <Text style = { styles.joinPanelCancelText }>
                                            { '\u53d6\u6d88' }
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        accessibilityLabel = { '\u52a0\u5165\u4f1a\u8bae' }
                                        disabled = { !canJoinMeeting }
                                        onPress = { this._onJoinMeeting }
                                        style = {
                                            [
                                                styles.joinPanelConfirmButton,
                                                !canJoinMeeting && styles.joinPanelConfirmButtonDisabled
                                            ] as StyleProp<ViewStyle>
                                        }>
                                        <Text style = { styles.joinPanelConfirmText }>
                                            { '\u52a0\u5165' }
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                }
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
        _jwt: state['features/base/jwt'].jwt
    };
}

export default translate(connect(_mapStateToProps)(WelcomePage));
