import React, {Component} from 'react';
import style from './login.less';

import Login from './login';

class Register extends Component{
    render(){
        return(
            <div className={style.fieldsWrap}>
                <div className={style.socialsWrap}>
                    <div className={style.fb}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <path fill="#FFF" fillRule="nonzero" d="M15.3 0H.7C.3 0 0 .3 0 .7v14.7c0 .3.3.6.7.6H8v-5H6V8h2V6c0-2.1 1.2-3 3-3h2v3h-1c-.6 0-1 .4-1 1v1h2.6l-.6 3h-2v5h4.3c.4 0 .7-.3.7-.7V.7c0-.4-.3-.7-.7-.7z"/>
                            </svg>
                        </span>
                        <input type="button" value="Continue with Facebook"/></div>
                    <div className={style.google}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                <path fill="#FFF" fillRule="nonzero" d="M7 6v2.4h4.1c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C10.6.7 9 0 7.1 0c-3.9 0-7 3.1-7 7s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7z"/>
                            </svg>
                        </span>
                        <input type="button" value="Continue with Google"/></div>
                </div>
                <Login getLoginData={this.props.getLoginData}/>
            </div>
        )
    }
}

export default Register;
