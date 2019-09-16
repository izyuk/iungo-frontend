
import Palette from '~/static/styles/palette';

const captivePortalDefault = {
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
                attachment: 'scroll',
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
                attachment: 'scroll',
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
    termAndConditionId: '',
    fontIds: [],
    googleLogin: false,
    facebookLogin: false,
    twitterLogin: false,
    phoneLogin: false,
    acceptTermsLogin: false,
    successRedirectUrl: '',
    translationsLanguages: [],
    translations: {},
};

const dataToExclude = {
    successMessageStatus: false,
    gdprSettingsStatus: false,
    gdprSettingsSetting: 'No',
    gdprList: '',
    fontName: 'Arial',
    base64EncodedValue: '',
    fontsList: '',
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
    gdprFromBE: '',
    localeData: {},
    activeLocale: '',
    previewDeviceType: 'desktop',
    mobileSettingsTouched: [],
};

export const getCaptivePortalDefault = () => {
    return JSON.parse( JSON.stringify(captivePortalDefault) );
}

export const getDataToExcludeDefault = () => {
    return JSON.parse( JSON.stringify(dataToExclude) );
}