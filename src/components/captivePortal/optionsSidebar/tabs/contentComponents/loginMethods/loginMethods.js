import React, {Component} from 'react';
import {connect} from 'react-redux';

import AgreementButton from './agreementButton';

class LoginMethods extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.login_methods.methods || {
            facebook: false,
            google: false,
            twitter: false,
            button: false
        };
        this.facebook = React.createRef();
        this.google = React.createRef();
        this.twitter = React.createRef();
        this.button = React.createRef();
    }

    componentDidMount() {
        if (this.props.login_methods.methods !== undefined) {
            let obj = this.props.login_methods.methods, key;
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
        let id = e.currentTarget.id;
        this.setState({
            [id]: !this.state[id]
        });
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.facebook !== nextState.facebook) {
            return true
        } else if (this.state.google !== nextState.google) {
            return true
        } else if (this.state.twitter !== nextState.twitter) {
            return true
        } else if (this.state.button !== nextState.button) {
            return true
        } else {
            return false
        }
    }

    componentDidUpdate() {
        this.props.loginMethods(this.state);
        this.props.methods(this.state);
    }

    render() {
        return (
            <div className="container methodList">
                <div className="row">
                            <div className="socialsWrap">
                                <label htmlFor="facebook">
                                    <span className="checkBoxPlace">
                                        <input ref={this.facebook} type="checkbox" id="facebook" onChange={this.checkBoxHandler}/>
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
                                </label>
                                <label htmlFor="google">
                                    <span className="checkBoxPlace">
                                        <input ref={this.google} type="checkbox" id="google" onChange={this.checkBoxHandler}/>
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
                                </label>
                                <label htmlFor="button">
                                    <span className="checkBoxPlace">
                                        <input ref={this.button} type="checkbox" id="button" onChange={this.checkBoxHandler}/>
                                        <span></span>

                                    </span>
                                    <div>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="26" viewBox="0 0 24 24">
                                                <path style={{fill: '#5585ed'}} d="M20 12.194v9.806h-20v-20h18.272l-1.951 2h-14.321v16h16v-5.768l2-2.038zm.904-10.027l-9.404 9.639-4.405-4.176-3.095 3.097 7.5 7.273 12.5-12.737-3.096-3.096z"/>
                                            </svg>
                                        </span>
                                    </div>
                                </label>
                                {this.state.button && <AgreementButton acceptButton={this.props.acceptButton}/>}

                            </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        login_methods: state.login_methods
    }),
    dispatch => ({
        loginMethods: (data) => {
            dispatch({type: "LOGIN_METHODS", payload: data});
        }
    })
)(LoginMethods);
