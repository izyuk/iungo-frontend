import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

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
        // isValid: false,
        auth: false,
        loader: false,
        showNotification: false,
        notificationText: '',
        notificationType: ''
    };

    fieldsHandler = (e) => {
        if (this.state.userData !== null) {
            const {email, password} = this.state.userData;
            const expEmail = /[\w_.-]+@[0-9a-z_-]+\.[a-z]{2,5}/i.test(email.value);
            const expPassword = (password.length >= 8 && password.length <= 32);
        }
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
                if(status === 200){
                    const {headers: {authorization}} = res;
                    this.props.setToken(authorization);
                    localStorage.setItem('token', authorization);
                    this.setState({
                        auth: true,
                        loader: false,
                        showNotification: false,
                        notificationType: 'info'
                    })

                } else {
                    this.setState({
                        auth: false,
                        loader: false,
                        showNotification: true,
                        notificationType: 'fail'
                    });
                    if (status === 401){
                        this.setState({
                            notificationText: 'Wrong username or password'
                        })
                    } else if (status === 400){
                        this.setState({
                            notificationText: res.data.errors[0].message
                        })
                    }
                }
            })
        }
    };

    changeOption = () => {
        this.setState({
            login: !this.state.login
        });
    };

    setLoginData = (data) => {
        this.setState({
            userData: data
        });
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
        else return false

    }

    render() {
        const {
            login,
            userData,
            auth,
            loader,
            showNotification,
            notificationText,
            notificationType
        } = this.state;

        return (
            <div className="formWrap">

                {/*{showNotification && <Notification text={text} type={'fail'}/>}*/}
                {loader && <Loader/>}
                <p>Welcome to IUNGO Network </p>
                {login ? <Login setLoginData={this.setLoginData} showNotification={showNotification}>{this.props.children}</Login> :
                    <Register setLoginData={this.setLoginData}>{this.props.children}</Register>}
                {/*{showNotification && <Notification type={'fail'} text={text} />}*/}
                {showNotification && <p className={notificationType}>{notificationText}</p>}

                <span
                    className={"login"}
                    onClick={this.sendData}>{login ? 'Login' : 'Register'}</span>
                {
                    login ?
                        <p className="question">Not a member?&nbsp;
                            <button
                                onClick={this.changeOption}
                                type="button">Sign up now
                            </button>
                        </p> :
                        <p className="question"> Have account?&nbsp;
                            <button
                                onClick={this.changeOption}
                                type="button">Log in
                            </button>
                        </p>

                }
                {
                    auth ?
                        <Redirect to='/dashboard'/>
                        : false
                }
            </div>
        )
        // }
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
