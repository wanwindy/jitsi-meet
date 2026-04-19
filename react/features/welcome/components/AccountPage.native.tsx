import dayjs from 'dayjs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleProp,
    StyleSheet,
    TextInput,
    View,
    ViewStyle
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { appNavigate } from '../../app/actions.native';
import { IReduxState } from '../../app/types';
import {
    bootstrapBusinessAuth,
    clearPendingBusinessAuthNavigation,
    loginBusinessAccount,
    logoutBusinessAccount
} from '../../business-auth/actions.native';
import {
    getBusinessAuthDeviceInfo,
    getBusinessAuthPendingNavigation,
    getBusinessAuthUser,
    isBusinessAuthHydrated,
    isBusinessAuthLoggedIn
} from '../../business-auth/functions';
import Icon from '../../base/icons/components/Icon';
import {
    IconArrowLeft,
    IconSecurityOn,
    IconUser
} from '../../base/icons/svg';
import Text from '../../base/react/components/native/Text';

interface IAccountButtonProps {
    disabled?: boolean;
    onPress: () => void;
    title: string;
    variant: 'danger' | 'primary' | 'secondary';
}

function formatDateTime(value?: string) {
    if (!value) {
        return '暂无';
    }

    const formattedValue = dayjs(value);

    return formattedValue.isValid() ? formattedValue.format('YYYY-MM-DD HH:mm') : value;
}

function renderInfoRow(label: string, value: string, compact = false) {
    return (
        <View
            key = { label }
            style = { styles.infoRow as StyleProp<ViewStyle> }>
            <Text style = { styles.infoLabel }>
                { label }
            </Text>
            <Text style = { compact ? styles.infoValueCompact : styles.infoValue }>
                { value }
            </Text>
        </View>
    );
}

/**
 * Business account page for the welcome screen.
 *
 * @returns {ReactElement}
 */
