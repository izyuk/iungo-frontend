import React, {Component} from 'react';
import style from './login.less';

import {Link} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={style.formWrap}>
                <p>Welcome to IUNGO Network </p>

                <div className={style.inputsWrap}>
                    <div className={style.email}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14">
                                <g fill="#8D98B0" fillRule="nonzero">
                                    <path d="M15 0H1C.4 0 0 .4 0 1v1.4l8 4.5 8-4.4V1c0-.6-.4-1-1-1z"/>
                                    <path d="M7.5 8.9L0 4.7V13c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V4.7L8.5 8.9c-.28.14-.72.14-1 0z"/>
                                </g>
                            </svg>
                        </span>
                        <input type="email" placeholder="Your Email"/>
                    </div>
                    <div className={style.password}>
                        <span></span>
                        <input type="password" placeholder="Your Password"/>
                    </div>
                </div>
                <Link className={style.login} to="/dashboard">Login</Link>
            </div>
        )
    }
}

export default Login;
