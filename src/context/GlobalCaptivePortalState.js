import React, {Component} from 'react';
import CaptivePortalContext from './captive-portal-context';

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
                    backgroundType: 'COLOR'
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
        googleLogin: false,
        facebookLogin: false,
        twitterLogin: false,
        acceptTermsLogin: false,
        successRedirectUrl: '',
        acceptButtonText: 'Connect',
        dataToExclude: {
            successMessageStatus: false,
            loader: false,
            publishedType: '',
            failed: false,
            notification: false,
            stylesApplied: false,
            styledElements: '',
            stylesArray: ''
        }
    };

    addPortalName = name => {
        this.setState({name: name})
    };

    setBackground = (path, color, type) => {
        const currentState = this.state;
        currentState.background = 'COLOR' ? null : path;
        currentState.style.background_and_logo.background.url = type === 'COLOR' ? null : path;
        currentState.style.background_and_logo.background.color = color;
        currentState.style.background_and_logo.background.backgroundType = type;
        this.setState(currentState)
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
        // if (status) {
        //     Object.keys(nodes).map((item, i) => {
        //         nodes[item].removeAttribute('style');
        //     });
        // } else {
        //     const STYLE = document.getElementsByTagName('STYLE')[0];
        //     if (STYLE) STYLE.parentNode.removeChild(STYLE);
        //     Object.keys(state.styledElements).map((item, i) => {
        //         state.styledElements[item].setAttribute('style', state.stylesArray[item])
        //     })
        // }
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

    setNotification = (text, failed, status) => {
        const currentState = this.state;
        currentState.dataToExclude.publishedType = text;
        currentState.dataToExclude.failed = failed;
        currentState.dataToExclude.notification = status;
        this.setState(currentState)
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
                        backgroundType: 'COLOR'
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
            googleLogin: false,
            facebookLogin: false,
            twitterLogin: false,
            acceptTermsLogin: false,
            successRedirectUrl: '',
            acceptButtonText: 'Connect',
            dataToExclude: {
                successMessageStatus: false,
                loader: false,
                publishedType: '',
                failed: false,
                notification: false
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
            addPortalName: this.addPortalName,
            setBackground: this.setBackground,
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
        }}
        >{this.props.children}</CaptivePortalContext.Provider>
    }
}

export default GlobalCaptivePortalState;