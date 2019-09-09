import React, {Component} from 'react';
import CaptivePortalContext from "~/context/project-context";

class Methods extends Component {
    static contextType = CaptivePortalContext;

    constructor(props) {
        super(props);

        this.state = {
            button: this.props.button || this.props.loginAgreeButton
        };
        this.socials = React.createRef();
        this.facebook = React.createRef();
        this.google = React.createRef();
        this.twitter = React.createRef();
        this.phone = React.createRef();
        this.button = React.createRef();
    }

    methodsHandler = (data) => {
        let obj = data,
            key;
        for (key in obj) {
            obj[key] ? this[key].current.classList.remove("hidden") : this[key].current.classList.add("hidden")
        }
    };

    componentDidMount() {
        const {
            googleLogin,
            facebookLogin,
            twitterLogin,
            phoneLogin,
            acceptTermsLogin
        } = this.context;
        this.methodsHandler({
            google: googleLogin,
            facebook: facebookLogin,
            twitter: twitterLogin,
            phone: phoneLogin,
            button: acceptTermsLogin
        })
    }

    componentDidUpdate() {
        const {
            googleLogin,
            facebookLogin,
            twitterLogin,
            phoneLogin,
            acceptTermsLogin
        } = this.context;
        this.methodsHandler({
            google: googleLogin,
            facebook: facebookLogin,
            twitter: twitterLogin,
            phone: phoneLogin,
            button: acceptTermsLogin
        });

        if (document.getElementsByClassName("hidden").length >= this.socials.current.children.length) {
            this.socials.current.style.display = 'none'
        } else {
            this.socials.current.style.display = 'block'
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.context.googleLogin !== nextContext.googleLogin) return true;
        if (this.context.dataToExclude.localeData !== nextContext.dataToExclude.localeData) return true;
        else if (this.context.facebookLogin !== nextContext.facebookLogin) return true;
        else if (this.context.twitterLogin !== nextContext.twitterLogin) return true;
        else if (this.context.phoneLogin !== nextContext.phoneLogin) return true;
        else if (this.context.acceptTermsLogin !== nextContext.acceptTermsLogin) return true;
        else return false
    }

    render() {
        let {
            acceptButtonText,
            dataToExclude,
        } = this.context;  
        const localeData = (dataToExclude && dataToExclude.localeData) || {};
        const activeLocale = (dataToExclude && dataToExclude.activeLocale) || null;
        const portalData = (localeData[activeLocale] && localeData[activeLocale].portalData) || null;
        const translation = this.context.translations[activeLocale] || {};
        return (
            <div className="socialsWrap" ref={this.socials}>
                <div className="fb" ref={this.facebook} data-cy="loginMethodFacebookPreview">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                            <path fill="#FFF" fillRule="nonzero"
                                  d="M15.3 0H.7C.3 0 0 .3 0 .7v14.7c0 .3.3.6.7.6H8v-5H6V8h2V6c0-2.1 1.2-3 3-3h2v3h-1c-.6 0-1 .4-1 1v1h2.6l-.6 3h-2v5h4.3c.4 0 .7-.3.7-.7V.7c0-.4-.3-.7-.7-.7z"/>
                        </svg>
                    </span>
                    <input type="button" value={portalData ? portalData.facebookLabel : 'Continue with Facebook'}/></div>
                <div className="google" ref={this.google} data-cy="loginMethodGooglePreview">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                            <path fill="#FFF" fillRule="nonzero"
                                  d="M7 6v2.4h4.1c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C10.6.7 9 0 7.1 0c-3.9 0-7 3.1-7 7s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7z"/>
                        </svg>
                    </span>
                    <input type="button" value={portalData ? portalData.googleLabel : 'Continue with Google'}/></div>
                <div className="tw" ref={this.twitter} data-cy="loginMethodTwitterPreview">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14">
                            <path fill="#FFF" fillRule="nonzero"
                                  d="M16 2c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1C9.3.5 7.8 2 7.8 3.8c0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 6.7 1.8 8 3.3 8.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 3.3 15.6 2.7 16 2z"/>
                        </svg>
                    </span>
                    <input type="button" value={'Continue with Twitter'}/></div>
                <div className="phone_number" ref={this.phone} data-cy="loginMethodPhonePreview">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <path fill="#8D98B0" fillRule="nonzero"
                                      d="M15.285 12.305l-2.578-2.594a1 1 0 0 0-1.416-.002L9 12 4 7l2.294-2.294a1 1 0 0 0 .001-1.414L3.715.708a1 1 0 0 0-1.415 0L.004 3.003 0 3c0 7.18 5.82 13 13 13l2.283-2.283a1 1 0 0 0 .002-1.412z"/>
                            </svg>
                        </span>
                        <input type="tel" placeholder={portalData ? portalData.phonePlaceholder : 'Continue with Phone'} autoComplete='off'/>
                        <button type={'button'}>{portalData ? portalData.sendButton : 'Send'}</button>
                </div>
                <div className="accept" ref={this.button}>
                    <button data-cy="loginMethodConnectButtonPreview">
                        {translation.connectButtonText || acceptButtonText}
                    </button>
                </div>
            </div>
        )
    }
}


export default Methods;
