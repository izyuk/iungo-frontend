import React, {Component} from 'react';
import CaptivePortalContext from './project-context';
import Palette from '~/static/styles/palette';
import { getCaptivePortalDefault, getDataToExcludeDefault } from '~/context/CaptivePortalDefault';

class GlobalCaptivePortalState extends Component {

    state = {
        ...getCaptivePortalDefault(),
        dataToExclude: getDataToExcludeDefault(),
    };

    addPortalName = name => {
        this.setState({name: name})
    };

    getDeviceTypesToUpdate = (state, deviceType, settingsType) => {
        let deviceTypes = [];
        if (deviceType) {
            deviceTypes = [deviceType];
        } else {
            const type = state.dataToExclude.previewDeviceType;
            if (type === 'desktop' && !state.dataToExclude.mobileSettingsTouched.includes(settingsType)) {
                deviceTypes = ['desktop', 'mobile'];
            } else {
                deviceTypes = [type];
                const settings = state.dataToExclude[`${type}SettingsTouched`];
                if (settings && !settings.includes(settingsType)) { settings.push(settingsType); }
            }
        }
        return deviceTypes;
    }

    getBackgroundsByDeviceType = (state, deviceType) => {
        const bgl = state.style.background_and_logo;
        const backgrounds = [];
        this.getDeviceTypesToUpdate(state, deviceType, 'background').map(type => {
            let background = bgl[`${type}Background`];
            background && backgrounds.push(background);
        })
        return backgrounds;
    }
    setBackgroundID = (id, deviceType) => {
        const currentState = this.state;
        this.getDeviceTypesToUpdate(currentState, deviceType, 'background').map(type => {
            currentState[`${type}BackgroundId`] = id;
        });
        this.setState(currentState);
    };
    setBackground = (path, color, type, deviceType) => {
        const currentState = this.state;
        this.getBackgroundsByDeviceType(currentState, deviceType).map(background => {
            currentState.background = (type === 'COLOR') ? null : path;
            background.url = (type === 'COLOR') ? null : path;
            background.color = color;
            background.backgroundType = type;
            (type === 'COLOR') && this.setBackgroundID('', deviceType);
        });
        this.setState(currentState);
    };
    setBackgroundRepeating = (repeating, deviceType) => {
        const currentState = this.state;
        this.getBackgroundsByDeviceType(currentState, deviceType).map(background => {
            background.repeat = repeating;
        });
        this.setState(currentState);
    };
    setBackgroundPosition = (position, status, deviceType) => {
        const merged = {...position, inPercentDimension: status};
        const currentState = this.state;
        this.getBackgroundsByDeviceType(currentState, deviceType).map(background => {
            background.position = merged;
        });
        this.setState(currentState);
    };
    setBackgroundSize = (size, status, deviceType) => {
        const merged = {...size, inPercentDimension: status};
        const currentState = this.state;
        this.getBackgroundsByDeviceType(currentState, deviceType).map(background => {
            background.size = merged;
        });
        this.setState(currentState);
    };
    removeBackground = () => {
        const currentState = this.state;
        this.getBackgroundsByDeviceType(currentState).map(background => {
            const color = background.color || Palette.getColor('PALE_GREY_THREE');
            background.url = null;
            background.color = color;
            background.backgroundType = 'COLOR';
        });
        this.setBackgroundID('');
    };

    getLogosByDeviceType = (state, deviceType) => {
        const bgl = state.style.background_and_logo;
        const logos = [];
        this.getDeviceTypesToUpdate(state, deviceType, 'logo').map(type => {
            let logo = bgl[`${type}Logo`];
            logo && logos.push(logo);
        })
        return logos;
    }
    setLogoID = (id, deviceType) => {
        const currentState = this.state;
        this.getDeviceTypesToUpdate(currentState, deviceType, 'logo').map(type => {
            currentState[`${type}LogoId`] = id;
        });
        this.setState(currentState);
    };
    setLogo = (path, horizontalPosition, verticalPosition, deviceType) => {
        const currentState = this.state;
        this.getLogosByDeviceType(currentState, deviceType).map(logo => {
            logo.url = path;
            logo.horizontalPosition = horizontalPosition;
            logo.verticalPosition = verticalPosition;
        });
        this.setState(currentState);
    };
    removeLogo = () => {
        const currentState = this.state;
        this.getLogosByDeviceType(currentState).map(logo => {
            logo.url = '';
        });
        this.setLogoID('');
        this.setState(currentState);
    };

