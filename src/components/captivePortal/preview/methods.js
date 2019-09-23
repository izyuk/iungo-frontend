import React, {Component} from 'react';
import CaptivePortalContext from "~/context/project-context";
import Icons from '~/static/images/icons';
import ContentEditable from 'react-contenteditable';

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
        this.beforeEditContent = this.beforeEditContent.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
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

    beforeEditContent(e){
        const name = e.currentTarget.getAttribute('name');
        const tabName = e.currentTarget.getAttribute('data-edit-tab');
        this.context.setActiveSettingsPath(`content.${tabName}.${name}`);
    }
    handleContentChange(e){
        const val = e.target.value || e.target.innerText || '';
        const tmp = document.createElement('div');
        tmp.innerHTML = val;
        const textVal = tmp.textContent || '';
        const name = e.currentTarget.getAttribute('name');
        const language = this.context.dataToExclude.activeLocale || null;
        if (textVal.length || e.type === 'blur') {
            this.context.setTranslations(language, { [name]: textVal });
        }
        if (e.type === 'blur') {
            const tabName = e.currentTarget.getAttribute('data-edit-tab');
            this.context.setActiveSettingsPath(`content.${tabName}`);
        }
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
                    {Boolean(translation.connectButtonText) && <ContentEditable
                        name="connectButtonText"
                        html={translation.connectButtonText || ''}
                        onChange={this.handleContentChange}
                        onBlur={this.handleContentChange}
                        onFocus={this.beforeEditContent}
                        data-edit-tab="login_methods"
                        tagName="button"
                        data-cy="loginMethodConnectButtonPreview"
                    />}
                </div>
            </div>
        )
    }
}


export default Methods;
