import React, {Component} from 'react';
import Login from './login';

class Register extends Component{
    render(){
        return(
            <div className="fieldsWrap">
                <Login setLoginData={this.props.setLoginData}/>
            </div>
        )
    }
}

export default Register;