    getContainersByDeviceType = (state, deviceType) => {
        const containers = [];
        this.getDeviceTypesToUpdate(state, deviceType, 'container').map(type => {
            let container = state.style[`${type}_container`];
            container && containers.push(container);
        })
        return containers;
    }
    setBorderStyle = (data, deviceType) => {
        const currentState = this.state;
        this.getContainersByDeviceType(currentState, deviceType).map(container => {
            container.border = data;
        });
        this.setState(currentState)
    };
    setBackgroundStyle = (data, deviceType) => {
        const currentState = this.state;
        const {color, opacity} = data;
        this.getContainersByDeviceType(currentState, deviceType).map(container => {
            container.background.color = color;
            container.background.opacity = opacity !== null ? opacity : 100;
        });
        this.setState(currentState);
    };
    setSizeStyle = (data, deviceType) => {
        const currentState = this.state;
        this.getContainersByDeviceType(currentState, deviceType).map(container => {
            container.size = data;
        });
        this.setState(currentState)
    };
    setContainerVerticalPosition = (data, deviceType) => {
        const currentState = this.state;
        this.getContainersByDeviceType(currentState, deviceType).map(container => {
            container.position.vertical = data;
        });
        this.setState(currentState)
    };

    setHeaderTopData = (styles) => {
        const currentState = this.state;
        currentState.style.header.top = styles;
        this.setState(currentState)
    };
    setHeaderDescriptionData = (styles) => {
        const currentState = this.state;
        currentState.style.header.description = styles;
        this.setState(currentState)
    };
    setLoginMethods = data => {
        const {google, facebook, twitter, phone, button} = data;
        this.setState({
            googleLogin: google,
            facebookLogin: facebook,
            twitterLogin: twitter,
            phoneLogin: phone,
            acceptTermsLogin: button
        })
    };
    setFooterData = (styles) => {
        const currentState = this.state;
        currentState.style.footer = styles;
        this.setState(currentState)
    };
    setCSS = str => {
        this.setState({
            externalCss: str && str
        })
    };
    redirectURLChanger = url => {
        this.setState({
            successRedirectUrl: url
        })
    };
    setButtonStyles = data => {
        const currentState = this.state;
        const {acceptButtonBorder, acceptButtonColor, acceptButtonFont, acceptButtonSize} = data;
        currentState.style.accept_button_border = acceptButtonBorder;
        currentState.style.accept_button_color = acceptButtonColor;
        currentState.style.accept_button_font = acceptButtonFont;
        currentState.style.accept_button_size = acceptButtonSize;
        this.setState(currentState)
    };
    setSuccessMessageData = (styles) => {
        const currentState = this.state;
        currentState.style.success_message = styles;
        this.setState(currentState)
    };

    setExternalCssInfo = (css, status, nodes, inlineStyles) => {
        const currentState = this.state;
        currentState.externalCss = css;
        currentState.dataToExclude.stylesApplied = status;
        currentState.dataToExclude.styledElements = nodes;
        currentState.dataToExclude.stylesArray = inlineStyles;
        this.setState(currentState);
    };

    loaderHandler = boolean => {
        const currentState = this.state;
        currentState.dataToExclude.loader = boolean;
        this.setState(currentState)
    };

    setSuccessMessageStatus = boolean => {
        const currentState = this.state;
        currentState.dataToExclude.successMessageStatus = boolean;
        this.setState(currentState)
    };

    setGDPRSettingsStatus = boolean => {
        const currentState = this.state;
        currentState.dataToExclude.gdprSettingsStatus = boolean;
        this.setState(currentState)
    };

    setNotification = (text, failed, status) => {
        const currentState = this.state;
        currentState.dataToExclude.publishedType = text;
        currentState.dataToExclude.failed = failed;
        currentState.dataToExclude.notification = status;
        this.setState(currentState)
    };

    setToken = token => {
        const currentState = this.state;
        currentState.dataToExclude.token = token;
        this.setState(currentState);
    };

