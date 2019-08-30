import React, {Component} from 'react';
import CaptivePortalContext from "../../context/project-context";
import {withRouter} from 'react-router-dom';

import {userLogin, userRegister} from '../../api/API';

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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14">
                                        <g fill="#8D98B0" fillRule="nonzero">
                                            <path d="M15 0H1C.4 0 0 .4 0 1v1.4l8 4.5 8-4.4V1c0-.6-.4-1-1-1z"/>
                                            <path
                                                d="M7.5 8.9L0 4.7V13c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V4.7L8.5 8.9c-.28.14-.72.14-1 0z"/>
                                        </g>
                                    </svg>
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
                                <svg enableBackground="new 0 0 128 128" height="16" id="Layer_1" version="1.1" viewBox="0 0 128 128" width="16"
                                ><path
                                    d="M116,8c0.617,0,1.809,0.156,2.828,1.172C119.848,10.195,120,11.383,120,12s-0.152,1.805-1.172,2.828  l-4.484,4.484L112,21.656v3.313V40h-8h-8v8v8h-8h-8v8v8h-0.805h-9.781l1.941,9.586C71.781,83.703,72,85.859,72,88  c0,17.648-14.355,32-32,32S8,105.648,8,88s14.355-32,32-32c4.957,0,9.891,1.266,14.664,3.758l5.207,2.719l4.152-4.156l49.148-49.148  C114.191,8.156,115.383,8,116,8 M40,104c8.824,0,16-7.18,16-16s-7.176-16-16-16s-16,7.18-16,16S31.176,104,40,104 M116,0  c-3.07,0-6.141,1.172-8.484,3.516L58.367,52.664C52.844,49.781,46.66,48,40,48C17.91,48,0,65.906,0,88s17.91,40,40,40  s40-17.906,40-40c0-2.742-0.281-5.414-0.805-8H88V64h16V48h16V24.969l4.484-4.484c4.688-4.688,4.688-12.281,0-16.969  C122.141,1.172,119.07,0,116,0L116,0z M40,96c-4.418,0-8-3.578-8-8s3.582-8,8-8s8,3.578,8,8S44.418,96,40,96L40,96z"
                                    fill="#8D98B0"/>
                                </svg>
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
                                    <svg enableBackground="new 0 0 128 128" height="16" id="Layer_1" version="1.1" viewBox="0 0 128 128" width="16"
                                    ><path
                                        d="M116,8c0.617,0,1.809,0.156,2.828,1.172C119.848,10.195,120,11.383,120,12s-0.152,1.805-1.172,2.828  l-4.484,4.484L112,21.656v3.313V40h-8h-8v8v8h-8h-8v8v8h-0.805h-9.781l1.941,9.586C71.781,83.703,72,85.859,72,88  c0,17.648-14.355,32-32,32S8,105.648,8,88s14.355-32,32-32c4.957,0,9.891,1.266,14.664,3.758l5.207,2.719l4.152-4.156l49.148-49.148  C114.191,8.156,115.383,8,116,8 M40,104c8.824,0,16-7.18,16-16s-7.176-16-16-16s-16,7.18-16,16S31.176,104,40,104 M116,0  c-3.07,0-6.141,1.172-8.484,3.516L58.367,52.664C52.844,49.781,46.66,48,40,48C17.91,48,0,65.906,0,88s17.91,40,40,40  s40-17.906,40-40c0-2.742-0.281-5.414-0.805-8H88V64h16V48h16V24.969l4.484-4.484c4.688-4.688,4.688-12.281,0-16.969  C122.141,1.172,119.07,0,116,0L116,0z M40,96c-4.418,0-8-3.578-8-8s3.582-8,8-8s8,3.578,8,8S44.418,96,40,96L40,96z"
                                        fill="#8D98B0"/>
                                    </svg>
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
