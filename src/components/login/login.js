import React, {Component} from 'react';
import CaptivePortalContext from "~/context/project-context";
import {withRouter} from 'react-router-dom';
import Icons from '~/static/images/icons';

import {userLogin, userRegister} from '~/api/API';

import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Required')
        .email('Bad format'),
    password: Yup.string()
        .required('Required')
});
const RegisterValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Required')
        .email('Bad format'),
    password: Yup.string()
        .required('Required')
        .min(8, 'Password length must be between 8 and 30 characters')
        .max(30, 'Password length must be between 8 and 30 characters'),
    confirmedPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const NOTIFICATION_TIMEOUT = 3000;

class Login extends Component {

    static contextType = CaptivePortalContext;

    state = {
        username: '',
        password: '',
        confirmedPassword: '',
        APIErrors: null,
    };

    componentWillReceiveProps(nextProps){
        if (nextProps.register !== this.props.register) {
            this.setState({ APIErrors: null });
        }
    }

    fieldsHandler = (e, handleChange) => {
        handleChange && handleChange(e);
        const type = e.target.getAttribute('name');
        this.setState({ [type]: e.target.value, APIErrors: null });
    };
    
    sendData = async () => {
        this.setState({ APIErrors: null });
        const {username, password} = this.state;
        let query = !this.props.register ? userLogin(username, password) : userRegister(username, password);
        this.context.loaderHandler(true);
        query.then(res => {
            localStorage.setItem('email', username);
            const {status} = res;
            if (res && res.data && res.data.errors && res.data.errors.length) {
                this.parseAndSetAPIErrors(res.data.errors);
                this.context.loaderHandler(false);
            } else if (status === 200) {
                if (!this.props.register) {
                    const {headers: {authorization}} = res;
                    localStorage.setItem('token', authorization);
                    this.context.setToken(authorization);
                    this.props.history && this.props.history.push('/captive-portals');
                } else {
                    this.context.setNotification('Please check your e-mail', false, true);
                }
                this.context.loaderHandler(false);
                setTimeout(() => {
                    this.context.setNotification('', false, false);
                }, NOTIFICATION_TIMEOUT)
            } else {
                if (status === 401) {
                    this.context.setNotification('Wrong username or password', true, true);
                } else if (status === 400) {
                    this.context.setNotification(res.data.errors[0].message, true, true);
                }
                this.context.loaderHandler(false);
                setTimeout(() => {
                    this.context.setNotification('', false, false);
                }, NOTIFICATION_TIMEOUT)
            }
        })
    };

    parseAndSetAPIErrors(errors) {
        const APIErrors = {};
        errors.map(err => {
            APIErrors[err.field] = err.message;
        });
        this.setState({ APIErrors }, () => {
            if (this._form && this._form.submitForm) {
                this._form.submitForm();
            }
        });
    }
    getFieldErrorText(errors, touched, fieldName) {
        let error;
        if (touched[fieldName]) {
            const { APIErrors } = this.state;
            if (errors && errors[fieldName]) {
                error = errors[fieldName];
            } else if (APIErrors && APIErrors[fieldName]) {
                error = APIErrors[fieldName];
            }
        }
        return Boolean(error) ? <p className={'authErrorText'}>* {error}</p> : null;
    }


    render() {
        const { register } = this.props;
        const { username, password, confirmedPassword } = this.state;
        return (
            <Formik ref={el => this._form = el}
                initialValues={{ username, password, confirmedPassword }}
                validationSchema={register ? RegisterValidationSchema : LoginValidationSchema}
                validateOnChange={true}
                onSubmit={() => {}}
                render={({ errors, touched, handleChange, submitForm, isValid }) => {
                    const getErr = fieldName => this.getFieldErrorText(errors, touched, fieldName);
                    const hasErr = fieldName => Boolean( getErr(fieldName) );
                    return (
                    <div className="inputsWrap loginForm">
                        <div className={hasErr('username') ? 'email validationFail' : 'email'}>
                                <span>
                                    <Icons.EmailIcon />
                                </span>
                            <input type="email" datatype="email"
                                name='username'
                                onChange={(e) => this.fieldsHandler(e, handleChange)}
                                onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                placeholder="Your Email"
                                value={username}
                            />
                        </div>
                        {getErr('username')}
                        <div className={hasErr('password') ? 'password validationFail' : 'password'}>
                            <span>
                                <Icons.KeyIcon />
                            </span>
                            <input type="password" datatype="password"
                                name='password'
                                onChange={(e) => this.fieldsHandler(e, handleChange)}
                                onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                placeholder="Your Password"
                                value={password}
                            />
                        </div>
                        {getErr('password')}
                        {register ?
                            <div className={hasErr('confirmedPassword') ? 'confirmPassword password validationFail' : 'confirmPassword password'}>
                                <span>
                                    <Icons.KeyIcon />
                                </span>
                                    <input type="password" datatype="confirmedPassword"
                                        name='confirmedPassword'
                                        onChange={(e) => this.fieldsHandler(e, handleChange)}
                                        onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                        placeholder="Confirm Password"
                                        value={confirmedPassword}
                                    />
                            </div> : ''
                        }
                        {register && getErr('confirmedPassword')}

                        <span className='login' onClick={isValid ? this.sendData.bind(this) : submitForm}>
                            {!register ? 'Login' : 'Sign up'}
                        </span>

                    </div>
                )}}
            />  
        )
    }
}
const withRouterWorkaround = (Inner) => {
    const Wrapped = (props) => <Inner {...props}/>;
    Wrapped.displayName = `WithRouterWorkaround(${Inner.displayName || Inner.name || '?'})`;
    return withRouter(Wrapped);
}
export default withRouterWorkaround(Login);
