import React, {Component} from 'react';

class Login extends Component {

    state = {
        email: '',
        password: '',
    };

    email = React.createRef();
    password = React.createRef();

    fieldsHandler = (e) => {
        let type = e.target.getAttribute('type');
        this.setState({
            [type]: e.target.value
        });
        // const {email, password} = this.state;
        // const expEmail = /[\w_.-]+@[0-9a-z_-]+\.[a-z]{2,5}/i.test(email);
        // const expPassword = (password.length >= 8 && password.length <= 32);
        // if (expEmail || expPassword) {
        //     this.setState({
        //         [type]: e.target.value
        //     });
        // }
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.email !== nextState.email) {
            return true
        } else if (this.state.password !== nextState.password) {
            return true
        } else if (this.props.showNotification !== nextProps.showNotification) {
            return true
        } else {
            return false
        }
    }

    componentDidUpdate() {
        let {email, password} = this.state;
        if (email.length > 0 && password.length > 0) {
            this.props.setLoginData(this.state)
        } else {
            this.props.setLoginData(null)
        }
    }

    componentDidMount() {
        this.setState({
            email: this.email.current.value,
            password: this.password.current.value
        });
        let {email, password} = this.state;
        if (email.length > 0 && password.length > 0) {
            this.props.setLoginData(this.state)
        } else {
            this.props.setLoginData(null)
        }
    }


    render() {
        return (
            <div className="inputsWrap">
                <div className={this.props.showNotification ? 'email validationFail' : 'email'}>
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
                <div className={this.props.showNotification ? 'password validationFail' : 'password'}>
                    <span></span>
                    <input type="password"
                           ref={this.password}
                           onBlur={this.fieldsHandler}
                           placeholder="Your Password"/>
                </div>

            </div>
        )
    }
}

export default Login;