function AccountPage() {
    const dispatch = useDispatch<any>();
    const navigation = useNavigation<any>();
    const [ feedback, setFeedback ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ username, setUsername ] = useState('');

    const deviceInfo = useSelector(getBusinessAuthDeviceInfo);
    const hydrated = useSelector(isBusinessAuthHydrated);
    const isLoggedIn = useSelector(isBusinessAuthLoggedIn);
    const pendingNavigation = useSelector(getBusinessAuthPendingNavigation);
    const user = useSelector(getBusinessAuthUser);
    const isSubmitting = useSelector((state: IReduxState) => state['features/business-auth'].isSubmitting);

    useFocusEffect(useCallback(() => {
        if (!hydrated) {
            void dispatch(bootstrapBusinessAuth());
        }

        if (user?.username) {
            setUsername(user.username);
        }
    }, [ dispatch, hydrated, user?.username ]));

    const onGoBack = useCallback(() => {
        if (pendingNavigation) {
            dispatch(clearPendingBusinessAuthNavigation());
        }

        navigation.goBack();
    }, [ dispatch, navigation, pendingNavigation ]);

    const onLogin = useCallback(async () => {
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        if (!trimmedUsername || !trimmedPassword) {
            setFeedback('请输入账号和密码。');

            return;
        }

        setFeedback('');

        try {
            await dispatch(loginBusinessAccount(trimmedUsername, trimmedPassword));
            setPassword('');

            if (pendingNavigation) {
                const { uri, ...options } = pendingNavigation;

                dispatch(clearPendingBusinessAuthNavigation());
                await dispatch(appNavigate(uri, options));

                return;
            }

            navigation.goBack();
        } catch (error: any) {
            setFeedback(error?.message || '网络异常，请稍后重试');
        }
    }, [ dispatch, navigation, password, pendingNavigation, username ]);

    const onLogout = useCallback(async () => {
        setFeedback('');

        await dispatch(logoutBusinessAccount());
        setPassword('');
        setUsername('');
        setFeedback('已退出登录，本机 deviceId 已保留，下次登录仍会沿用当前设备标识。');
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

    const accountTitle = user?.nickname || user?.username || '未登录账号';
    const statusLabel = !hydrated
        ? '初始化中'
        : isLoggedIn
            ? '已登录'
            : '未登录';
    const statusDescription = !hydrated
        ? '正在初始化本机设备信息，请稍候。'
        : isLoggedIn
            ? '当前设备已通过业务登录校验，可从首页进入会议入口。'
            : '请先完成业务登录。首次登录时，后端会自动将当前设备绑定到该账号。';
    const currentBindingStatus = isLoggedIn && user?.boundDeviceId && deviceInfo?.deviceId === user.boundDeviceId
        ? '当前设备已绑定'
        : isLoggedIn
            ? '已登录成功'
            : '尚未绑定账号';
    const formHint = isLoggedIn
        ? '如需切换账号，请输入新的账号密码重新登录。退出登录只会清理本地登录态，不会解绑设备。'
        : '';

    return (
        <SafeAreaView
            edges = { [ 'top', 'left', 'right', 'bottom' ] }
            style = { styles.page as ViewStyle }>
            <View style = { styles.header as StyleProp<ViewStyle> }>
                <Pressable
                    accessibilityLabel = { '返回首页' }
                    onPress = { onGoBack }
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
                        { accountTitle }
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
                    <View style = { styles.bindingPill as StyleProp<ViewStyle> }>
                        <Text style = { styles.bindingPillText }>
                            { currentBindingStatus }
                        </Text>
                    </View>
                </View>

                {
                    pendingNavigation && <View style = { styles.pendingCard as StyleProp<ViewStyle> }>
                        <Text style = { styles.pendingTitle }>
                            { '登录后将继续进入会议' }
                        </Text>
                        <Text style = { styles.pendingText }>
                            { pendingNavigation.uri }
                        </Text>
                    </View>
                }

                <View style = { styles.formCard as StyleProp<ViewStyle> }>
                    <Text style = { styles.formTitle }>
                        { isLoggedIn ? '切换账号' : '账号登录' }
                    </Text>
                    { Boolean(formHint) && <Text style = { styles.formHint }>
                        { formHint }
                    </Text> }
                    <View style = { styles.inputContainer as StyleProp<ViewStyle> }>
                        <TextInput
                            accessibilityLabel = { '账号输入' }
                            autoCapitalize = { 'none' }
                            autoCorrect = { false }
                            onChangeText = { setUsername }
                            placeholder = { '请输入账号' }
                            placeholderTextColor = { '#7B8CA0' }
                            selectionColor = { '#1E56A0' }
                            spellCheck = { false }
                            style = { styles.input }
                            textContentType = { 'username' }
                            value = { username } />
                    </View>
                    <View style = { styles.inputContainer as StyleProp<ViewStyle> }>
                        <TextInput
                            accessibilityLabel = { '密码输入' }
                            autoCapitalize = { 'none' }
                            autoCorrect = { false }
                            onChangeText = { setPassword }
                            placeholder = { '请输入密码' }
                            placeholderTextColor = { '#7B8CA0' }
                            secureTextEntry = { true }
                            selectionColor = { '#1E56A0' }
                            spellCheck = { false }
                            style = { styles.input }
                            textContentType = { 'password' }
                            value = { password } />
                    </View>
                    <View style = { styles.buttonRow as StyleProp<ViewStyle> }>
                        { renderActionButton({
                            disabled: isSubmitting,
                            onPress: onLogin,
                            title: isSubmitting ? '登录中...' : isLoggedIn ? '重新登录' : '登录账号',
                            variant: 'primary'
                        }) }
                        {
                            isLoggedIn && renderActionButton({
                                disabled: isSubmitting,
                                onPress: onLogout,
                                title: isSubmitting ? '处理中...' : '退出登录',
                                variant: 'danger'
                            })
                        }
                    </View>
                </View>

                <View style = { styles.infoCard as StyleProp<ViewStyle> }>
                    <Text style = { styles.infoCardTitle }>
                        { '当前设备信息' }
                    </Text>
                    { renderInfoRow('设备名称', deviceInfo?.deviceName || '读取中...') }
                    { renderInfoRow('平台', deviceInfo?.platform || '读取中...') }
                    { renderInfoRow('App 版本', deviceInfo?.appVersion || '读取中...') }
                    { renderInfoRow('deviceId', deviceInfo?.deviceId || '生成中...', true) }
                </View>

                {
                    isLoggedIn && <View style = { styles.infoCard as StyleProp<ViewStyle> }>
                        <Text style = { styles.infoCardTitle }>
                            { '绑定与登录信息' }
                        </Text>
                        { renderInfoRow('当前账号', user?.username || '暂无') }
                        { renderInfoRow('昵称', user?.nickname || '暂无') }
                        { renderInfoRow('绑定设备', user?.deviceName || '暂无') }
                        { renderInfoRow('绑定平台', user?.devicePlatform || '暂无') }
                        { renderInfoRow('绑定时间', formatDateTime(user?.deviceBoundAt)) }
                        { renderInfoRow('最近登录', formatDateTime(user?.lastLoginAt)) }
                    </View>
                }

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
    bindingPill: {
        backgroundColor: '#F4F8FC',
        borderRadius: 999,
        marginTop: 14,
        paddingHorizontal: 14,
        paddingVertical: 8
    },
    bindingPillText: {
        color: '#45627D',
        fontSize: 12,
        fontWeight: '700'
    },
    pendingCard: {
        backgroundColor: '#FFF8E8',
        borderColor: '#F3D8A4',
        borderRadius: 22,
        borderWidth: 1,
        marginTop: 16,
        paddingHorizontal: 18,
        paddingVertical: 16
    },
    pendingTitle: {
        color: '#8E5A0B',
        fontSize: 14,
        fontWeight: '800'
    },
    pendingText: {
        color: '#9A6A21',
        fontSize: 13,
        lineHeight: 20,
        marginTop: 8
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
        marginTop: 14,
        width: '100%'
    },
    input: {
        backgroundColor: '#F4F8FC',
        borderColor: '#D5E2F0',
        borderRadius: 16,
        borderWidth: 1,
        color: '#143865',
        fontSize: 16,
        minHeight: 54,
        paddingHorizontal: 16,
        paddingVertical: 12,
        width: '100%'
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
    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        marginTop: 16,
        paddingHorizontal: 18,
        paddingVertical: 18
    },
    infoCardTitle: {
        color: '#143865',
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 8
    },
    infoRow: {
        borderBottomColor: '#E9EFF6',
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingVertical: 12
    },
    infoLabel: {
        color: '#68809B',
        fontSize: 12,
        fontWeight: '700'
    },
    infoValue: {
        color: '#173E6D',
        fontSize: 15,
        lineHeight: 22,
        marginTop: 6
    },
    infoValueCompact: {
        color: '#173E6D',
        fontSize: 13,
        lineHeight: 20,
        marginTop: 6
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
