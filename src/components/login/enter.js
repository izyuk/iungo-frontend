import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

import {userLogin, userRegister} from '../../api/API';

import Login from './login';
import Register from './register';

import Loader from '../../loader';
import CaptivePortalContext from "../../context/captive-portal-context";
import Notification from "../additional/notification";

class Enter extends Component {

    static contextType = CaptivePortalContext;

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
            this.context.loaderHandler(true);
            query.then(res => {
                localStorage.setItem('email', email);
                const {status} = res;
                if (status === 200) {
                    if (this.state.login) {
                        const {headers: {authorization}} = res;
                        localStorage.setItem('token', authorization);
                        this.context.setToken(authorization);
                        this.setState({
                            auth: true
                        });
                    } else {
                        this.setState({
                            auth: false
                        });
                        this.context.setNotification('Please check your e-mail', false, true);
                    }
                    this.context.loaderHandler(false);
                    setTimeout(() => {
                        this.context.setNotification('', false, false);
                    }, 3000)
                } else {
                    if (status === 401) {
                        this.context.setNotification('Wrong username or password', true, true);
                    } else if (status === 400) {
                        this.context.setNotification(res.data.errors[0].message, true, true);
                    }
                    this.context.loaderHandler(false);
                    setTimeout(() => {
                        this.context.setNotification('', false, false);
                    }, 2000)
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
        this.setState({
            userData: null
        });
        if(data){
            const emailMask = /[\w_.-]+@[0-9a-z_-]+\.[a-z]{2,5}/i;
            if(emailMask.test(data.email)){
                console.log(data);
                this.setState({
                    userData: data
                });
            } else {
                this.setState({
                    auth: false
                });
                this.context.setNotification('Please enter a valid email', true, true);
            }
        }

    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.userData !== nextState.userData) return true;
        else if (this.state.login !== nextState.login) {
            this.context.setNotification('', false, false);
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
        this.context.loaderHandler(false);
        const url_string = window.location.href;
        const url = new URL(url_string);
        const confirmed = url.searchParams.get("confirmed");
        if (confirmed === 'true') {
            this.context.setNotification('Your account was confirmed', false, true);
        } else if (confirmed === 'false') {
            this.context.setNotification('Your account was not confirmed. Please try again or contact a system administrator', true, true);
        }
    }

    render() {
        const {
            login,
            auth,
            loader,
            notificationType
        } = this.state;

        return (
            <div className="formWrap">
                <p>{login ? 'Login' : 'Create your account now'}</p>
                {login ? <Login setLoginData={this.setLoginData}
                                notificationType={notificationType}>{this.props.children}</Login> :
                    <Register setLoginData={this.setLoginData} register={!this.state.auth}>{this.props.children}</Register>}


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
                {this.context.dataToExclude.notification && <Notification/>}
                {this.context.dataToExclude.loader && <Loader/>}
            </div>
        )
    }
}

export default Enter;
