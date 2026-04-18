import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { IReduxState } from '../../app/types';
import { clearStoredLoginCredentials, getStoredLoginCredentials, persistStoredLoginCredentials } from '../../authentication/functions';
import { disconnect } from '../../base/connection/actions.native';
import Icon from '../../base/icons/components/Icon';
import {
    IconArrowLeft,
    IconSecurityOn,
    IconUser
} from '../../base/icons/svg';
import { setJWT } from '../../base/jwt/actions';
import Text from '../../base/react/components/native/Text';
import Input from '../../base/ui/components/native/Input';

interface IAccountButtonProps {
    disabled?: boolean;
    onPress: () => void;
    title: string;
    variant: 'danger' | 'primary' | 'secondary';
}

/**
 * Lightweight account page for the welcome screen.
 *
 * It stores login credentials locally so meetings that require auth can reuse
 * them automatically, and it also clears persisted JWT/session information on logout.
 *
 * @returns {ReactElement}
 */
function AccountPage() {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();
    const [ loading, setLoading ] = useState(false);
    const [ feedback, setFeedback ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ storedUsername, setStoredUsername ] = useState('');
    const [ username, setUsername ] = useState('');

    const { authLogin } = useSelector((state: IReduxState) => state['features/base/conference']);
    const jwtState = useSelector((state: IReduxState) => state['features/base/jwt']);

    const isServerLoggedIn = Boolean(authLogin || jwtState.jwt);

    const currentAccount = useMemo(() => {
        if (authLogin) {
            return authLogin;
        }

        if (jwtState.jwt) {
            return jwtState.user?.name || jwtState.user?.id || storedUsername;
        }

        return storedUsername;
    }, [ authLogin, jwtState.jwt, jwtState.user?.id, jwtState.user?.name, storedUsername ]);

    const loadStoredCredentials = useCallback(async () => {
        const credentials = await getStoredLoginCredentials();

        const restoredUsername = credentials?.username ?? '';

        setStoredUsername(restoredUsername);
        setUsername(restoredUsername);
    }, [ isServerLoggedIn ]);

    useFocusEffect(useCallback(() => {
        setFeedback('');
        void loadStoredCredentials();
    }, [ loadStoredCredentials ]));

    const onSaveAccount = useCallback(async () => {
        const trimmedUsername = username.trim();

        if (!trimmedUsername || !password.trim()) {
            setFeedback('请输入账号和密码。');

            return;
        }

        setLoading(true);
        setFeedback('');

        try {
            await persistStoredLoginCredentials(trimmedUsername, password.trim());
            setStoredUsername(trimmedUsername);
            setPassword('');
            setFeedback('账号已保存，后续进入需要鉴权的会议时会自动使用该账号。');
        } finally {
            setLoading(false);
        }
    }, [ password, username ]);

    const onLogout = useCallback(async () => {
        setLoading(true);
        setFeedback('');

        try {
            await clearStoredLoginCredentials();
            setStoredUsername('');
            setUsername('');
            setPassword('');
            await (dispatch as any)(disconnect(undefined, false));
            dispatch(setJWT(undefined));
            setFeedback('账号已退出。');
        } finally {
            setLoading(false);
        }
    }, [ dispatch ]);

    const renderActionButton = ({ disabled, onPress, title, variant }: IAccountButtonProps) => (
        <Pressable
            disabled = { disabled }
            onPress = { onPress }
            style = { ({ pressed }) => [
                styles.actionButton,
                variant === 'primary' && styles.primaryActionButton,
                variant === 'secondary' && styles.secondaryActionButton,
                variant === 'danger' && styles.dangerActionButton,
                disabled && styles.disabledActionButton,
                pressed && !disabled && styles.pressedActionButton
            ] }>
            <Text style = { [
                styles.actionButtonText,
                variant === 'primary' && styles.primaryActionButtonText,
                variant === 'secondary' && styles.secondaryActionButtonText,
                variant === 'danger' && styles.dangerActionButtonText,
                disabled && styles.disabledActionButtonText
            ] }>
                { title }
            </Text>
        </Pressable>
    );

    const statusLabel = isServerLoggedIn
        ? '已登录'
        : currentAccount
            ? '已保存账号'
            : '未登录';

    const statusDescription = isServerLoggedIn
        ? '当前会话已完成账号认证，可以直接继续使用。'
        : currentAccount
            ? '当前账号已保存在本机，后续进入需要鉴权的会议时会自动使用。'
            : '登录账号后，创建或加入需要鉴权的会议时会自动带上该账号。';

    return (
        <SafeAreaView
            edges = { [ 'top', 'left', 'right', 'bottom' ] }
            style = { styles.page as ViewStyle }>
            <View style = { styles.header as StyleProp<ViewStyle> }>
                <Pressable
                    accessibilityLabel = { '返回首页' }
                    onPress = { () => navigation.goBack() }
                    style = { ({ pressed }) => [
                        styles.headerButton,
                        pressed && styles.headerButtonPressed
                    ] }>
                    <Icon
                        color = '#1E56A0'
                        size = { 20 }
                        src = { IconArrowLeft } />
                </Pressable>
                <Text style = { styles.headerTitle }>
                    { '个人账号' }
                </Text>
                <View style = { styles.headerSpacer } />
            </View>
            <ScrollView
                bounces = { false }
                contentContainerStyle = { styles.scrollContent as StyleProp<ViewStyle> }
                keyboardShouldPersistTaps = { 'handled' }
                showsVerticalScrollIndicator = { false }>
                <View style = { styles.accountCard as StyleProp<ViewStyle> }>
                    <View style = { styles.accountAvatar as StyleProp<ViewStyle> }>
                        <Icon
                            color = '#FFFFFF'
                            size = { 34 }
                            src = { IconUser } />
                    </View>
                    <Text style = { styles.accountTitle }>
                        { currentAccount || '未登录账号' }
                    </Text>
                    <View style = { styles.statusPill as StyleProp<ViewStyle> }>
                        <Icon
                            color = '#1E56A0'
                            size = { 14 }
                            src = { IconSecurityOn } />
                        <Text style = { styles.statusPillText }>
                            { statusLabel }
                        </Text>
                    </View>
                    <Text style = { styles.accountDescription }>
                        { statusDescription }
                    </Text>
                </View>

                <View style = { styles.formCard as StyleProp<ViewStyle> }>
                    <Text style = { styles.formTitle }>
                        { currentAccount ? '账号信息' : '账号登录' }
                    </Text>
                    <Text style = { styles.formHint }>
                        {
                            currentAccount
                                ? '如需更换账号，可直接修改下方账号信息后重新保存。'
                                : '保存账号后，后续进入需要身份认证的会议时会自动使用。'
                        }
                    </Text>
                    <Input
                        accessibilityLabel = { '账号输入' }
                        autoCapitalize = { 'none' }
                        customStyles = {{
                            container: styles.inputContainer,
                            input: styles.input
                        }}
                        onChange = { setUsername }
                        placeholder = { '请输入账号' }
                        textContentType = { 'username' }
                        value = { username } />
                    <Input
                        accessibilityLabel = { '密码输入' }
                        autoCapitalize = { 'none' }
                        customStyles = {{
                            container: styles.inputContainer,
                            input: styles.input
                        }}
                        onChange = { setPassword }
                        placeholder = { '请输入密码' }
                        secureTextEntry = { true }
                        textContentType = { 'password' }
                        value = { password } />
                    <View style = { styles.buttonRow as StyleProp<ViewStyle> }>
                        { renderActionButton({
                            disabled: loading,
                            onPress: onSaveAccount,
                            title: loading ? '处理中...' : currentAccount ? '更新账号' : '登录账号',
                            variant: 'primary'
                        }) }
                        {
                            Boolean(currentAccount) && renderActionButton({
                                disabled: loading,
                                onPress: onLogout,
                                title: loading ? '处理中...' : '退出账号',
                                variant: 'danger'
                            })
                        }
                    </View>
                </View>

                {
                    Boolean(feedback) && <View style = { styles.feedbackCard as StyleProp<ViewStyle> }>
                        <Text style = { styles.feedbackText }>
                            { feedback }
                        </Text>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#F8FAFC',
        flex: 1
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#E4EBF3',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14
    },
    headerButton: {
        alignItems: 'center',
        backgroundColor: '#EDF4FF',
        borderRadius: 18,
        height: 36,
        justifyContent: 'center',
        width: 36
    },
    headerButtonPressed: {
        opacity: 0.8
    },
    headerSpacer: {
        width: 36
    },
    headerTitle: {
        color: '#143865',
        fontSize: 19,
        fontWeight: '800'
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40
    },
    accountCard: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        paddingHorizontal: 24,
        paddingVertical: 28,
        shadowColor: '#163A69',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.08,
        shadowRadius: 24,
        elevation: 4
    },
    accountAvatar: {
        alignItems: 'center',
        backgroundColor: '#1E56A0',
        borderRadius: 36,
        height: 72,
        justifyContent: 'center',
        width: 72
    },
    accountTitle: {
        color: '#143865',
        fontSize: 24,
        fontWeight: '800',
        marginTop: 18,
        textAlign: 'center'
    },
    statusPill: {
        alignItems: 'center',
        backgroundColor: '#EEF5FF',
        borderRadius: 999,
        flexDirection: 'row',
        marginTop: 14,
        paddingHorizontal: 14,
        paddingVertical: 8
    },
    statusPillText: {
        color: '#1E56A0',
        fontSize: 13,
        fontWeight: '700',
        marginLeft: 6
    },
    accountDescription: {
        color: '#5C718A',
        fontSize: 14,
        lineHeight: 21,
        marginTop: 14,
        textAlign: 'center'
    },
    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        marginTop: 16,
        paddingHorizontal: 18,
        paddingVertical: 20
    },
    formTitle: {
        color: '#143865',
        fontSize: 18,
        fontWeight: '800'
    },
    formHint: {
        color: '#667B93',
        fontSize: 13,
        lineHeight: 20,
        marginTop: 8
    },
    inputContainer: {
        marginTop: 14
    },
    input: {
        backgroundColor: '#F4F8FC',
        borderColor: '#D5E2F0',
        borderRadius: 16,
        borderWidth: 1,
        color: '#143865',
        minHeight: 54,
        paddingHorizontal: 16
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 16
    },
    actionButton: {
        alignItems: 'center',
        borderRadius: 18,
        flex: 1,
        justifyContent: 'center',
        minHeight: 50,
        paddingHorizontal: 14
    },
    primaryActionButton: {
        backgroundColor: '#1E56A0'
    },
    secondaryActionButton: {
        backgroundColor: '#FFFFFF',
        borderColor: '#D5E2F0',
        borderWidth: 1,
        marginRight: 12
    },
    dangerActionButton: {
        backgroundColor: '#FFF1F0',
        borderColor: '#FFD4CF',
        borderWidth: 1,
        marginLeft: 12
    },
    pressedActionButton: {
        opacity: 0.86,
        transform: [ { scale: 0.98 } ]
    },
    disabledActionButton: {
        opacity: 0.6
    },
    actionButtonText: {
        fontSize: 15,
        fontWeight: '800'
    },
    primaryActionButtonText: {
        color: '#FFFFFF'
    },
    secondaryActionButtonText: {
        color: '#365473'
    },
    dangerActionButtonText: {
        color: '#C44536'
    },
    disabledActionButtonText: {
        opacity: 0.72
    },
    feedbackCard: {
        backgroundColor: '#ECF5FF',
        borderRadius: 18,
        marginTop: 16,
        paddingHorizontal: 16,
        paddingVertical: 14
    },
    feedbackText: {
        color: '#1B4D90',
        fontSize: 13,
        lineHeight: 20
    }
});

export default AccountPage;
