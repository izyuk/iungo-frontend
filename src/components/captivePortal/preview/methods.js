import React, {Component} from 'react';
import CaptivePortalContext from "~/context/project-context";
import Icons from '~/static/images/icons';

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
        let { dataToExclude } = this.context;  
        const localeData = (dataToExclude && dataToExclude.localeData) || {};
        const activeLocale = (dataToExclude && dataToExclude.activeLocale) || null;
        const portalData = (localeData[activeLocale] && localeData[activeLocale].portalData) || null;
        const translation = this.context.translations[activeLocale] || {};
        return (
            <div className="socialsWrap" ref={this.socials}>
                <div className="fb" ref={this.facebook} data-cy="loginMethodFacebookPreview">
                    <span>
                        <Icons.FacebookIcon />
                    </span>
                    <input type="button" value={portalData ? portalData.facebookLabel : 'Continue with Facebook'}/></div>
                <div className="google" ref={this.google} data-cy="loginMethodGooglePreview">
                    <span>
                        <Icons.GoogleIcon />
                    </span>
                    <input type="button" value={portalData ? portalData.googleLabel : 'Continue with Google'}/></div>
                <div className="tw" ref={this.twitter} data-cy="loginMethodTwitterPreview">
                    <span>
                        <Icons.TwitterIcon />
                    </span>
                    <input type="button" value={'Continue with Twitter'}/></div>
                <div className="phone_number" ref={this.phone} data-cy="loginMethodPhonePreview">
                        <span>
                            <Icons.PhoneIcon />
                        </span>
                        <input type="tel" placeholder={portalData ? portalData.phonePlaceholder : 'Continue with Phone'} autoComplete='off'/>
                        <button type={'button'}>{portalData ? portalData.sendButton : 'Send'}</button>
                </div>
                <div className="accept" ref={this.button}>
                    <button data-cy="loginMethodConnectButtonPreview">
                        {translation.connectButtonText}
                    </button>
                </div>
            </div>
        )
    }
}


export default Methods;
