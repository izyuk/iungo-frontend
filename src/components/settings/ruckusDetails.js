import React, {Component} from 'react';
import SettingsForm from './settingsForm';
import Notification from '../additional/notification';
import {getRuckusSZ, updateRuckusSZ, checkRuckusStatus} from '../../api/API';
import CaptivePortalContext from "../../context/project-context";

class RuckusDetails extends Component {

    state = { 
        controllerAddress: '',
        username: '',
        password: '',
        connetionTested: false,
        connetionTestValid: false,
    };

    static contextType = CaptivePortalContext;
    token = this.context.dataToExclude.token ? this.context.dataToExclude.token : localStorage.getItem('token');

    static propTypes = {};

    static defaultProps = {};

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.controllerAddress !== nextState.controllerAddress)
            || (this.state.username !== nextState.username)
            || (this.state.password !== nextState.password)
            || (this.state.connetionTested !== nextState.connetionTested)
            || (this.state.connetionTestValid !== nextState.connetionTestValid);
    }

    fieldsHandler = (e) => {
        const currentState = this.state;
        const fieldName = e.currentTarget.getAttribute('datatype');
        const value = fieldName !== 'enable' ? e.currentTarget.value : e.currentTarget.checked;
        currentState[fieldName] = value;
        this.setState(currentState);
        this.context.profileHandler(currentState);
    };

    
    saveRuckusSZ = async () => {
        const {controllerAddress, username, password} = this.state;
        const query = updateRuckusSZ(this.token, {controllerAddress, username, password});
        await query.then(res => {
            console.log('Save Ruckus SZ', res);
        });
    };

    testConnection = async () => {
        const {controllerAddress, username, password} = this.state;
        const query = checkRuckusStatus(this.token, {controllerAddress, username, password});
        await query.then(res => {
            let connetionTested = false, connetionTestValid = false;
            console.log('check Ruckus status', res);
            if (res && res.data.hasOwnProperty('valid')) {
                connetionTested = true;
                connetionTestValid = Boolean(res.data.valid);
            }
            this.setState({ connetionTested, connetionTestValid });
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

    render() {
        const {
            controllerAddress,
            username,
            password,
            connetionTested,
            connetionTestValid
        } = this.state;
        return (
            <div className={'width-100'}>

                <div className="info profile">
                    <h3>Ruckus Smart Zone (SZ) Controller Integration</h3>
                    <p>SZ (version 5.1.1) is a tool for management of Ruckus access points and switches. Northbound API makes the captive portal work. It is used to authenticate users during the UE (user equipment) association.</p>
                </div>

                <div className="settingsDetailsWrap">
                    <SettingsForm onCorrect={this.saveRuckusSZ} onTest={this.testConnection}>
                        <label htmlFor={'controllerAddress'}>Controller address (https)</label>
                        <div>
                            <input
                                type="text"
                                datatype="controllerAddress"
                                id={'controllerAddress'}
                                placeholder={"controller address"}
                                defaultValue={controllerAddress}
                                onChange={this.fieldsHandler}
                            />
                        </div>
                        <fieldset>
                            <legend>NORTHBOUND API</legend>
                            <label htmlFor={'username'}>Username</label>
                            <div>
                                <input
                                    type="text"
                                    datatype="username"
                                    id={'username'}
                                    placeholder={"usernname"}
                                    defaultValue={username}
                                    onChange={this.fieldsHandler}
                                    autoComplete="new-password"
                                    />
                            </div>
                            <label htmlFor={'password'}>Password</label>
                            <div>
                                <input
                                    type="password"
                                    datatype="password"
                                    id={'password'}
                                    placeholder={"password"}
                                    defaultValue={password}
                                    onChange={this.fieldsHandler}
                                    autoComplete="new-password"
                                    />
                            </div>
                        </fieldset>
                        {connetionTested && <div className={`statusBlock ${connetionTestValid ? 'valid' : 'failed'}`}>
                            <p>{connetionTestValid ? 'Connetcion test succeeded!' : 'Connetcion test failed!'}</p>
                        </div>}
                    </SettingsForm>
                </div>
            </div>

        )

    }
}

export default RuckusDetails;