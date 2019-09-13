import React, {Component} from 'react';
import AgreementButton from './agreementButton';
import CaptivePortalContext from "~/context/project-context";
import Icons from '~/static/images/icons';

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
                                    <Icons.FacebookIcon />
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
                                    <Icons.GoogleIcon />
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
                                    <Icons.PhoneIcon />
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
                                    <Icons.CheckSquareIcon />
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
