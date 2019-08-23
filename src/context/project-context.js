import React from 'react';

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
                color: {
                    rgba: {
                        r: 85,
                        g: 133,
                        b: 237,
                        a: 1,
                    },
                    hex: '#5585ed'
                },
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
                color: {
                    rgba: {
                        r: 85,
                        g: 133,
                        b: 237,
                        a: 1,
                    },
                    hex: '#5585ed'
                },
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
            color: {
                rgba: {
                    r: 85,
                    g: 133,
                    b: 237,
                    a: 1,
                },
                hex: '#5585ed'
            },
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
            color: {
                rgba: {
                    r: 85,
                    g: 133,
                    b: 237,
                    a: 1,
                },
                hex: '#5585ed'
            },
            fontSize: 14,
            family: '',
        },
        success_message: {
            color: {
                rgba: {
                    r: 85,
                    g: 133,
                    b: 237,
                    a: 1,
                },
                hex: '#5585ed'
            },
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
                color: {
                    rgba: {
                        r: 229,
                        g: 233,
                        b: 242,
                        a: 1,
                    },
                    hex: '#e5e9f2'
                },
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
                color: {
                    rgba: {
                        r: 229,
                        g: 233,
                        b: 242,
                        a: 1,
                    },
                    hex: '#e5e9f2'
                },
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
            color: {
                rgba: {
                    r: 255,
                    g: 255,
                    b: 255,
                    a: 1,
                },
                hex: '#ffffff'
            },
            opacity: 100,
        },
        container_border: {
            color: {
                rgba: {
                    r: 229,
                    g: 233,
                    b: 242,
                    a: 1,
                },
                hex: '#e5e9f2'
            },
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
            color: {
                hex: '#5585ed',
                rgba: {r: 85, g: 133, b: 237, a: 1}
            },
            fontSize: 18,
            family: '',
            textActions: {
                bold: false,
                italic: false,
                underline: false
            }
        },
        accept_button_color: {
            hex: "#ffffff",
            rgba: {r: 255, g: 255, b: 255, a: 1}
        },
        accept_button_size: {
            width: 145,
            padding: 10
        },
        accept_button_border: {
            color: {
                hex: '#5585ed',
                rgba: {r: 85, g: 133, b: 237, a: 1}
            },
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
    mobileSettingsTouched: false,
    setPreviewDeviceType: () => {},
    setDeviceTypeSettingsTouched: () => {},
    checkDeviceTypeBackgroundChanged: () => {},
});