    setGDPRSettings = (styles) => {
        const currentState = this.state;
        const {setting, agreeWithTermsAndConditionsLabel, allowToUsePersonalInfoLabel, settingId, ...rest} = styles;
        currentState.style.gdpr_settings = rest;
        currentState.dataToExclude.gdprSettingsSetting = setting;
        currentState.dataToExclude.agreeWithTermsAndConditionsLabel = agreeWithTermsAndConditionsLabel;
        currentState.dataToExclude.allowToUsePersonalInfoLabel = allowToUsePersonalInfoLabel;
        currentState.termAndConditionId = settingId;
        this.setState(currentState);
    };

    setGDPRCollection = (array) => {
        const currentState = this.state;
        currentState.dataToExclude.gdprList = array;
        this.setState(currentState);
    };

    resetGlobalState = async () => {
        const data = {
            ...getCaptivePortalDefault(),
            dataToExclude: getDataToExcludeDefault()
        };
        await this.loaderHandler(true);
        await this.clearTranslations();
        await this.setPreviewDeviceType('desktop');
        await this.setDeviceTypeSettingsTouched('mobile', []);

        await this.setBackground(data.background !== null ? data.style.background_and_logo.desktopBackground.url : '', data.style.background_and_logo.desktopBackground.color, data.style.background_and_logo.desktopBackground.backgroundType);
        await this.setLogo(data.logo !== null ? data.style.background_and_logo.desktopLogo.url : '', data.style.background_and_logo.desktopLogo.horizontalPosition, data.style.background_and_logo.desktopLogo.verticalPosition);
        await this.setBorderStyle(data.style.desktop_container.border);
        await this.setBackgroundStyle(data.style.desktop_container.background);
        await this.setSizeStyle(data.style.desktop_container.size);
        await this.setContainerVerticalPosition(data.style.desktop_container.position.vertical);
        await this.setHeaderTopData(data.style.header.top);
        await this.setHeaderDescriptionData(data.style.header.description);
        await this.setLoginMethods({
            facebook: data.facebookLogin,
            google: data.googleLogin,
            twitter: data.twitterLogin,
            button: data.acceptTermsLogin
        });
        await this.setFooterData(data.style.footer);
        await this.setLogoID('');
        await this.setBackgroundID('');
        await this.addPortalName(data.name);
        await this.setCSS(this.state.stylesApplied ? data.externalCss : '');
        await this.redirectURLChanger(data.successRedirectUrl);
        await this.setSuccessMessageData(data.style.success_message);
        await this.setButtonStyles({
            acceptButtonSize: data.style.accept_button_size,
            acceptButtonColor: data.style.accept_button_color,
            acceptButtonFont: data.style.accept_button_font,
            acceptButtonBorder: data.style.accept_button_border
        });
        await this.addPortalName(data.name);
        await this.setGDPRSettingsStatus(false);
        await this.setGDPRSettings({
            color: Palette.getColor('BLUE'),
            fontSize: 14,
            setting: data.dataToExclude.gdprSettingsSetting,
            agreeWithTermsAndConditionsLabel: data.dataToExclude.gdprSettingsSetting,
            allowToUsePersonalInfoLabel: data.dataToExclude.allowToUsePersonalInfoLabel,
            settingId: data.termAndConditionId,
        });
        await this.setGDPRCollection(data.dataToExclude.gdprList);
        await this.setTermsFromBE(data.dataToExclude.gdprFromBE);

        await this.setFontsCollection(data.dataToExclude.fontsList);

        await this.setFontData({fontName: data.dataToExclude.fontName, fontIds: data.fontIds});

        await this.setFontBase64(data.dataToExclude.base64EncodedValue);
        await this.loaderHandler(false);
    };


