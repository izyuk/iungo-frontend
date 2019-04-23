import React, {Component} from 'react';
import {Redirect, Switch, Router, Route, Link} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import {userLogin, userRegister} from '../../api/API';

import {connect} from 'react-redux';

import Login from './login';
import Register from './register';

import Loader from '../../loader';

import Notification from '../additional/notification';

class Enter extends Component {
    state = {
        login: true,
        userData: null,
        auth: false,
        loader: false,
        showNotification: false,
        notificationText: '',
        notificationType: '',
        path: ''
    };

    sendData = async () => {
        if (this.state.userData !== null) {
            const {email, password} = this.state.userData;
            let query = this.state.login ? userLogin(email, password) : userRegister(email, password);
            this.setState({
                loader: true
            });
            query.then(res => {
                localStorage.setItem('email', email);
                const {status} = res;
                if (status === 200) {
                    if (this.state.login) {
                        const {headers: {authorization}} = res;
                        this.props.setToken(authorization);
                        localStorage.setItem('token', authorization);
                        this.setState({
                            auth: true,
                            loader: false,
                            showNotification: false,
                            notificationType: ''
                        });
                    } else {
                        this.setState({
                            auth: false,
                            loader: false,
                            showNotification: true,
                            notificationType: 'info',
                            notificationText: 'Please check your e-mail'
                        })
                    }


                } else {
                    this.setState({
                        auth: false,
                        loader: false,
                        showNotification: true,
                        notificationType: 'fail'
                    });
                    if (status === 401) {
                        this.setState({
                            notificationText: 'Wrong username or password'
                        })
                    } else if (status === 400) {
                        this.setState({
                            notificationText: res.data.errors[0].message
                        })
                    }
                }
            })
        }
    };

    changeOption = (e) => {
        this.setState({
            login: !this.state.login,
        });
    };

    setLoginData = (data) => {
        this.setState({email: '', password: ''});
        if(data){
            const emailMask = /[\w_.-]+@[0-9a-z_-]+\.[a-z]{2,5}/i;
            if(emailMask.test(data.email)){
                console.log(data);
                this.setState({
                    userData: data
                });
            } else {
                this.setState({
                    auth: false,
                    showNotification: true,
                    notificationType: 'fail',
                    notificationText: 'Please enter a valid email'
                });
            }
        }

    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.userData !== nextState.userData) return true;
        else if (this.state.login !== nextState.login) {
            this.setState({
                showNotification: false
            });
            return true;
        }
        else if (this.state.auth !== nextState.auth) return true;
        else if (this.state.loader !== nextState.loader) return true;
        else if (this.state.showNotification !== nextState.showNotification) return true;
        else if (this.state.notificationText !== nextState.notificationText) return true;
        else if (this.state.notificationType !== nextState.notificationType) return true;
        else if (this.state.path !== nextState.path) return true;
        else return false

    }

    componentDidMount() {
        const url_string = window.location.href;
        const url = new URL(url_string);
        const confirmed = url.searchParams.get("confirmed");
        if (confirmed === 'true') {
            this.setState({
                showNotification: true,
                notificationType: 'info',
                notificationText: 'Your account was confirmed'
            })
        } else if (confirmed === 'false') {
            this.setState({
                showNotification: true,
                notificationType: 'confirmation-fail',
                notificationText: 'Your account was not confirmed. Please try again or contact a system administrator'
            })
        }
    }

    render() {
        const {
            login,
            auth,
            loader,
            showNotification,
            notificationText,
            notificationType
        } = this.state;

        return (
            <div className="formWrap">

                {loader && <Loader/>}
                <p>{login ? 'Login' : 'Create your account now'}</p>
                {login ? <Login setLoginData={this.setLoginData}
                                notificationType={notificationType}>{this.props.children}</Login> :
                    <Register setLoginData={this.setLoginData} register={!this.state.auth}>{this.props.children}</Register>}
                {showNotification && <p className={notificationType}>{notificationText}</p>}

                <span
                    className={"login"}
                    onClick={this.sendData}>{login ? 'Login' : 'Sign up'}</span>
                {
                    login ?
                        <div className={'question'}>
                            <p className={''}>
                                <Link to={'/reset'}>Forgot your password?</Link>
                            </p>
                            <p className="">Don't have an account?&nbsp;
                                <button
                                    onClick={this.changeOption}
                                    type="button"
                                    dataurl="register">Start Now!
                                </button>

                            </p>
                        </div>
                        :
                        <p className="question">
                            <button
                            onClick={this.changeOption}
                            type="button"
                            dataurl="">Back to login
                            </button>
                        </p>

                }
                {
                    auth ?
                        <Redirect to='/captive-portals'/>
                        : false
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        token: state.token
    }),
    dispatch => ({
        setToken: (string) => {
            dispatch({type: "TOKEN", payload: string})
        }
    })
)
(Enter);
