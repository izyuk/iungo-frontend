import React, {Component} from 'react';
import {getRuckusSZ, updateRuckusSZ, checkRuckusStatus} from '../../api/API';
import CaptivePortalContext from "../../context/project-context";
import { Formik } from 'formik';
import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
    controllerAddress: Yup.string()
        .required('Required')
        .url('Not valid URL!'),
    username: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required'),
});

class RuckusDetails extends Component {

    state = {
        controllerAddress: '',
        username: '',
        password: '',
        connectionTested: false,
        connectionTestValid: false,
        APIErrors: null,
    };

    static contextType = CaptivePortalContext;
    token = this.context.dataToExclude.token ? this.context.dataToExclude.token : localStorage.getItem('token');

    static propTypes = {};

    static defaultProps = {};

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.controllerAddress !== nextState.controllerAddress)
            || (this.state.username !== nextState.username)
            || (this.state.password !== nextState.password)
            || (this.state.connectionTested !== nextState.connectionTested)
            || (this.state.connectionTestValid !== nextState.connectionTestValid)
            || (this.state.APIErrors !== nextState.APIErrors);
    }

    fieldsHandler = (e, handleChange) => {
        handleChange(e);
        const currentState = this.state;
        const fieldName = e.currentTarget.getAttribute('datatype');
        const value = fieldName !== 'enable' ? e.currentTarget.value : e.currentTarget.checked;
        currentState[fieldName] = value;
        this.setState(currentState);
        this.context.profileHandler(currentState);
    };

    
    saveRuckusSZ = async () => {
        this.setState({ connectionTested: false, APIErrors: null });
        const {controllerAddress, username, password} = this.state;
        const query = updateRuckusSZ(this.token, {controllerAddress, username, password});
        await query.then(res => {
            console.log('Save Ruckus SZ', res);
            this.getAPIErrors(res);
        });
    };

    testConnection = async () => {
        this.setState({ connectionTested: false, APIErrors: null });
        const {controllerAddress, username, password} = this.state;
        const query = checkRuckusStatus(this.token, {controllerAddress, username, password});
        await query.then(res => {
            let connectionTested = false, connectionTestValid = false;
            console.log('check Ruckus status', res);
            this.getAPIErrors(res);
            if (res && res.data.hasOwnProperty('valid')) {
                connectionTested = true;
                connectionTestValid = Boolean(res.data.valid);
            }
            this.setState({ connectionTested, connectionTestValid });
        });
    };

    getRuckusSZ = async () => {
        const query = getRuckusSZ(this.token);
        const currentState = this.state;
        await query.then(res => {
            console.log('Get Ruckus SZ', res);
            const {data: {controllerAddress, username, password}} = res;
            currentState.controllerAddress = controllerAddress;
            currentState.username = username;
            currentState.password = password;
            if (this._form && this._form.setValues) {
                this._form.setValues({controllerAddress, username, password});
            }
        });
        this.setState(currentState);
    };
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state);

    }

    async componentDidMount() {
        await this.getRuckusSZ();
        this.context.profileHandler(this.state);
    };

    getAPIErrors(res) {
        if (res && res.data.hasOwnProperty('errors')) {
            const APIErrors = {};
            res.data.errors.map(err => {
                APIErrors[err.field] = err.message;
            });
            this.setState({ APIErrors });
        } else {
            this.setState({ APIErrors: null });
        }
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
        return Boolean(error) ? <p className={'errorText'}>{error}</p> : null;
    }

    render() {
        const {
            controllerAddress,
            username,
            password,
            connectionTested,
            connectionTestValid
        } = this.state;
        return (
            <div className={'width-100'}>

                <div className="info profile">
                    <h3>Ruckus Smart Zone (SZ) Controller Integration</h3>
                    <p>SZ (version 5.1.1) is a tool for management of Ruckus access points and switches. Northbound API makes the captive portal work. It is used to authenticate users during the UE (user equipment) association.</p>
                </div>

                <div className="settingsDetailsWrap">
                    <Formik ref={el => this._form = el}
                        initialValues={{ controllerAddress, username, password }}
                        validationSchema={ValidationSchema}
                        validateOnChange={true}
                        render={({
                            values,
                            errors,
                            touched,
                            handleChange,
                            submitForm,
                            isValid,
                        }) => (
                            <div className="settingsForm">
                                <label htmlFor={'controllerAddress'}>Controller address ( http(s) )</label>
                                <div className={Boolean(this.getFieldErrorText(errors, touched, 'controllerAddress')) ? 'errorField' : ''}>
                                    <input
                                        type="text"
                                        datatype="controllerAddress"
                                        id={'controllerAddress'}
                                        placeholder={"example http://192.168.102.1:9080/portalintf"}
                                        defaultValue={values.controllerAddress}
                                        onChange={(e) => this.fieldsHandler(e, handleChange)}
                                        onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                    />
                                    {this.getFieldErrorText(errors, touched, 'controllerAddress')}
                                </div>
                                <fieldset>
                                    <legend>NORTHBOUND API</legend>
                                    <label htmlFor={'username'}>Username</label>
                                    <div className={Boolean(this.getFieldErrorText(errors, touched, 'username')) ? 'errorField' : ''}>
                                        <input
                                            type="text"
                                            datatype="username"
                                            id={'username'}
                                            placeholder={"usernname"}
                                            defaultValue={values.username}
                                            onChange={(e) => this.fieldsHandler(e, handleChange)}
                                            onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                            autoComplete="new-password"
                                        />
                                        {this.getFieldErrorText(errors, touched, 'username')}
                                    </div>
                                    <label htmlFor={'password'}>Password</label>
                                    <div className={Boolean(this.getFieldErrorText(errors, touched, 'password')) ? 'errorField' : ''}>
                                        <input
                                            type="password"
                                            datatype="password"
                                            id={'password'}
                                            placeholder={"password"}
                                            defaultValue={values.password}
                                            onChange={(e) => this.fieldsHandler(e, handleChange)}
                                            onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                            autoComplete="new-password"
                                        />
                                        {this.getFieldErrorText(errors, touched, 'password')}
                                    </div>
                                </fieldset>
                                
                                <div className={'statusBlockWrap'}>
                                    {connectionTested && <div className={`statusBlock ${connectionTestValid ? 'valid' : 'failed'}`}>
                                        <p>Connection {connectionTestValid ? 'test succeeded!' : 'test failed!'}</p>
                                    </div>}
                                </div>

                                <div className="controlsRow">
                                    <button type='submit' className="testBtn" onClick={isValid ? this.testConnection.bind(this) : submitForm}>Test</button>
                                    <button type='submit' onClick={isValid ? this.saveRuckusSZ.bind(this) : submitForm}>Save</button>
                                </div>
                            </div>

                        )}
                    />
                </div>
            </div>

        )

    }
}

export default RuckusDetails;