    previewCssGenerator = () => {
        const {
            style: {
                header: {top, description},
                footer,
                background_and_logo,
                success_message,
                accept_button_border,
                accept_button_color,
                accept_button_font,
                accept_button_size,
                gdpr_settings,
            },
            dataToExclude: {
                fontName,
                base64EncodedValue,
                previewDeviceType,
            },
        } = this.state;
        const logo = background_and_logo[`${previewDeviceType}Logo`] || background_and_logo.desktopLogo;
        const background = background_and_logo[`${previewDeviceType}Background`] || background_and_logo.desktopBackground;
        const container = this.state.style[`${previewDeviceType}_container`] || this.state.style.desktop_container;

        let containerVerticalPosition;
        let logoVerticalPosition;

        switch (container.position.vertical) {
            case "top":
                containerVerticalPosition = 'margin: 0 auto auto auto';
                break;
            case "middle":
                containerVerticalPosition = 'margin: auto';
                break;
            case "bottom":
                containerVerticalPosition = 'margin: auto auto 0 auto';
                break;
        }

        switch (logo.verticalPosition) {
            case "top":
                logoVerticalPosition = 'margin-bottom: auto';
                break;
            case "middle":
                logoVerticalPosition = 'margin: auto 0';
                break;
            case "bottom":
                logoVerticalPosition = 'margin-top: auto';
                break;
        }

        if (container.position.vertical === 'top' && logo.verticalPosition === 'top') {
            logoVerticalPosition = 'margin-bottom: 0';
        } else if (container.position.vertical === 'bottom' && logo.verticalPosition === 'bottom') {
            containerVerticalPosition = 'margin: 0 auto 0 auto';
        }

        return `
            ${base64EncodedValue !== '' ?
            `@font-face {
                    font-family: ${fontName};
                    font-style: normal;
                    font-weight: normal;
                    src: local(${fontName}), url(${base64EncodedValue}) format('woff');
                }` : ''
            }
            
            .previewMain { 
                background:  ${background.backgroundType === 'COLOR' ?
            `rgba(${background.color.rgba.r}, ${background.color.rgba.g}, ${background.color.rgba.b}, ${background.color.rgba.a})` :
            `url('${background.url}')`};
                    background-repeat: ${background.repeat};
                    background-position: ${background.position.inPercentDimension ?
            `${background.position.posX}% ${background.position.posY}%` :
            background.position.option};
                    background-attachment: ${background.attachment};
                    background-size: ${background.size.inPercentDimension ?
            `${background.size.width}% ${background.size.height}%` :
            background.size.option};
            }
            
            .previewLogoPlace {
                justify-content: ${logo.horizontalPosition};
            }
            
            .previewContainer > .header {
                ${logoVerticalPosition};
            }
           
            .previewContainer > div.section {
                position: relative;
                border: ${container.border.thickness}px ${container.border.type} rgba(${container.border.color.rgba.r},${container.border.color.rgba.g},${container.border.color.rgba.b},${container.border.color.rgba.a});
                border-radius: ${container.border.radius}px 0 ${container.border.radius}px ${container.border.radius}px;
                background: rgba(${container.background.color.rgba.r},${container.background.color.rgba.g},${container.background.color.rgba.b},${container.background.color.rgba.a});
                opacity: ${container.background.opacity / 100};
                max-width: ${container.size.width}px;
                padding: ${container.size.padding}px;
                ${container.border.type === 'none' ? 'box-shadow: none;' : 'box-shadow: 0 1px 9px 0 rgba(191, 197, 210, 0.25);'}
                
                ${containerVerticalPosition};
            }
           
            .previewContainer .langaugeSwitcher {
                border: ${container.border.thickness}px ${container.border.type} rgba(${container.border.color.rgba.r},${container.border.color.rgba.g},${container.border.color.rgba.b},${container.border.color.rgba.a});
                border-radius: ${container.border.radius}px ${container.border.radius}px 0 0;
                background: rgba(${container.background.color.rgba.r},${container.background.color.rgba.g},${container.background.color.rgba.b},${container.background.color.rgba.a});
                opacity: ${container.background.opacity / 100};
                right: -${container.border.type !=='none' ? container.border.thickness : 0}px;
            }
            
            .previewContainer > div.section .head {
                color: rgba(${top && top.color.rgba.r}, ${top && top.color.rgba.g}, ${top && top.color.rgba.b}, ${top && top.color.rgba.a});
                font-size: ${top && top.fontSize}px;
                font-weight: ${top && top.textActions.bold ? 'bold' : '100'};
                font-style: ${top && top.textActions.italic === true ? 'italic' : 'normal'};
                text-decoration: ${top && top.textActions.underline ? 'underline' : 'none'};
                text-align: ${top && top.alignment};
                ${fontName && `font-family: ${fontName}, sans-serif`}
            }
            
            .previewContainer > div.section .description {
                color: rgba(${description && description.color.rgba.r}, ${description && description.color.rgba.g}, ${description && description.color.rgba.b}, ${description && description.color.rgba.a});
                font-size: ${description && description.fontSize}px;
                font-weight: ${description && description.textActions.bold ? 'bold' : '100'};
                font-style: ${description && description.textActions.italic === true ? 'italic' : 'normal'};
                text-decoration: ${description && description.textActions.underline ? 'underline' : 'none'};
                text-align: ${description && description.alignment};
                ${fontName && `font-family: ${fontName}, sans-serif`}
            }
                
            .previewContainer .gdprLabel {
                color: rgba(${gdpr_settings && gdpr_settings.color.rgba.r}, ${gdpr_settings && gdpr_settings.color.rgba.g}, ${gdpr_settings && gdpr_settings.color.rgba.b}, ${gdpr_settings && gdpr_settings.color.rgba.a});
                font-size: ${gdpr_settings && gdpr_settings.fontSize}px;
                display: flex;
                ${fontName && `font-family: ${fontName}, sans-serif`}
            }

            .previewContainer .gdprLabel input {
                height: 1.3em;
            }
            
            .previewContainer > div.section .text {
                color: rgba(${success_message && success_message.color.rgba.r}, ${success_message && success_message.color.rgba.g}, ${success_message && success_message.color.rgba.b}, ${success_message && success_message.color.rgba.a});
                font-size: ${success_message && success_message.fontSize}px;
                font-weight: ${success_message && success_message.textActions.bold ? 'bold' : '100'};
                font-style: ${success_message && success_message.textActions.italic === true ? 'italic' : 'normal'};
                text-decoration: ${success_message && success_message.textActions.underline ? 'underline' : 'none'};
                text-align: ${success_message && success_message.alignment};
            }
            
            .previewMain > .footer .text {
                color: rgba(${footer && footer.color.rgba.r}, ${footer && footer.color.rgba.g}, ${footer && footer.color.rgba.b}, ${footer && footer.color.rgba.a});
                font-size: ${footer && footer.fontSize}px;
                font-weight: ${footer && footer.textActions.bold ? 'bold' : '100'};
                font-style: ${footer && footer.textActions.italic === true ? 'italic' : 'normal'};
                text-decoration: ${footer && footer.textActions.underline ? 'underline' : 'none'};
                text-align: ${footer && footer.alignment};
                ${fontName && `font-family: ${fontName}, sans-serif`}
                }
                
                .previewContainer .socialsWrap .accept button {
                    border: ${accept_button_border && accept_button_border.thickness}px ${accept_button_border && accept_button_border.type} rgba(${accept_button_border && accept_button_border.color.rgba.r}, ${accept_button_border && accept_button_border.color.rgba.g}, ${accept_button_border && accept_button_border.color.rgba.b}, ${accept_button_border && accept_button_border.color.rgba.a});
                border-radius: ${accept_button_border.radius}px;
                background-color: rgba(${accept_button_color.rgba.r}, ${accept_button_color.rgba.g}, ${accept_button_color.rgba.b}, ${accept_button_color.rgba.a});
                color: rgba(${accept_button_font.color.rgba.r}, ${accept_button_font.color.rgba.g}, ${accept_button_font.color.rgba.b}, ${accept_button_font.color.rgba.a});
                font-size: ${accept_button_font.fontSize}px;
                text-align: ${accept_button_font.alignment};
                font-weight: ${accept_button_font.textActions.bold ? 'bold' : '100'};
                font-style: ${accept_button_font.textActions.italic ? 'italic' : 'unset'};
                text-decoration: ${accept_button_font.textActions.underline ? 'underline' : 'unset'};
                flex-basis: ${accept_button_size.width}px;
                padding: ${accept_button_size.padding}px;
                word-break: break-all;
                ${fontName && `font-family: ${fontName}, sans-serif`}
            }
           
        `;
    };

