import { StyleSheet } from 'react-native';

import { BoxModel } from '../../base/styles/components/styles/BoxModel';
import BaseTheme from '../../base/ui/components/BaseTheme.native';

export const AVATAR_SIZE = 104;

/**
 * The default color of text on the WelcomePage.
 */
const TEXT_COLOR = BaseTheme.palette.text01;

/**
 * The styles of the React {@code Components} of the feature welcome including
 * {@code WelcomePage} and {@code BlankPage}.
 */
export default {

    blankPageText: {
        color: TEXT_COLOR,
        fontSize: 18
    },

    /**
     * View that is rendered when there is no welcome page.
     */
    blankPageWrapper: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        backgroundColor: BaseTheme.palette.uiBackground,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },

    /**
     * Join button style.
     */
    button: {
        backgroundColor: BaseTheme.palette.action01,
        borderColor: BaseTheme.palette.action01,
        borderRadius: BaseTheme.shape.borderRadius,
        borderWidth: 1,
        height: BaseTheme.spacing[7],
        justifyContent: 'center',
        paddingHorizontal: BaseTheme.spacing[4]
    },

    joinButtonLabel: {
        textTransform: 'uppercase'
    },

    joinButtonText: {
        alignSelf: 'center',
        color: BaseTheme.palette.text01,
        fontSize: 14
    },

    enterRoomText: {
        color: TEXT_COLOR,
        fontSize: 18,
        marginBottom: BoxModel.margin
    },

    /**
     * Container for the button on the hint box.
     */
    hintButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    /**
     * Container for the hint box.
     */
    hintContainer: {
        flexDirection: 'column',
        overflow: 'hidden'
    },

    /**
     * The text of the hint box.
     */
    hintText: {
        color: BaseTheme.palette.text01,
        textAlign: 'center'
    },

    /**
     * Container for the text on the hint box.
     */
    hintTextContainer: {
        marginBottom: 2 * BoxModel.margin
    },

    /**
     * Container for the items in the side bar.
     */
    itemContainer: {
        flexDirection: 'column',
        paddingTop: 10
    },

    messageContainer: {
        backgroundColor: BaseTheme.palette.ui03,
        borderRadius: BaseTheme.shape.borderRadius,
        marginVertical: BaseTheme.spacing[1],
        paddingHorizontal: BaseTheme.spacing[2],
        paddingVertical: 2 * BaseTheme.spacing[2]
    },

    roomNameInputContainer: {
        height: '0%'
    },

    /**
     * Top-level screen style.
     */
    page: {
        flex: 1,
        flexDirection: 'column'
    },

    /**
     * The styles for reduced UI mode.
     */
    reducedUIContainer: {
        alignItems: 'center',
        backgroundColor: BaseTheme.palette.link01,
        flex: 1,
        justifyContent: 'center'
    },

    reducedUIText: {
        color: TEXT_COLOR,
        fontSize: 12
    },

    /**
     * Container for room name input box and 'join' button.
     */
    roomContainer: {
        alignSelf: 'stretch',
        flexDirection: 'column',
        padding: BaseTheme.spacing[3]
    },

    /**
     * The container of the label of the audio-video switch.
     */
    switchLabel: {
        paddingHorizontal: 3
    },

    /**
     * Room input style.
     */
    textInput: {
        backgroundColor: 'transparent',
        borderColor: BaseTheme.palette.ui10,
        borderRadius: 4,
        borderWidth: 1,
        color: TEXT_COLOR,
        fontSize: 23,
        height: 50,
        padding: 4,
        textAlign: 'center'
    },

    /**
     * Application title style.
     */
    title: {
        color: TEXT_COLOR,
        fontSize: 25,
        marginBottom: 2 * BoxModel.margin,
        textAlign: 'center'
    },

    insecureRoomNameWarningContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: BaseTheme.spacing[1]
    },

    insecureRoomNameWarningIcon: {
        color: BaseTheme.palette.warning02,
        fontSize: 24,
        marginRight: 10
    },

    insecureRoomNameWarningText: {
        color: BaseTheme.palette.text01,
        flex: 1
    },

    /**
     * The style of the top-level container of {@code WelcomePage}.
     */
    welcomePage: {
        backgroundColor: BaseTheme.palette.uiBackground,
        flex: 1,
        overflow: 'hidden'
    },

    customInput: {
        fontSize: 18,
        letterSpacing: 0,
        textAlign: 'center'
    },

    recentList: {
        backgroundColor: BaseTheme.palette.uiBackground,
        flex: 1,
        overflow: 'hidden'
    },

    recentListDisabled: {
        backgroundColor: BaseTheme.palette.uiBackground,
        flex: 1,
        opacity: 0.8,
        overflow: 'hidden'
    },

    simpleWelcomePage: {
        backgroundColor: '#F8FAFC',
        flex: 1
    },

    pageContent: {
        paddingBottom: 40
    },

    topBar: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#E3EAF2',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 16,
        paddingHorizontal: 20,
        paddingTop: 8,
        shadowColor: '#143865',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.04,
        shadowRadius: 14,
        elevation: 2
    },

    topBarBrand: {
        alignItems: 'center',
        flexDirection: 'row'
    },

    topBarActions: {
        alignItems: 'center',
        flexDirection: 'row'
    },

    topBarLogo: {
        borderRadius: 10,
        height: 40,
        marginRight: 12,
        width: 40
    },

    topBarTitle: {
        color: '#1E56A0',
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: 0.2,
        lineHeight: 34
    },

    topBarActionButton: {
        alignItems: 'center',
        backgroundColor: '#EDF4FF',
        borderRadius: 19,
        height: 38,
        justifyContent: 'center',
        width: 38
    },

    topBarActionButtonPressed: {
        opacity: 0.84
    },

    heroCard: {
        backgroundColor: '#1E56A0',
        borderRadius: 28,
        marginHorizontal: 16,
        marginTop: 18,
        minHeight: 218,
        overflow: 'hidden',
        shadowColor: '#143865',
        shadowOffset: {
            width: 0,
            height: 12
        },
        shadowOpacity: 0.14,
        shadowRadius: 24,
        elevation: 5
    },

    heroArtwork: {
        ...StyleSheet.absoluteFillObject
    },

    heroContent: {
        justifyContent: 'flex-end',
        minHeight: 218,
        paddingHorizontal: 24,
        paddingVertical: 24
    },

    heroTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 34,
        maxWidth: 220
    },

    heroSubtitle: {
        color: 'rgba(255, 255, 255, 0.84)',
        fontSize: 15,
        lineHeight: 21,
        marginTop: 10,
        maxWidth: 210
    },

    heroSecurityBadge: {
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderColor: 'rgba(255, 255, 255, 0.14)',
        borderRadius: 999,
        borderWidth: 1,
        flexDirection: 'row',
        marginTop: 22,
        paddingHorizontal: 14,
        paddingVertical: 10
    },

    heroSecurityBadgeText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
        marginLeft: 8
    },

    actionCardsRow: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 22,
        paddingHorizontal: 6
    },

    actionCard: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#E6ECF3',
        borderRadius: 28,
        borderWidth: 1,
        flex: 1,
        marginHorizontal: 6,
        minHeight: 184,
        paddingHorizontal: 16,
        paddingVertical: 28,
        shadowColor: '#183A6A',
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 4
    },

    actionCardPressed: {
        elevation: 6,
        shadowOpacity: 0.16,
        shadowRadius: 12,
        transform: [ { scale: 0.98 } ]
    },

    actionIconShell: {
        alignItems: 'center',
        backgroundColor: '#EEF4FF',
        borderRadius: 22,
        flexDirection: 'row',
        height: 72,
        justifyContent: 'center',
        marginBottom: 24,
        position: 'relative',
        width: 72
    },

    actionIconBadge: {
        alignItems: 'center',
        backgroundColor: '#1E56A0',
        borderRadius: 7,
        height: 22,
        justifyContent: 'center',
        left: 12,
        position: 'absolute',
        top: 14,
        width: 22
    },

    joinDoorFrame: {
        borderColor: '#1E56A0',
        borderRadius: 5,
        borderWidth: 2,
        height: 32,
        marginRight: 8,
        width: 20
    },

    joinDoorHandle: {
        backgroundColor: '#1E56A0',
        borderRadius: 99,
        height: 5,
        position: 'absolute',
        right: 3,
        top: 12,
        width: 5
    },

    joinDoorArrow: {
        marginLeft: 2
    },

    actionCardTitle: {
        color: '#10284A',
        fontSize: 18,
        fontWeight: '800',
        lineHeight: 26
    },

    joinModalOverlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        backgroundColor: 'rgba(8, 24, 47, 0.32)',
        justifyContent: 'flex-end',
        paddingBottom: 24,
        paddingHorizontal: 16
    },

    joinModalBackdrop: {
        ...StyleSheet.absoluteFillObject
    },

    joinMeetingPanel: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 20,
        shadowColor: '#143865',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.14,
        shadowRadius: 24,
        width: '100%',
        elevation: 8
    },

    joinMeetingTitle: {
        color: '#143865',
        fontSize: 20,
        fontWeight: '800',
        lineHeight: 28
    },

    joinMeetingSubtitle: {
        color: '#60738A',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 14,
        marginTop: 8
    },

    joinMeetingInputContainer: {
        marginBottom: 6
    },

    joinMeetingInput: {
        backgroundColor: '#F4F8FC',
        borderColor: '#D5E2F0',
        borderRadius: 16,
        borderWidth: 1,
        color: '#143865',
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: 1.4,
        minHeight: 56,
        paddingHorizontal: 16,
        textAlign: 'left'
    },

    joinPanelActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 18
    },

    joinPanelCancelButton: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#D4DFEA',
        borderRadius: 16,
        borderWidth: 1,
        flex: 1,
        height: 48,
        justifyContent: 'center',
        marginRight: 8
    },

    joinPanelCancelButtonPressed: {
        backgroundColor: '#F4F8FC'
    },

    joinPanelCancelText: {
        color: '#45627D',
        fontSize: 15,
        fontWeight: '700'
    },

    joinPanelConfirmButton: {
        alignItems: 'center',
        backgroundColor: '#1E56A0',
        borderRadius: 16,
        flex: 1,
        height: 48,
        justifyContent: 'center',
        marginLeft: 8,
        shadowColor: '#1E56A0',
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 0.18,
        shadowRadius: 12,
        elevation: 4
    },

    joinPanelConfirmButtonPressed: {
        backgroundColor: '#174784'
    },

    joinPanelConfirmButtonDisabled: {
        backgroundColor: '#97B5D3',
        elevation: 0,
        shadowOpacity: 0
    },

    joinPanelConfirmText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '800'
    },

    joinMeetingButton: {
        marginTop: BaseTheme.spacing[2]
    }
};
