import React, {Component} from 'react';
import style from './login.less';

import {Link} from 'react-router-dom';

import Login from './login';
import Register from './register';

class Enter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true
        };
        this.changeOption = this.changeOption.bind(this);
    }

    changeOption(){
        this.setState({
            login: !this.state.login
        })
    }

    render() {
        return (
            <div className={style.formWrap}>
                <p>Welcome to IUNGO Network </p>
                {this.state.login ? <Login/> : <Register/>}
                {this.state.login ? <Link className={style.login} to="/dashboard">Login</Link>: ''}
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
