import React, {Component} from 'react';
import CaptivePortalContext from './project-context';

class GlobalCaptivePortalState extends Component {

    state = {
        background: '',
        name: '',
        externalCss: '',
        logoId: '',
        backgroundId: '',
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
                textActions: {
                    bold: false,
                    italic: false,
                    underline: false
                },
                alignment: 'center'
            },
            background_and_logo: {
                background: {
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
                    attachment: 'scroll',
                    size: {
                        inPercentDimension: false,
                        width: 0,
                        height: 0,
                        option: 'auto'
                    },
                },
                logo: {
                    url: '',
                    position: 'center',
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
            accept_button_font: {
                alignment: 'center',
                color: {
                    hex: '#5585ed',
                    rgba: {r: 85, g: 133, b: 237, a: 1}
                },
                fontSize: 18,
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
        termAndConditionId: '',
        googleLogin: false,
        facebookLogin: false,
        twitterLogin: false,
        acceptTermsLogin: false,
        successRedirectUrl: '',
        acceptButtonText: 'Connect',
        dataToExclude: {
            successMessageStatus: false,
            gdprSettingsStatus: false,
            gdprSettingsSetting: 'No',
            gdprList: '',
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
            gdprFromBE: ''
        }
    };

    addPortalName = name => {
        this.setState({name: name})
    };

    setBackground = (path, color, type) => {
        const currentState = this.state;
        currentState.background = 'COLOR' ? null : path;
        currentState.backgroundId = 'COLOR' && null;
        currentState.style.background_and_logo.background.url = type === 'COLOR' ? null : path;
        currentState.style.background_and_logo.background.color = color;
        currentState.style.background_and_logo.background.backgroundType = type;
        this.setState(currentState)
    };

    setBackgroundRepeating = (repeating) => {
        const currentState = this.state;
        currentState.style.background_and_logo.background.repeat = repeating;
        this.setState(currentState);
    };

    setBackgroundPosition = (position, status) => {
        const merged = {...position, inPercentDimension: status};
        console.log('context position: ', merged);
        const currentState = this.state;
        currentState.style.background_and_logo.background.position = merged;
        this.setState(currentState);
    };

    // setBackgroundAttachment = (attachment) => {
    //     const currentState = this.state;
    //     currentState.style.background_and_logo.background.position = attachment;
    //     this.setState(currentState);
    // };

    setBackgroundSize = (size, status) => {
        const merged = {...size, inPercentDimension: status};
        console.log('context size: ', merged);
        const currentState = this.state;
        currentState.style.background_and_logo.background.size = merged;
        this.setState(currentState);
    };

    setLogo = (path, position) => {
        const currentState = this.state;
        currentState.style.background_and_logo.logo.url = path;
        currentState.style.background_and_logo.logo.position = position;
        this.setState(currentState)
    };
    setBorderStyle = data => {
        const currentState = this.state;
        currentState.style.container_border = data;
        this.setState(currentState)
    };
    setBackgroundStyle = data => {
        const currentState = this.state;
        const {color, opacity} = data;
        currentState.style.container_background.color = color;
        currentState.style.container_background.opacity = opacity !== null ? opacity : 100;
        this.setState(currentState)
    };
    setSizeStyle = data => {
        const currentState = this.state;
        currentState.style.container_size = data;
        this.setState(currentState)
    };
    setHeaderTopData = (text, styles) => {
        const currentState = this.state;
        currentState.header = text;
        currentState.style.header.top = styles;
        this.setState(currentState)
    };
    setHeaderDescriptionData = (text, styles) => {
        const currentState = this.state;
        currentState.description = text;
        currentState.style.header.description = styles;
        this.setState(currentState)
    };
    setLoginMethods = data => {
        const {google, facebook, twitter, button} = data;
        this.setState({
            googleLogin: google,
            facebookLogin: facebook,
            twitterLogin: twitter,
            acceptTermsLogin: button
        })
    };
    setFooterData = (text, styles) => {
        const currentState = this.state;
        currentState.footer = text;
        currentState.style.footer = styles;
        this.setState(currentState)
    };
    setLogoID = id => {
        this.setState({
            logoId: id
        })
    };
    setBackgroundID = id => {
        this.setState({
            backgroundId: id
        })
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
        console.log('GlobalCaptivePortalState => setButtonStyles()');
        const currentState = this.state;
        const {acceptButtonText, acceptButtonBorder, acceptButtonColor, acceptButtonFont, acceptButtonSize} = data;
        currentState.acceptButtonText = acceptButtonText;
        currentState.style.accept_button_border = acceptButtonBorder;
        currentState.style.accept_button_color = acceptButtonColor;
        currentState.style.accept_button_font = acceptButtonFont;
        currentState.style.accept_button_size = acceptButtonSize;
        this.setState(currentState)
    };
    setSuccessMessageData = (text, styles) => {
        const currentState = this.state;
        currentState.successMessage = text;
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
        console.log('GDPR ...REST', rest);
        currentState.style.gdpr_settings = rest;
        currentState.dataToExclude.gdprSettingsSetting = setting;
        currentState.dataToExclude.agreeWithTermsAndConditionsLabel = agreeWithTermsAndConditionsLabel;
        currentState.dataToExclude.allowToUsePersonalInfoLabel = allowToUsePersonalInfoLabel;
        console.log(typeof settingId);
        currentState.termAndConditionId = settingId;
        console.log(settingId);
        this.setState(currentState);
        console.log(currentState);
    };

    setGDPRCollection = (array) => {
        const currentState = this.state;
        currentState.dataToExclude.gdprList = array;
        console.log(array);
        this.setState(currentState);
    };

    resetGlobalState = async () => {
        const data = {
            background: '',
            name: '',
            externalCss: '',
            logoId: '',
            backgroundId: '',
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
                    textActions: {
                        bold: false,
                        italic: false,
                        underline: false
                    },
                    alignment: 'center'
                },
                background_and_logo: {
                    background: {
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
                        attachment: 'scroll',
                        size: {
                            inPercentDimension: false,
                            width: 0,
                            height: 0,
                            option: 'auto'
                        },
                    },
                    logo: {
                        url: '',
                        position: 'center',
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
                accept_button_font: {
                    alignment: 'center',
                    color: {
                        hex: '#5585ed',
                        rgba: {r: 85, g: 133, b: 237, a: 1}
                    },
                    fontSize: 18,
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
            termAndConditionId: '',
            googleLogin: false,
            facebookLogin: false,
            twitterLogin: false,
            acceptTermsLogin: false,
            successRedirectUrl: '',
            acceptButtonText: 'Connect',
            dataToExclude: {
                successMessageStatus: false,
                gdprSettingsStatus: false,
                gdprSettingsSetting: 'No',
                gdprList: '',
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
                gdprFromBE: ''
            }
        };
        await this.loaderHandler(true);
        await this.setBackground(data.background !== null ? data.style.background_and_logo.background.url : '', data.style.background_and_logo.background.color, data.style.background_and_logo.background.backgroundType);
        await this.setLogo(data.logo !== null ? data.style.background_and_logo.logo.url : '', data.style.background_and_logo.logo.position);
        await this.setBorderStyle(data.style.container_border);
        await this.setBackgroundStyle(data.style.container_background);
        await this.setSizeStyle(data.style.container_size);
        await this.setHeaderTopData(data.header, data.style.header.top);
        await this.setHeaderDescriptionData(data.description, data.style.header.description);
        await this.setLoginMethods({
            facebook: data.facebookLogin,
            google: data.googleLogin,
            twitter: data.twitterLogin,
            button: data.acceptTermsLogin
        });
        await this.setFooterData(data.footer, data.style.footer);
        await this.setLogoID('');
        await this.setBackgroundID('');
        await this.addPortalName(data.name);
        await this.setCSS(this.state.stylesApplied ? data.externalCss : '');
        await this.redirectURLChanger(data.successRedirectUrl);
        await this.setSuccessMessageData(data.successMessage, data.style.success_message);
        await this.setButtonStyles({
            acceptButtonText: data.acceptButtonText,
            acceptButtonSize: data.style.accept_button_size,
            acceptButtonColor: data.style.accept_button_color,
            acceptButtonFont: data.style.accept_button_font,
            acceptButtonBorder: data.style.accept_button_border
        });
        await this.addPortalName(data.name);
        await this.setGDPRSettingsStatus(false);
        await this.setGDPRSettings({
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
            setting: data.dataToExclude.gdprSettingsSetting,
            agreeWithTermsAndConditionsLabel: data.dataToExclude.gdprSettingsSetting,
            allowToUsePersonalInfoLabel: data.dataToExclude.allowToUsePersonalInfoLabel,
            settingId: data.termAndConditionId,
        });
        await this.setGDPRCollection(data.dataToExclude.gdprList);
        await this.setTermsFromBE(data.dataToExclude.gdprFromBE)
    };


    previewCssGenerator = () => {
        const {
            style: {
                header: {top, description},
                footer,
                container_background,
                container_border,
                container_size,
                background_and_logo: {background, logo},
                success_message,
                accept_button_border,
                accept_button_color,
                accept_button_font,
                accept_button_size,
                gdpr_settings
            }
        } = this.state;
        console.log(gdpr_settings);
        return `
    
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
                justify-content: ${logo.position};
            }
           
            .previewContainer > div.section {
                border: ${container_border.thickness}px ${container_border.type} rgba(${container_border.color.rgba.r},${container_border.color.rgba.g},${container_border.color.rgba.b},${container_border.color.rgba.a});
                border-radius: ${container_border.radius}px;
                background: rgba(${container_background.color.rgba.r},${container_background.color.rgba.g},${container_background.color.rgba.b},${container_background.color.rgba.a});
                opacity: ${container_background.opacity / 100};
                max-width: ${container_size.width}px;
                padding: ${container_size.padding}px;
                ${container_border.type === 'none' ? 'box-shadow: none;' : 'box-shadow: 0 1px 9px 0 rgba(191, 197, 210, 0.25);'}
            }
            
            .previewContainer > div.section .head {
                color: rgba(${top && top.color.rgba.r}, ${top && top.color.rgba.g}, ${top && top.color.rgba.b}, ${top && top.color.rgba.a});
                font-size: ${top && top.fontSize}px;
                font-weight: ${top && top.textActions.bold ? 'bold' : '100'};
                font-style: ${top && top.textActions.italic === true ? 'italic' : 'normal'};
                text-decoration: ${top && top.textActions.underline ? 'underline' : 'none'};
                text-align: ${top && top.alignment};
            }
            
            .previewContainer > div.section .description {
                color: rgba(${description && description.color.rgba.r}, ${description && description.color.rgba.g}, ${description && description.color.rgba.b}, ${description && description.color.rgba.a});
                font-size: ${description && description.fontSize}px;
                font-weight: ${description && description.textActions.bold ? 'bold' : '100'};
                font-style: ${description && description.textActions.italic === true ? 'italic' : 'normal'};
                text-decoration: ${description && description.textActions.underline ? 'underline' : 'none'};
                text-align: ${description && description.alignment};
            }
            
            .previewContainer .gdprLabel {
                color: rgba(${gdpr_settings && gdpr_settings.color.rgba.r}, ${gdpr_settings && gdpr_settings.color.rgba.g}, ${gdpr_settings && gdpr_settings.color.rgba.b}, ${gdpr_settings && gdpr_settings.color.rgba.a});
                font-size: ${gdpr_settings && gdpr_settings.fontSize}px;
                text-indent 16px;
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
                min-width: ${accept_button_size.width}px;
                width: 'auto';
                padding: ${accept_button_size.padding}px;
                word-break: 'break-all';
            }
           
        `;
    };

    removeLogo = () => {
        const currentState = this.state;
        currentState.logoId = '';
        currentState.style.background_and_logo.logo.url = '';
        this.setState(currentState);
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

    render() {
        return <CaptivePortalContext.Provider value={{
            background: this.state.background,
            name: this.state.name,
            logoId: this.state.logoId,
            backgroundId: this.state.backgroundId,
            header: this.state.header,
            description: this.state.description,
            footer: this.state.footer,
            successMessage: this.state.successMessage,
            style: this.state.style,
            googleLogin: this.state.googleLogin,
            facebookLogin: this.state.facebookLogin,
            twitterLogin: this.state.twitterLogin,
            acceptTermsLogin: this.state.acceptTermsLogin,
            successRedirectUrl: this.state.successRedirectUrl,
            acceptButtonText: this.state.acceptButtonText,
            externalCss: this.state.externalCss,
            termAndConditionId: this.state.termAndConditionId,
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
            dataToExclude: this.state.dataToExclude,
            loaderHandler: this.loaderHandler,
            setSuccessMessageStatus: this.setSuccessMessageStatus,
            setNotification: this.setNotification,
            resetGlobalState: this.resetGlobalState,
            setToken: this.setToken,
            previewCssGenerator: this.previewCssGenerator,
            removeLogo: this.removeLogo,
            setGDPRSettings: this.setGDPRSettings,
            setGDPRSettingsStatus: this.setGDPRSettingsStatus,
            setGDPRCollection: this.setGDPRCollection,
            urlPathHandler: this.urlPathHandler,
            profileHandler: this.profileHandler,
            setTermsFromBE: this.setTermsFromBE,
        }}
        >{this.props.children}</CaptivePortalContext.Provider>
    }
}

export default GlobalCaptivePortalState;