import React, {Component} from 'react';
import {getRuckusSZ, updateRuckusSZ, checkRuckusStatus} from '~/api/API';
import CaptivePortalContext from "~/context/project-context";
import Loader from "~/loader";
import { Formik } from 'formik';
import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
    controllerAddress: Yup.string()
        .required('Required')
        .url('Bad format'),
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
        this.context.loaderHandler(true);
        this.setState({ connectionTested: false, APIErrors: null });
        const {controllerAddress, username, password} = this.state;
        const query = updateRuckusSZ(this.token, {controllerAddress, username, password});
        await query.then(res => {
            console.log('Save Ruckus SZ', res);
            this.getAPIErrors(res);
            this.context.loaderHandler(false);
        });
    };

    testConnection = async () => {
        this.context.loaderHandler(true);
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
            this.context.loaderHandler(false);
            this.setState({ connectionTested, connectionTestValid });
        });
    };

    getRuckusSZ = async () => {
        this.context.loaderHandler(true);
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
            this.context.loaderHandler(false);
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
        return Boolean(error) ? <p className={'errorText'}>* {error}</p> : null;
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

                <div className="settingsDetailsWrap" data-cy="ruckusIntegrationForm">
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
                        }) => {
                            const getErr = fieldName => this.getFieldErrorText(errors, touched, fieldName);
                            const hasErr = fieldName => Boolean( getErr(fieldName) );
                            return (
                            <div className="settingsForm">
                                <label htmlFor={'controllerAddress'} className={hasErr('controllerAddress') ? 'error' : ''}>
                                    Controller address ( http(s) )
                                </label>
                                {getErr('controllerAddress')}
                                <div className={hasErr('controllerAddress') ? 'errorField' : ''}>
                                    <input
                                        type="text"
                                        datatype="controllerAddress"
                                        id={'controllerAddress'}
                                        data-cy="ruckusIntegrationControllerAddress"
                                        placeholder={"example http://192.168.102.1:9080/portalintf"}
                                        defaultValue={values.controllerAddress}
                                        onChange={(e) => this.fieldsHandler(e, handleChange)}
                                        onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                    />
                                </div>
                                <fieldset>
                                    <legend>NORTHBOUND API</legend>
                                    <label htmlFor={'username'} className={hasErr('username') ? 'error' : ''}>
                                        Username
                                    </label>
                                    {getErr('username')}
                                    <div className={hasErr('username') ? 'errorField' : ''}>
                                        <input
                                            type="text"
                                            datatype="username"
                                            id={'username'}
                                            placeholder={"usernname"}
                                            data-cy="ruckusIntegrationUsername"
                                            defaultValue={values.username}
                                            onChange={(e) => this.fieldsHandler(e, handleChange)}
                                            onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                            autoComplete="new-password"
                                        />
                                    </div>

                                    <label htmlFor={'password'} className={hasErr('password') ? 'error' : ''}>
                                        Password
                                    </label>
                                    {getErr('password')}
                                    <div className={hasErr('password') ? 'errorField' : ''}>
                                        <input
                                            type="password"
                                            datatype="password"
                                            id={'password'}
                                            placeholder={"password"}
                                            data-cy="ruckusIntegrationPassword"
                                            defaultValue={values.password}
                                            onChange={(e) => this.fieldsHandler(e, handleChange)}
                                            onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                            autoComplete="new-password"
                                        />
                                    </div>
                                </fieldset>
                                
                                <div className={'statusBlockWrap'}>
                                    {connectionTested && <div className={`statusBlock ${connectionTestValid ? 'valid' : 'failed'}`}>
                                        <p>Connection {connectionTestValid ? 'test succeeded!' : 'test failed!'}</p>
                                    </div>}
                                </div>

                                <div className="controlsRow">
                                    <button type='submit'
                                            className="testBtn"
                                            data-cy="ruckusIntegrationTest"
                                            onClick={isValid ? this.testConnection.bind(this) : submitForm}>
                                        Test
                                    </button>
                                    <button type='submit'
                                            data-cy="ruckusIntegrationSave"
                                            onClick={isValid ? this.saveRuckusSZ.bind(this) : submitForm}>
                                        Save
                                    </button>
                                </div>
                            </div>

                        )}}
                    />
                </div>
                {this.context.dataToExclude.loader && <Loader/>}
            </div>

        )

    }
}

export default RuckusDetails;