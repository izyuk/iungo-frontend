import React, {Component} from 'react';
import {restorePasswordSendConfirmedPassword, restorePasswordSendUsername} from "../../api/API";
import Notification from "../additional/notification";
import CaptivePortalContext from "../../context/project-context";
import {Link} from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

const RestoreValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Required')
        .email('Bad format'),
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
                [field]: e.target.value
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
                        } else {
                            // this.context.setNotification('Your password was changed successfully', false, true);
                            setTimeout(() => {
                                this.context.setNotification('', false, false);
                                location.href = '/';
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
        const { username, toPasswordFields, emailSent} = this.state;
        return (
            <Formik ref={el => this._form = el}
                initialValues={{ username }}
                validationSchema={RestoreValidationSchema}
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
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14"
                                                    viewBox="0 0 16 14">
                                                    <g fill="#8D98B0" fillRule="nonzero">
                                                        <path d="M15 0H1C.4 0 0 .4 0 1v1.4l8 4.5 8-4.4V1c0-.6-.4-1-1-1z"/>
                                                        <path
                                                            d="M7.5 8.9L0 4.7V13c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V4.7L8.5 8.9c-.28.14-.72.14-1 0z"/>
                                                    </g>
                                                </svg>
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
                                    <div className={this.state.failed ? 'password validationFail' : 'password'}>
                                        <span>
                                            <svg enableBackground="new 0 0 128 128" height="16" id="Layer_1" version="1.1"
                                                viewBox="0 0 128 128" width="16"
                                            ><path
                                                d="M116,8c0.617,0,1.809,0.156,2.828,1.172C119.848,10.195,120,11.383,120,12s-0.152,1.805-1.172,2.828  l-4.484,4.484L112,21.656v3.313V40h-8h-8v8v8h-8h-8v8v8h-0.805h-9.781l1.941,9.586C71.781,83.703,72,85.859,72,88  c0,17.648-14.355,32-32,32S8,105.648,8,88s14.355-32,32-32c4.957,0,9.891,1.266,14.664,3.758l5.207,2.719l4.152-4.156l49.148-49.148  C114.191,8.156,115.383,8,116,8 M40,104c8.824,0,16-7.18,16-16s-7.176-16-16-16s-16,7.18-16,16S31.176,104,40,104 M116,0  c-3.07,0-6.141,1.172-8.484,3.516L58.367,52.664C52.844,49.781,46.66,48,40,48C17.91,48,0,65.906,0,88s17.91,40,40,40  s40-17.906,40-40c0-2.742-0.281-5.414-0.805-8H88V64h16V48h16V24.969l4.484-4.484c4.688-4.688,4.688-12.281,0-16.969  C122.141,1.172,119.07,0,116,0L116,0z M40,96c-4.418,0-8-3.578-8-8s3.582-8,8-8s8,3.578,8,8S44.418,96,40,96L40,96z"
                                                fill="#8D98B0"/>
                                            </svg>
                                        </span>
                                        <input type="password"
                                            datatype={'password'}
                                            onBlur={this.fieldsHandler}
                                            placeholder="New password"/>
                                    </div>
                                    <div
                                        className={this.state.failed ? 'password confirmField validationFail' : 'password confirmField'}>
                                        <span>
                                            <svg enableBackground="new 0 0 128 128" height="16" id="Layer_1" version="1.1"
                                                viewBox="0 0 128 128" width="16"
                                            ><path
                                                d="M116,8c0.617,0,1.809,0.156,2.828,1.172C119.848,10.195,120,11.383,120,12s-0.152,1.805-1.172,2.828  l-4.484,4.484L112,21.656v3.313V40h-8h-8v8v8h-8h-8v8v8h-0.805h-9.781l1.941,9.586C71.781,83.703,72,85.859,72,88  c0,17.648-14.355,32-32,32S8,105.648,8,88s14.355-32,32-32c4.957,0,9.891,1.266,14.664,3.758l5.207,2.719l4.152-4.156l49.148-49.148  C114.191,8.156,115.383,8,116,8 M40,104c8.824,0,16-7.18,16-16s-7.176-16-16-16s-16,7.18-16,16S31.176,104,40,104 M116,0  c-3.07,0-6.141,1.172-8.484,3.516L58.367,52.664C52.844,49.781,46.66,48,40,48C17.91,48,0,65.906,0,88s17.91,40,40,40  s40-17.906,40-40c0-2.742-0.281-5.414-0.805-8H88V64h16V48h16V24.969l4.484-4.484c4.688-4.688,4.688-12.281,0-16.969  C122.141,1.172,119.07,0,116,0L116,0z M40,96c-4.418,0-8-3.578-8-8s3.582-8,8-8s8,3.578,8,8S44.418,96,40,96L40,96z"
                                                fill="#8D98B0"/>
                                            </svg>
                                        </span>
                                        <input type="password"
                                            datatype={'confirmedPassword'}
                                            onBlur={this.fieldsHandler}
                                            placeholder="Repeat new password"/>
                                    </div>
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

export default Restore;
