import React, {Component} from 'react';
import SettingsForm from './settingsForm';
import Notification from '../additional/notification';
import {getMailerLite, updateMailerLite} from '../../api/API';
import CaptivePortalContext from "../../context/project-context";

class MailerliteDetails extends Component {

    state = {
        apiKey: '',
        groupPrefix: '',
        enable: false
    };

    static contextType = CaptivePortalContext;
    token = this.context.dataToExclude.token ? this.context.dataToExclude.token : localStorage.getItem('token');

    static propTypes = {};

    static defaultProps = {};

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.id !== nextState.id)
            || (this.state.apiKey !== nextState.apiKey)
            || (this.state.groupPrefix !== nextState.groupPrefix)
            || (this.state.enable !== nextState.enable)
            || (this.state.submittedType !== nextState.submittedType);
    }

    fieldsHandler = (e) => {
        const currentState = this.state;
        const fieldName = e.currentTarget.getAttribute('datatype');
        const value = fieldName !== 'enable' ? e.currentTarget.value : e.currentTarget.checked;
        currentState[fieldName] = value;
        this.setState(currentState);
        this.context.profileHandler(currentState);
    };

    
    saveMailerLite = async () => {
        const {apiKey, enable, groupPrefix} = this.state;
        const query = updateMailerLite(this.token, {apiKey, enable, groupPrefix});
        await query.then(res => {
            console.log(res);
        });
    };

    getMailerLite = async () => {
        const query = getMailerLite(this.token);
        const currentState = this.state;
        await query.then(res => {
            console.log(res);
            const {data: {apiKey, enable, groupPrefix}} = res;
            currentState.apiKey = apiKey;
            currentState.enable = enable;
            currentState.groupPrefix = groupPrefix;
        });
        this.setState(currentState);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state);

    }

    async componentDidMount() {
        await this.getMailerLite();
        this.context.profileHandler(this.state);
    };

    render() {
        const {
            apiKey,
            groupPrefix,
            enable
        } = this.state;
        return (
            <div className={'width-100'}>

                <div className="info profile">
                    <h3>MailerLite Integration</h3>
                    <p>MailerLite.com is a email marketing solution for smart small business. Enable integration if you want to push your emails to MailerLite.</p>
                </div>

                <div className="settingsDetailsWrap">
                    <SettingsForm onCorrect={this.saveMailerLite}>
                        <label htmlFor={'toggle'}>Enable</label>
                        <span className="checkBoxPlace">
                                <input type="checkbox" id="toggle" datatype="enable"
                                       onChange={this.fieldsHandler} checked={enable}/>
                                <span></span>
                            </span>
                        <label htmlFor={'apiKey'}>API key</label>
                        <div>
                            <input
                                type="text"
                                datatype="apiKey"
                                id={'apiKey'}
                                placeholder={"Key"}
                                defaultValue={apiKey}
                                onChange={this.fieldsHandler}
                            />
                        </div>
                        <label htmlFor={'groupPrefix'}>Subscribers group prefix</label>
                        <div>
                            <input
                                type="text"
                                datatype="groupPrefix"
                                id={'groupPrefix'}
                                placeholder={"Prefix"}
                                defaultValue={groupPrefix}
                                onChange={this.fieldsHandler}
                            />
                        </div>
                    </SettingsForm>

                </div>
            </div>

        )

    }
}

export default MailerliteDetails;
