import React, {Component} from 'react';
import {restorePasswordSendUsername, restorePasswordSendConfirmedPassword} from "../../api/API";
import Notification from "../additional/notification";


class Restore extends Component {

    state = {
        email: '',
        toPasswordFields: false,
        password: '',
        confirmedPassword: '',
        notification: false,
        notificationText: '',
        failed: false,
    };

    email = React.createRef();
    password = React.createRef();
    confirmedPassword = React.createRef();

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.login !== nextState.login) return true;
        else if (this.state.toPasswordFields !== nextState.toPasswordFields) return true;
        else if (this.state.password !== nextState.password) return true;
        else if (this.state.confirmedPassword !== nextState.confirmedPassword) return true;
        else if (this.state.notification !== nextState.notification) return true;
        else if (this.state.notificationText !== nextState.notificationText) return true;
        else if (this.state.failed !== nextState.failed) return true;
        else return false;
    }

    fieldsHandler = (e) => {
        const url_string = window.location.href;
        const url = new URL(url_string);
        const token = url.searchParams.get("token");

        if ((token !== null) || (token === 'failed')) {
            this.setState({
                toPasswordFields: true
            });
            const field = e.target.getAttribute('datatype');
            this.setState({
                [field]: e.target.value
            });
        } else {
            this.setState({
                email: e.target.value
            })
        }

    };

    sendData = async () => {
        const url_string = window.location.href;
        const url = new URL(url_string);
        const token = url.searchParams.get("token");

        const {
            email,
            password,
            confirmedPassword
        } = this.state;

        if ((token !== null) || (token === 'failed')) {
            if (confirmedPassword === password) {
                let query = restorePasswordSendConfirmedPassword(token, password);
                query.then(res => {
                    console.log(res);
                    this.setState({
                        notification: true,
                        notificationText: 'Your password was changed successfully',
                        failed: false
                    });
                    setTimeout(() => {
                        this.setState({notification: false, failed: false, notificationText: ''});
                        location.href = '/';
                    }, 3000)
                }).catch(e => {
                    this.setState({
                        notification: true,
                        notificationText: e,
                        failed: true
                    })
                });
            }
        } else {
            if (email !== '') {
                let query = restorePasswordSendUsername(email);
                query.then(res => {
                    console.log(res);
                    this.setState({
                        notification: true,
                        notificationText: 'Please check your mail-box for confirmation letter',
                        failed: false
                    });
                    setTimeout(() => {
                        this.setState({notification: false, failed: false, notificationText: ''});
                        location.href = '/';
                    }, 3000)
                }).catch(e => {
                    this.setState({
                        notification: true,
                        notificationText: e,
                        failed: true
                    })
                });

            }
        }



    };

    componentDidMount() {
        const url_string = window.location.href;
        const url = new URL(url_string);
        const token = url.searchParams.get("token");
        if ((token !== null) || (token === 'failed')) {
            console.log('TOKEN EXISTS');
            this.setState({
                toPasswordFields: true
            })
        }
    }

    render() {
        const {toPasswordFields} = this.state;
        return (
            <div className="formWrap">
                <p>Restore your password</p>
                {
                    !toPasswordFields ?
                        <div className="inputsWrap">
                            <div className={'email'}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14">
                                        <g fill="#8D98B0" fillRule="nonzero">
                                            <path d="M15 0H1C.4 0 0 .4 0 1v1.4l8 4.5 8-4.4V1c0-.6-.4-1-1-1z"/>
                                            <path
                                                d="M7.5 8.9L0 4.7V13c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V4.7L8.5 8.9c-.28.14-.72.14-1 0z"/>
                                        </g>
                                    </svg>
                                </span>
                                <input type="email"
                                       ref={this.email}
                                       onBlur={this.fieldsHandler}
                                       placeholder="Your Email"/>
                            </div>
                        </div> :
                        <div className="inputsWrap">
                            <div className={'password'}>
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
                                       ref={this.password}
                                       onBlur={this.fieldsHandler}
                                       placeholder="Your Password"/>
                            </div>
                            <div className={'password confirmField'}>
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
                                       ref={this.confirmedPassword}
                                       onBlur={this.fieldsHandler}
                                       placeholder="Your Password"/>
                            </div>
                        </div>
                }
                <span
                    className={"login"}
                    onClick={this.sendData}>Restore</span>
                {this.state.notification &&
                <Notification type={this.state.failed ? 'fail' : 'info'}
                              text={this.state.notificationText}/>}
            </div>
        )
    }
}

export default Restore;
