import React, {Component} from 'react';

class Login extends Component {

    state = {
        email: '',
        password: '',
        confirmedPassword: ''
    };

    email = React.createRef();
    password = React.createRef();
    confirmedPassword = React.createRef();

    fieldsHandler = (e) => {
        const type = e.target.getAttribute('datatype');
        if (type === 'password' || 'confirmedPassword') {
            this.setState({
                [type]: e.target.value.length < 8 ? '' : e.target.value
            });
        } else {
            this.setState({
                [type]: e.target.value
            });
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.email !== nextState.email) return true;
        else if (this.state.password !== nextState.password) return true;
        else if (this.props.notificationType !== nextProps.notificationType) return true;
        else if (this.props.register !== nextProps.register) return true;
        else return false
    }

    componentDidUpdate() {
        const {register} = this.props;
        let {email, password, confirmedPassword} = this.state;
        if(register){
            if (email.length > 0 && password.length >= 8 && password === confirmedPassword) {
                this.props.setLoginData(this.state)
            } else {
                this.props.setLoginData(null)
            }
        } else {
            if (email.length > 0 && password.length >= 8) {
                this.props.setLoginData(this.state)
            } else {
                this.props.setLoginData(null)
            }
        }
    }

    componentDidMount() {
        const {register} = this.props;
        let {email, password, confirmedPassword} = this.state;
        if(register){
            if (email.length > 0 && password.length >= 8 && password === confirmedPassword) {
                this.props.setLoginData(this.state)
            } else {
                this.props.setLoginData(null)
            }
        } else {
            if (email.length > 0 && password.length >= 8) {
                this.props.setLoginData(this.state)
            } else {
                this.props.setLoginData(null)
            }
        }
    }


    render() {
        const {register} = this.props;
        return (
            <div className="inputsWrap">
                <div className={this.props.notificationType === 'fail' ? 'email validationFail' : 'email'}>
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
                           ref={this.email}
                           onBlur={this.fieldsHandler}
                           placeholder="Your Email"/>
                </div>
                <div className={this.props.notificationType === 'fail' ? 'password validationFail' : 'password'}>
                    <span>
                        <svg enableBackground="new 0 0 128 128" height="16" id="Layer_1" version="1.1" viewBox="0 0 128 128" width="16"
                        ><path
                            d="M116,8c0.617,0,1.809,0.156,2.828,1.172C119.848,10.195,120,11.383,120,12s-0.152,1.805-1.172,2.828  l-4.484,4.484L112,21.656v3.313V40h-8h-8v8v8h-8h-8v8v8h-0.805h-9.781l1.941,9.586C71.781,83.703,72,85.859,72,88  c0,17.648-14.355,32-32,32S8,105.648,8,88s14.355-32,32-32c4.957,0,9.891,1.266,14.664,3.758l5.207,2.719l4.152-4.156l49.148-49.148  C114.191,8.156,115.383,8,116,8 M40,104c8.824,0,16-7.18,16-16s-7.176-16-16-16s-16,7.18-16,16S31.176,104,40,104 M116,0  c-3.07,0-6.141,1.172-8.484,3.516L58.367,52.664C52.844,49.781,46.66,48,40,48C17.91,48,0,65.906,0,88s17.91,40,40,40  s40-17.906,40-40c0-2.742-0.281-5.414-0.805-8H88V64h16V48h16V24.969l4.484-4.484c4.688-4.688,4.688-12.281,0-16.969  C122.141,1.172,119.07,0,116,0L116,0z M40,96c-4.418,0-8-3.578-8-8s3.582-8,8-8s8,3.578,8,8S44.418,96,40,96L40,96z"
                            fill="#8D98B0"/>
                        </svg>
                    </span>
                    <input type="password" datatype="password"
                           ref={this.password}
                           onBlur={this.fieldsHandler}
                           placeholder="Your Password"/>
                </div>
                {register ?
                    <div className={this.props.notificationType === 'fail' ? 'confirmPassword password validationFail' : 'confirmPassword password'}>
                        <span>
                            <svg enableBackground="new 0 0 128 128" height="16" id="Layer_1" version="1.1" viewBox="0 0 128 128" width="16"
                            ><path
                                d="M116,8c0.617,0,1.809,0.156,2.828,1.172C119.848,10.195,120,11.383,120,12s-0.152,1.805-1.172,2.828  l-4.484,4.484L112,21.656v3.313V40h-8h-8v8v8h-8h-8v8v8h-0.805h-9.781l1.941,9.586C71.781,83.703,72,85.859,72,88  c0,17.648-14.355,32-32,32S8,105.648,8,88s14.355-32,32-32c4.957,0,9.891,1.266,14.664,3.758l5.207,2.719l4.152-4.156l49.148-49.148  C114.191,8.156,115.383,8,116,8 M40,104c8.824,0,16-7.18,16-16s-7.176-16-16-16s-16,7.18-16,16S31.176,104,40,104 M116,0  c-3.07,0-6.141,1.172-8.484,3.516L58.367,52.664C52.844,49.781,46.66,48,40,48C17.91,48,0,65.906,0,88s17.91,40,40,40  s40-17.906,40-40c0-2.742-0.281-5.414-0.805-8H88V64h16V48h16V24.969l4.484-4.484c4.688-4.688,4.688-12.281,0-16.969  C122.141,1.172,119.07,0,116,0L116,0z M40,96c-4.418,0-8-3.578-8-8s3.582-8,8-8s8,3.578,8,8S44.418,96,40,96L40,96z"
                                fill="#8D98B0"/>
                            </svg>
                        </span>
                            <input type="password" datatype="confirmedPassword"
                                   ref={this.confirmedPassword}
                                   onBlur={this.fieldsHandler}
                                   placeholder="Confirm Password"/>
                    </div> : ''
                }


            </div>
        )
    }
}

export default Login;