    urlPathHandler = url => {
        const currentState = this.state;
        currentState.dataToExclude.urlPath = url;
        this.setState(currentState);
    };

    profileHandler = data => {
        const currentState = this.state;
        currentState.dataToExclude.profileInfo = data;
        this.setState(currentState);
    };

    setTermsFromBE = (data) => {
        const currentState = this.state;
        currentState.dataToExclude.gdprFromBE = data;
        this.setState(currentState);
    };

    setFontsCollection = (data) => {
        const currentState = this.state;
        if (data !== '' && data !== null) {
            currentState.dataToExclude.fontsList = data;
            this.setState(currentState);
        }
    };

    setFontData = ({fontName, fontIds}) => {
        const currentState = this.state;
        currentState.fontIds = fontIds;
        currentState.dataToExclude.fontName = fontName;
        currentState.style.header.top.family = fontName;
        currentState.style.header.description.family = fontName;
        currentState.style.gdpr_settings.family = fontName;
        currentState.style.footer.family = fontName;
        currentState.style.success_message.family = fontName;
        currentState.style.accept_button_font.family = fontName;
        this.setState(currentState);
    };

    setFontBase64 = (base64EncodedValue) => {
        const currentState = this.state;
        currentState.dataToExclude.base64EncodedValue = base64EncodedValue;
        this.setState(currentState);
    };
    setLocaleData = (localeData, setDefaultContentData) => {
        const currentState = this.state;
        currentState.dataToExclude.localeData = localeData;
        const activeLocale = currentState.dataToExclude.activeLocale;
        const portalData = (localeData && localeData[activeLocale] && localeData[activeLocale].portalData) || null;
        if (setDefaultContentData && portalData){
            this.setTranslations(activeLocale, portalData);
        }
        currentState.dataToExclude.locales = [];
        for (let locale in localeData) {
            currentState.dataToExclude.locales.push(locale);
        }
        this.setState(currentState);
    }

