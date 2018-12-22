import React, {Component} from 'react';
import style from './login.less';

import {Link} from 'react-router-dom';

import { Api } from '../../api/API';

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
            isValid: false
        };
        this.changeOption = this.changeOption.bind(this);
        this.sendData = this.sendData.bind(this);
        this.setLoginData = this.setLoginData.bind(this);
    }

    async sendData(){
        let query = this.state.login ? Api.userLogin(this.state.userData.login, this.state.userData.password) : Api.userRegister(this.state.userData.login, this.state.userData.password);
        await query.then(res => {
            let {data} = res.data;
            console.log(data);
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
        } else {
            return false
        }
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        return (
            <div className={style.formWrap}>
                <p>Welcome to IUNGO Network </p>
                {this.state.login ? <Login getLoginData={this.setLoginData}/> : <Register getLoginData={this.setLoginData}/>}

                    <span disabled={!this.state.isValid}
                            className={!this.state.isValid ? [style.login, style.disabled].join(' ') : style.login}
                            onClick={this.sendData}>{this.state.login ? 'Login' : 'Register'}</span>
                {
                    this.state.login ?
                        <p className={style.question}>Not a member?&nbsp;
                            <button
                            onClick={this.changeOption}
                            type="button">Sign up now</button>
                        </p> :
                        <p className={style.question}> Have account?&nbsp;
                            <button
                            onClick={this.changeOption}
                            type="button">Log in</button>
                        </p>

                }
            </div>
        )
    }
}

export default Enter;
