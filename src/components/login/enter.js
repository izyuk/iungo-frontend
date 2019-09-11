import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Login from './login';
import Loader from '~/loader';
import Notification from "~/components//additional/notification";

import CaptivePortalContext from "~/context/project-context";

class Enter extends Component {

    static contextType = CaptivePortalContext;

    componentDidMount() {
        this.context.loaderHandler(false);
        const url_string = window.location.href;
        const url = new URL(url_string);
        const confirmed = url.searchParams.get("confirmed");
        if (confirmed === 'true') {
            this.context.setNotification('Your account was confirmed', false, true);
        } else if (confirmed === 'false') {
            this.context.setNotification('Your account was not confirmed. Please try again or contact a system administrator', true, true);
        }
    }

    render() {
        const login = this.props.location && this.props.location.pathname === '/login';

        return (
            <div className="formWrap">
                <p>
                    {login ? 'Login' : 'Create your account now'}
                </p>
                <Login register={!login} >
                    {this.props.children}
                </Login>
                {
                    login ?
                        <div className='question'>
                            <p>
                                <Link to={'/reset'}>Forgot your password?</Link>
                            </p>
                            <p>Don't have an account?&nbsp;
                                <Link to={'/register'}>Start Now!</Link>
                            </p>
                        </div>
                        :
                        <p className="question">
                            <Link to={'/login'}>Back to login</Link>
                        </p>

                }
                {this.context.dataToExclude.notification && <Notification/>}
                {this.context.dataToExclude.loader && <Loader/>}
            </div>
        )
    }
}

export default Enter;
