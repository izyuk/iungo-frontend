import React from 'react';
import Palette from '../static/styles/palette';

export default React.createContext({
    background: '',
    name: '',
    externalCss: '',
    logoId: '',
    desktopBackgroundId: '',
    mobileBackgroundId: '',
    header: 'Company name',
    description: 'Venue description',
    footer: 'Footer content',
    successMessage: 'Default success message',
    style: {
        header: {
            top: {
                color: Palette.BLUE,
                fontSize: 18,
                family: '',
                textActions: {
                    bold: false,
                    italic: false,
                    underline: false
                },
                alignment: 'center'
            },
            description: {
                color: Palette.BLUE,
                fontSize: 18,
                family: '',
                textActions: {
                    bold: false,
                    italic: false,
                    underline: false
                },
                alignment: 'center'
            },
        },
        footer: {
            color: Palette.BLUE,
            fontSize: 18,
            family: '',
            textActions: {
                bold: false,
                italic: false,
                underline: false
            },
            alignment: 'center'
        },
        gdpr_settings: {
            color: Palette.BLUE,
            fontSize: 14,
            family: '',
        },
        success_message: {
            color: Palette.BLUE,
            fontSize: 18,
            family: '',
            textActions: {
                bold: false,
                italic: false,
                underline: false
            },
            alignment: 'center'
        },
        background_and_logo: {
            desktopBackground: {
                url: '',
                color: Palette.PALE_GREY_THREE,
                backgroundType: 'COLOR',
                repeat: 'repeat',
                position: {
                    inPercentDimension: true,
                    posX: 0,
                    posY: 0,
                    option: ''
                },
                size: {
                    inPercentDimension: false,
                    width: 0,
                    height: 0,
                    option: 'auto'
                },
            },
            mobileBackground: {
                url: '',
                color: Palette.PALE_GREY_THREE,
                backgroundType: 'COLOR',
                repeat: 'repeat',
                position: {
                    inPercentDimension: true,
                    posX: 0,
                    posY: 0,
                    option: ''
                },
                size: {
                    inPercentDimension: false,
                    width: 0,
                    height: 0,
                    option: 'auto'
                },
            },
            logo: {
                url: '',
                horizontalPosition: 'center',
                verticalPosition: 'middle',
            }
        },
        container_background: {
            color: Palette.WHITE,
            opacity: 100,
        },
        container_border: {
            color: Palette.PALE_GREY_THREE,
            type: 'solid',
            thickness: 1,
            radius: 4,
        },
        container_size: {
            width: 720,
            padding: 20
        },
        container_position: {
            vertical: 'middle'
        },
        accept_button_font: {
            alignment: 'center',
            color: Palette.BLUE,
            fontSize: 18,
            family: '',
            textActions: {
                bold: false,
                italic: false,
                underline: false
            }
        },
        accept_button_color: Palette.WHITE,
        accept_button_size: {
            width: 145,
            padding: 10
        },
        accept_button_border: {
            color: Palette.BLUE,
            radius: 5,
            type: "solid",
            thickness: 1
        }
    },
    googleLogin: false,
    facebookLogin: false,
    twitterLogin: false,
    phoneLogin: false,
    acceptTermsLogin: false,
    successRedirectUrl: '',
    termAndConditionId: '',
    fontId: '',
    acceptButtonText: 'Connect',
    addPortalName: () => {},
    setBackground: () => {},
    setBackgroundRepeating: () => {},
    setBackgroundPosition: () => {},
    // setBackgroundAttachment: () => {},
    setBackgroundSize: () => {},
    setLogo: () => {},
    setBorderStyle: () => {},
    setBackgroundStyle: () => {},
    setSizeStyle: () => {},
    setContainerVerticalPosition: () => {},
    setHeaderTopData: () => {},
    setHeaderDescriptionData: () => {},
    setLoginMethods: () => {},
    setFooterData: () => {},
    setLogoID: () => {},
    setBackgroundID: () => {},
    setCSS: () => {},
    redirectURLChanger: () => {},
    setButtonStyles: () => {},
    setSuccessMessageData: () => {},
    setExternalCssInfo: () => {},
    setGDPRSettings: () => {},
    setGDPRSettingsStatus: () => {},
    setGDPRCollection: () => {},
    dataToExclude: {
        successMessageStatus: false,
        gdprSettingsStatus: false,
        gdprSettingsSetting: 'No',
        gdprList: '',
        fontsList: '',
        fontName: 'Avenir',
        agreeWithTermsAndConditionsLabel: '',
        allowToUsePersonalInfoLabel: '',
        loader: false,
        publishedType: '',
        failed: false,
        notification: false,
        stylesApplied: false,
        styledElements: '',
        stylesArray: '',
        token: '',
        urlPath: ''
    },
    loaderHandler: () => {},
    setSuccessMessageStatus: () => {},
    setNotification: () => {},
    resetGlobalState: () => {},
    setToken: () => {},
    previewCssGenerator: () => {},
    removeLogo: () => {},
    removeBackground: () => {},
    urlPathHandler: () => {},
    profileHandler: () => {},
    setTermsFromBE: () => {},
    setFontsCollection: () => {},
    setFontData: () => {},
    setFontBase64: () => {},

    previewDeviceType: 'desktop',
    mobileSettingsTouched: [],
    setPreviewDeviceType: () => {},
    setDeviceTypeSettingsTouched: () => {},
    checkDeviceTypeBackgroundChanged: () => {},
});