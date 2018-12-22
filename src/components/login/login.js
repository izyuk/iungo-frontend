import React, {Component} from 'react';
import style from './login.less';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
        };
        this.fieldsHandler = this.fieldsHandler.bind(this);
    }

    fieldsHandler(e) {
        let type = e.target.getAttribute('datatype');
        if ((type === 'login' && /[\w_.-]+@[0-9a-z_-]+\.[a-z]{2,5}/i.test(e.target.value)) || (type === 'password' && (e.target.value.length >= 8 && e.target.value.length <= 32))) {
            e.target.parentNode.classList.remove(style.validationFalse);
            this.setState({
                [type]: e.target.value
            })
        }
        else {
            e.target.parentNode.classList.add(style.validationFalse);
            this.setState({
                [type]: ''
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.login !== nextState.login) {
            return true
        } else if (this.state.password !== nextState.password) {
            return true
        } else {
            return false
        }
    }

    componentDidUpdate() {
        let {login, password} = this.state;
        if (login.length>0 && password.length>0){
            this.props.getLoginData(this.state, true)
        } else {
            this.props.getLoginData(null, false)
        }
    }


    render() {
        return (
            <div className={style.inputsWrap}>
                <div className={style.email}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14">
                                <g fill="#8D98B0" fillRule="nonzero">
                                    <path d="M15 0H1C.4 0 0 .4 0 1v1.4l8 4.5 8-4.4V1c0-.6-.4-1-1-1z"/>
                                    <path
                                        d="M7.5 8.9L0 4.7V13c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V4.7L8.5 8.9c-.28.14-.72.14-1 0z"/>
                                </g>
                            </svg>
                        </span>
                    <input type="email" onBlur={this.fieldsHandler} datatype="login" placeholder="Your Email"/>
                </div>
                <div className={style.password}>
                    <span></span>
                    <input type="password" onBlur={this.fieldsHandler} datatype="password" placeholder="Your Password"/>
                </div>
            </div>
        )
    }
}

export default Login;
