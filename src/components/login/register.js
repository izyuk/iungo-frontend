import React, {Component} from 'react';
import Login from './login';

class Register extends Component{
    render(){
        return(
            <div className="fieldsWrap">
                <Login setLoginData={this.props.setLoginData} register={this.props.register}/>
            </div>
        )
    }
}

export default Register;
