import React from 'react';
import Palette from '~/static/styles/palette';

export default React.createContext({
    background: '',
    name: '',
    externalCss: '',
    desktopLogoId: '',
    mobileLogoId: '',
    desktopBackgroundId: '',
    mobileBackgroundId: '',
    style: {
        header: {
            top: {
                color: Palette.getColor('BLUE'),
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
                color: Palette.getColor('BLUE'),
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
            color: Palette.getColor('BLUE'),
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
            color: Palette.getColor('BLUE'),
            fontSize: 14,
            family: '',
        },
        success_message: {
            color: Palette.getColor('BLUE'),
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
                color: Palette.getColor('PALE_GREY_THREE'),
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
                color: Palette.getColor('PALE_GREY_THREE'),
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
            desktopLogo: {
                url: '',
                horizontalPosition: 'center',
                verticalPosition: 'middle',
            },
            mobileLogo: {
                url: '',
                horizontalPosition: 'center',
                verticalPosition: 'middle',
            },
        },
        desktop_container: {
            background: {
                color: Palette.getColor('WHITE'),
                opacity: 100,
            },
            border: {
                color: Palette.getColor('PALE_GREY_THREE'),
                type: 'solid',
                thickness: 1,
                radius: 4,
            },
            size: {
                width: 720,
                padding: 20
            },
            position: {
                vertical: 'middle'
            },
        },
        mobile_container: {
            background: {
                color: Palette.getColor('WHITE'),
                opacity: 100,
            },
            border: {
                color: Palette.getColor('PALE_GREY_THREE'),
                type: 'solid',
                thickness: 1,
                radius: 4,
            },
            size: {
                width: 720,
                padding: 20
            },
            position: {
                vertical: 'middle'
            },
        },
        accept_button_font: {
            alignment: 'center',
            color: Palette.getColor('BLUE'),
            fontSize: 18,
            family: '',
            textActions: {
                bold: false,
                italic: false,
                underline: false
            }
        },
        accept_button_color: Palette.getColor('WHITE'),
        accept_button_size: {
            width: 145,
            padding: 10
        },
        accept_button_border: {
            color: Palette.getColor('BLUE'),
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
    fontIds: [],
    translationsLanguages: [],
    translations: {},
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
        urlPath: '',
        localeData: {},
        locales: [],
        activeLocale: null,
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
    setLocaleData: () => {},
    setActiveLocale: () => {},
    convertLocaleName: () => {},
    setTranslations: () => {},

    previewDeviceType: 'desktop',
    mobileSettingsTouched: [],
    setPreviewDeviceType: () => {},
    setDeviceTypeSettingsTouched: () => {},
    checkDeviceTypeDataChanged: () => {},
});