    setTranslations = (locale, translations = {}, remove) => {
        const currentState = this.state;
        const langs = currentState.translationsLanguages;
        if (remove) {
            const index = langs.indexOf(locale);
            if (index !== -1) { langs.splice(index, 1); }
            if (currentState.dataToExclude.activeLocale === locale) {
                currentState.dataToExclude.activeLocale = langs[0];
            }
        } else {
            const currentTranslation = currentState.translations[locale] || {};
            const defaultTranslation = (currentState.dataToExclude.localeData[locale] && currentState.dataToExclude.localeData[locale].portalData) || {};
            if (!langs.includes(locale)) {
                langs.push(locale);
            }
            const mockedTranslation = {
                name: 'Company name',
                description: 'Venue description',
                footer: 'Footer content',
                successMessageText: 'Default success message',
                connectButtonText: 'Connect',
            };
            const getTranslation = (name) => {
                let translation = '';
                if (translations.hasOwnProperty(name)) {
                    translation = translations[name];
                } else if (currentTranslation.hasOwnProperty(name)) {
                    translation = currentTranslation[name];
                } else if (defaultTranslation.hasOwnProperty(name)) {
                    translation = defaultTranslation[name];
                } else  {
                    translation = mockedTranslation[name] || '';
                }
                return translation;
            }
            currentState.translations[locale] = {
                name: getTranslation('name'),
                description: getTranslation('description'),
                footer: getTranslation('footer'),
                successMessageText: getTranslation('successMessageText'),
                connectButtonText: getTranslation('connectButtonText'),
            };
        }
        if (translations.hasOwnProperty('default')) {
            const isDefault = Boolean(translations.default);
            currentState.translations[locale].default = isDefault;
        }
        // check for one default lang:
        let defaultCount = 0;
        let defaultLang = '';
        langs.map(lang => {
            if (currentState.translations[lang].default) { defaultCount++; }
            else { currentState.translations[lang].default = false; }
            const l = currentState.dataToExclude.localeData[lang];
            if (l && l.default) { defaultLang = lang; }
        });
        if (defaultCount === 0) {
            langs.map(lang => {
                if (lang === defaultLang) { currentState.translations[lang].default = true; defaultCount++; }
            });
            if (defaultCount === 0) { currentState.translations[langs[0]].default = true; }
        } else if (defaultCount > 1 && translations.default) {
            langs.map(lang => { currentState.translations[lang].default = false; });
            currentState.translations[locale].default = true;
        }
        this.setState(currentState);
    }

    clearTranslations() {
        const currentState = this.state;
        currentState.translations = {};
        currentState.translationsLanguages = [];
        currentState.dataToExclude.activeLocale = '';
        this.setState(currentState);
    }

    setActiveLocale = (activeLocale) => {
        const currentState = this.state;
        currentState.dataToExclude.activeLocale = activeLocale;
        this.setState(currentState);
        if (!currentState.translations[activeLocale]) {
            const localeData = currentState.dataToExclude.localeData;
            const portalData = (localeData && localeData[activeLocale] && localeData[activeLocale].portalData) || {};
            this.setTranslations(activeLocale, portalData);
        }
    }

