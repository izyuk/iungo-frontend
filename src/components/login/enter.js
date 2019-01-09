import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import { userLogin, userRegister } from '../../api/API';

import {connect} from 'react-redux';

import Login from './login';
import Register from './register';

class Enter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            userData: {
                login: '',
                password: ''
            },
            isValid: false,
            auth: false
        };
        this.changeOption = this.changeOption.bind(this);
        this.sendData = this.sendData.bind(this);
        this.setLoginData = this.setLoginData.bind(this);
    }

    // dmitriy.izyuk@gmail.com
    // Izyuk8968

    async sendData(){
        let query = this.state.login ? userLogin(this.state.userData.login, this.state.userData.password) : userRegister(this.state.userData.login, this.state.userData.password);
        await query.then(res => {
            if(this.state.login) {
                console.log(res);
                let {headers: {authorization}, status} = res;
                this.props.setToken(authorization);
                localStorage.setItem('token', authorization);
                console.log(status);
                if(status === 200){
                    this.setState({
                        auth: true
                    })
                }
            }
        });
    }

    changeOption(){
        this.setState({
            login: !this.state.login
        });
    }

    setLoginData(data, status){
        this.setState({
            userData: data
        });
        this.setState({
            isValid: status
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.userData !== nextState.userData) {
            return true
        } else if (this.state.isValid !== nextState.isValid) {
            return true
        } else if (this.state.login !== nextState.login) {
            return true
        } else if (this.state.auth !== nextState.auth) {
            return true
        } else {
            return false
        }
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        return (
            <div className="formWrap">
                <p>Welcome to IUNGO Network </p>
                {this.state.login ? <Login getLoginData={this.setLoginData}/> : <Register getLoginData={this.setLoginData}/>}

                    <span disabled={!this.state.isValid}
                            className={!this.state.isValid ? "login disabled" : "login"}
                            onClick={this.sendData}>{this.state.login ? 'Login' : 'Register'}</span>
                {
                    this.state.login ?
                        <p className="question">Not a member?&nbsp;
                            <button
                            onClick={this.changeOption}
                            type="button">Sign up now</button>
                        </p> :
                        <p className="question"> Have account?&nbsp;
                            <button
                            onClick={this.changeOption}
                            type="button">Log in</button>
                        </p>

                }
                {
                    this.state.auth ?
                        <Redirect to='/dashboard'/>
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
    dispatch=>({
        setToken:(string) => {
            dispatch({type: "TOKEN", payload: string})
        }
    })
)
(Enter);
