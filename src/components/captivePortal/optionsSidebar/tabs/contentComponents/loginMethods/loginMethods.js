import React, {Component} from 'react';
import {connect} from 'react-redux';

class LoginMethods extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facebook: true,
            google: true,
            twitter: true
        };
        this.checkBoxHandler = this.checkBoxHandler.bind(this);
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
            obj[key] ? document.getElementById(key).checked = true : false
        }
    }

    checkBoxHandler(e) {
        let id = e.currentTarget.id;
        this.setState({
            [id]: !this.state[id]
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.facebook !== nextState.facebook) {
            return true
        } else if (this.state.google !== nextState.google) {
            return true
        } else if (this.state.twitter !== nextState.twitter) {
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
            <div className={this.props.style.container}>
                <div className={this.props.style.row}>
                    <div className={this.props.style.logoLeft}>
                        <span className={this.props.style}>Methods list</span>
                    </div>
                    <div className={this.props.style.right}>
                        <div className={this.props.style.innerCol}>
                            <div className={this.props.style.socialsWrap}>
                                <label htmlFor="facebook">
                                    <span className={this.props.style.checkBoxPlace}>
                                        <input type="checkbox" id="facebook" onChange={this.checkBoxHandler}/>
                                        <span></span>
                                    </span>
                                    <div className={this.props.style.fb}>
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
                                    <span className={this.props.style.checkBoxPlace}>
                                        <input type="checkbox" id="google" onChange={this.checkBoxHandler}/>
                                        <span></span>
                                    </span>
                                    <div className={this.props.style.google}>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                                 viewBox="0 0 14 14">
                                                <path fill="#FFF" fillRule="nonzero"
                                                      d="M7 6v2.4h4.1c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C10.6.7 9 0 7.1 0c-3.9 0-7 3.1-7 7s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7z"/>
                                            </svg>
                                        </span>
                                    </div>
                                </label>
                                <label htmlFor="twitter">
                                    <span className={this.props.style.checkBoxPlace}>
                                        <input type="checkbox" id="twitter" onChange={this.checkBoxHandler}/>
                                        <span></span>
                                    </span>
                                    <div className={this.props.style.tw}>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14"
                                                 viewBox="0 0 16 14">
                                                <path fill="#FFF" fillRule="nonzero"
                                                      d="M16 2c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1C9.3.5 7.8 2 7.8 3.8c0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 6.7 1.8 8 3.3 8.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 3.3 15.6 2.7 16 2z"/>
                                            </svg>
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>
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