    setPreviewDeviceType = (deviceType) => {
        const currentState = this.state;
        currentState.dataToExclude.previewDeviceType = deviceType;
        this.setState(currentState);
    };
    setDeviceTypeSettingsTouched = (deviceType, touched) => {
        const currentState = this.state;
        currentState.dataToExclude[`${deviceType}SettingsTouched`] = touched;
        this.setState(currentState);
    }
    checkDeviceTypeDataChanged = (deviceType, data) => {
        const currentState = this.state;
        let changed = [];
        if (deviceType !== 'desktop') {
            const backgroundsEqual = (JSON.stringify(data.desktopBackground) === JSON.stringify(data[`${deviceType}Background`]));
            const backgroundStylesEqual = (JSON.stringify(data.style.background_and_logo.desktopBackground) === JSON.stringify(data.style.background_and_logo[`${deviceType}Background`]));
            if (!backgroundsEqual || !backgroundStylesEqual) { changed.push('background'); };

            const logosEqual = (JSON.stringify(data.desktopLogo) === JSON.stringify(data[`${deviceType}Logo`]));
            const logoStylesEqual = (JSON.stringify(data.style.background_and_logo.desktopLogo) === JSON.stringify(data.style.background_and_logo[`${deviceType}Logo`]));
            if (!logosEqual || !logoStylesEqual) { changed.push('logo'); };

            const containerStylesEqual = (JSON.stringify(data.style.desktop_container) === JSON.stringify(data.style[`${deviceType}_container`]));
            if (!containerStylesEqual) { changed.push('container'); };
        }
        currentState.dataToExclude[`${deviceType}SettingsTouched`] = changed;
        this.setState(currentState);
    };

    setActiveSettingsPath = (path) => {
        const currentState = this.state;
        currentState.dataToExclude.activeSettingsPath = path;
        this.setState(currentState);
    };

    render() {
        return <CaptivePortalContext.Provider value={{
            ...this.state,
            addPortalName: this.addPortalName,
            setBackground: this.setBackground,
            setBackgroundRepeating: this.setBackgroundRepeating,
            setBackgroundPosition: this.setBackgroundPosition,
            setBackgroundAttachment: this.setBackgroundAttachment,
            setBackgroundSize: this.setBackgroundSize,
            setLogo: this.setLogo,
            setBorderStyle: this.setBorderStyle,
            setBackgroundStyle: this.setBackgroundStyle,
            setSizeStyle: this.setSizeStyle,
            setContainerVerticalPosition: this.setContainerVerticalPosition,
            setHeaderTopData: this.setHeaderTopData,
            setHeaderDescriptionData: this.setHeaderDescriptionData,
            setLoginMethods: this.setLoginMethods,
            setFooterData: this.setFooterData,
            setLogoID: this.setLogoID,
            setBackgroundID: this.setBackgroundID,
            setCSS: this.setCSS,
            redirectURLChanger: this.redirectURLChanger,
            setButtonStyles: this.setButtonStyles,
            setSuccessMessageData: this.setSuccessMessageData,
            setExternalCssInfo: this.setExternalCssInfo,
            loaderHandler: this.loaderHandler,
            setSuccessMessageStatus: this.setSuccessMessageStatus,
            setNotification: this.setNotification,
            resetGlobalState: this.resetGlobalState,
            setToken: this.setToken,
            previewCssGenerator: this.previewCssGenerator,
            removeLogo: this.removeLogo,
            removeBackground: this.removeBackground,
            setGDPRSettings: this.setGDPRSettings,
            setGDPRSettingsStatus: this.setGDPRSettingsStatus,
            setGDPRCollection: this.setGDPRCollection,
            urlPathHandler: this.urlPathHandler,
            profileHandler: this.profileHandler,
            setTermsFromBE: this.setTermsFromBE,
            setFontsCollection: this.setFontsCollection,
            setFontData: this.setFontData,
            setFontBase64: this.setFontBase64,
            setLocaleData: this.setLocaleData,
            setActiveLocale: this.setActiveLocale,
            setTranslations: this.setTranslations,
            clearTranslations: this.clearTranslations,
            setPreviewDeviceType: this.setPreviewDeviceType,
            setDeviceTypeSettingsTouched: this.setDeviceTypeSettingsTouched,
            checkDeviceTypeDataChanged: this.checkDeviceTypeDataChanged,
            setActiveSettingsPath: this.setActiveSettingsPath,
        }}
        >{this.props.children}</CaptivePortalContext.Provider>
    }
}

export default GlobalCaptivePortalState;