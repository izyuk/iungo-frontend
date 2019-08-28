import React, {Component} from 'react';
import AgreementButton from './agreementButton';
import CaptivePortalContext from "../../../../../../context/project-context";

class LoginMethods extends Component {

    static contextType = CaptivePortalContext;
    state = {
        facebook: this.context.facebookLogin,
        google: this.context.googleLogin,
        twitter: this.context.twitterLogin,
        phone: this.context.phoneLogin,
        button: this.context.acceptTermsLogin
    };

    facebook = React.createRef();
    google = React.createRef();
    twitter = React.createRef();
    phone = React.createRef();
    button = React.createRef();

    componentDidMount() {
        if (this.state !== undefined) {
            let obj = this.state, key;
            for (key in obj) {
                this.state[key] = obj[key]
            }
        }
        let obj = this.state,
            key;
        for (key in obj) {
            obj[key] ? this[key].current.checked = true : false
        }
    }

    checkBoxHandler = (e) => {
        const currentState = this.state;
        const id = e.currentTarget.id;
        currentState[id] = !this.state[id];
        this.setState(currentState);
        this.context.setLoginMethods(this.state);
    };

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.facebook !== nextState.facebook) ||
            (this.state.google !== nextState.google) ||
            (this.state.twitter !== nextState.twitter) ||
            (this.state.phone !== nextState.phone) ||
            (this.state.button !== nextState.button);
    }

    render() {
        return (
            <div className="container active methodList">
                <div className="row">
                    <div className="socialsWrap">
                        <label htmlFor="facebook">
                            <span className="checkBoxPlace">
                                <input ref={this.facebook} type="checkbox" id="facebook"
                                       onChange={this.checkBoxHandler} data-cy="loginMethodFacebook"/>
                                <span></span>
                            </span>
                            <div className="fb">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         viewBox="0 0 16 16">
                                        <path fill="#FFF" fillRule="nonzero"
                                              d="M15.3 0H.7C.3 0 0 .3 0 .7v14.7c0 .3.3.6.7.6H8v-5H6V8h2V6c0-2.1 1.2-3 3-3h2v3h-1c-.6 0-1 .4-1 1v1h2.6l-.6 3h-2v5h4.3c.4 0 .7-.3.7-.7V.7c0-.4-.3-.7-.7-.7z"/>
                                    </svg>
                                </span>
                            </div>
                            <span>Facebook button</span>
                        </label>
                        <label htmlFor="google">
                            <span className="checkBoxPlace">
                                <input ref={this.google} type="checkbox" id="google"
                                       onChange={this.checkBoxHandler} data-cy="loginMethodGoogle"/>
                                <span></span>
                            </span>
                            <div className="google">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                         viewBox="0 0 14 14">
                                        <path fill="#FFF" fillRule="nonzero"
                                              d="M7 6v2.4h4.1c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C10.6.7 9 0 7.1 0c-3.9 0-7 3.1-7 7s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7z"/>
                                    </svg>
                                </span>
                            </div>
                            <span>Google button</span>
                        </label>
                        <label htmlFor="phone">
                            <span className="checkBoxPlace">
                                <input ref={this.phone} type="checkbox" id="phone"
                                       onChange={this.checkBoxHandler} data-cy="loginMethodPhone"/>
                                <span></span>
                            </span>
                            <div className="phone_number">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <path fill="#8D98B0" fillRule="nonzero"
                                              d="M15.285 12.305l-2.578-2.594a1 1 0 0 0-1.416-.002L9 12 4 7l2.294-2.294a1 1 0 0 0 .001-1.414L3.715.708a1 1 0 0 0-1.415 0L.004 3.003 0 3c0 7.18 5.82 13 13 13l2.283-2.283a1 1 0 0 0 .002-1.412z"/>
                                    </svg>
                                </span>
                            </div>
                            <span>Phone number via SMS</span>
                        </label>
                        <label htmlFor="button">
                                <span className="checkBoxPlace">
                                    <input ref={this.button} type="checkbox" id="button"
                                           onChange={this.checkBoxHandler} data-cy="loginMethodConnectButton"/>
                                    <span></span>
                                </span>
                            <div>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                         viewBox="0 0 24 24">
                                        <path style={{fill: '#ffffff'}}
                                              d="M20 12.194v9.806h-20v-20h18.272l-1.951 2h-14.321v16h16v-5.768l2-2.038zm.904-10.027l-9.404 9.639-4.405-4.176-3.095 3.097 7.5 7.273 12.5-12.737-3.096-3.096z"/>
                                    </svg>
                                </span>
                            </div>
                            <span>Connect button</span>
                        </label>
                        {this.state.button && <AgreementButton acceptButton={this.props.acceptButton}/>}

                    </div>
                </div>
            </div>
        )
    }
}

export default LoginMethods;
