import React, {Component} from 'react';
import {restorePasswordSendConfirmedPassword, restorePasswordSendUsername} from "~/api/API";
import Notification from "~/components/additional/notification";
import CaptivePortalContext from "~/context/project-context";
import {Link, withRouter} from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icons from '~/static/images/icons';

const resetEmailValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Required')
        .email('Bad format'),
});
const restorePwdsValidationSchema = Yup.object().shape({
    password: Yup.string()
        .required('Required')
        .min(8, 'Password length must be between 8 and 30 characters')
        .max(30, 'Password length must be between 8 and 30 characters'),
    confirmedPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const NOTIFICATION_TIMEOUT = 3000;

class Restore extends Component {

    static contextType = CaptivePortalContext;

    state = {
        username: '',
        toPasswordFields: false,
        password: '',
        confirmedPassword: '',
        notification: false,
        notificationText: '',
        failed: false,
        emailSent: false,
        APIErrors: null,
    };

    fieldsHandler = (e, handleChange) => {
        handleChange && handleChange(e);
        const url_string = window.location.href;
        const url = new URL(url_string);
        const token = url.searchParams.get("token");

        if (token !== null) {
            this.setState({
                toPasswordFields: true
            });
            const field = e.target.getAttribute('datatype');
            this.setState({
                [field]: e.target.value, APIErrors: null
            });
        } else {
            this.setState({ username: e.target.value, APIErrors: null })
        }

    };

    sendData = async () => {
        const url_string = window.location.href;
        const url = new URL(url_string);
        const token = url.searchParams.get("token");
        this.setState({ APIErrors: null });

        const {
            username,
            password,
            confirmedPassword
        } = this.state;

        if (token !== null) {
            if (confirmedPassword.length >= 8) {
                if (confirmedPassword === password) {
                    let query = restorePasswordSendConfirmedPassword(token, password);
                    query.then(res => {
                        console.log(res.status);
                        if (res.status === 404) {
                            this.context.setNotification('Your token is probably expired. Please try again or contact system administrator', true, true);
                        } else if (res.status === 200) {
                            this.context.setNotification('Your password was changed successfully', false, true);
                            setTimeout(() => {
                                this.context.setNotification('', false, false);
                                this.props.history && this.props.history.push('/login');
                            }, NOTIFICATION_TIMEOUT)
                        }
                    }).catch(e => {
                        this.context.setNotification(e, true, true);
                    });
                } else {
                    this.context.setNotification('Password doesn\'t match', true, true);
                    setTimeout(() => {
                        this.context.setNotification('', false, false);
                    }, NOTIFICATION_TIMEOUT)
                }
            } else {
                this.context.setNotification('Password should not be less than 8 characters', true, true);
                setTimeout(() => {
                    this.context.setNotification('', false, false);
                }, NOTIFICATION_TIMEOUT)
            }
        } else {
            if (username !== '') {
                let query = restorePasswordSendUsername(username);
                query.then(res => {
                    if (res && res.data && res.data.errors && res.data.errors.length) {
                        this.parseAndSetAPIErrors(res.data.errors);
                    } else {
                        this.setState({ emailSent: true, APIErrors: null });
                    }
                }).catch(e => {
                    this.context.setNotification(e, true, true);
                    setTimeout(() => {
                        this.context.setNotification('', false, false);
                    }, NOTIFICATION_TIMEOUT)
                });
            }
        }
    };

    componentDidMount() {
        const url_string = window.location.href;
        const url = new URL(url_string);
        const token = url.searchParams.get("token");
        console.log(token !== null);
        if (token !== null) {
            this.setState({
                toPasswordFields: true
            })
        }
    }

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
        const { username, password, confirmedPassword, toPasswordFields, emailSent} = this.state;
        return (
            <Formik ref={el => this._form = el}
                initialValues={{ username, password, confirmedPassword }}
                validationSchema={!toPasswordFields ? resetEmailValidationSchema : restorePwdsValidationSchema}
                validateOnChange={true}
                onSubmit={() => {}}
                render={({
                    errors,
                    touched,
                    handleChange,
                    submitForm,
                    isValid
                }) => {
                    const getErr = fieldName => this.getFieldErrorText(errors, touched, fieldName);
                    const hasErr = fieldName => Boolean( getErr(fieldName) );
                    return (
                    <div className="formWrap">

                        {
                            !toPasswordFields ?
                                (
                                    emailSent ?
                                        <div>
                                            <p>An email is on its way to you. Follow the instructions to reset your
                                                password.</p>
                                        </div> :
                                        <div>
                                            <p>Enter your email address to reset your password</p>
                                            <p className={'smaller'}>We will email you a link to reset password</p>
                                        </div>
                                )
                                :
                                <p>Reset Password</p>
                        }
                        {
                            !toPasswordFields ?
                                (
                                    emailSent ?
                                        '' :
                                        <div className="inputsWrap">
                                            <div className={hasErr('username') ? 'email validationFail' : 'email'}>
                                                <span>
                                                    <Icons.EmailIcon />
                                                </span>
                                                <input type="email"
                                                    name='username'
                                                    onChange={(e) => this.fieldsHandler(e, handleChange)}
                                                    onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                                    placeholder="Your Email"/>
                                            </div>
                                            {getErr('username')}
                                        </div>
                                ) :
                                <div className="inputsWrap">
                                    <div className={hasErr('password') ? 'password validationFail' : 'password'}>
                                        <span>
                                            <Icons.KeyIcon />
                                        </span>
                                        <input type="password"
                                            datatype="password"
                                            name='password'
                                            onChange={(e) => this.fieldsHandler(e, handleChange)}
                                            onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                            placeholder="New password"/>
                                    </div>
                                    {getErr('password')}
                                    <div
                                        className={hasErr('confirmedPassword') ? 'password confirmField validationFail' : 'password confirmField'}>
                                        <span>
                                            <Icons.KeyIcon />
                                        </span>
                                        <input type="password"
                                            datatype="confirmedPassword"
                                            name="confirmedPassword"
                                            onChange={(e) => this.fieldsHandler(e, handleChange)}
                                            onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                            placeholder="Repeat new password"/>
                                    </div>
                                    {getErr('confirmedPassword')}
                                </div>
                        }
                        {
                            emailSent ?
                                <p className="question">
                                    <Link
                                        to={'/'}>Back to login
                                    </Link>
                                </p>
                                :
                                <span
                                    className={"login"}
                                    onClick={isValid ? this.sendData.bind(this) : submitForm}>Reset Password</span>
                        }

                        {this.context.dataToExclude.notification && <Notification/>}
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
export default withRouterWorkaround(Restore);
