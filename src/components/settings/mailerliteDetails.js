import React, {Component} from 'react';
import {getMailerLite, updateMailerLite, checkMailerLite} from '~/api/API';
import CaptivePortalContext from "~/context/project-context";
import Loader from "~/loader";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icons from '~/static/images/icons';

const ValidationSchema = Yup.object().shape({
    apiKey: Yup.string()
        .required('Required'),
    groupPrefix: Yup.string()
        .required('Required')
});

class MailerliteDetails extends Component {

    state = {
        apiKey: '',
        groupPrefix: '',
        enable: 'No',
        credentialsTested: false,
        credentialsTestValid: false,
        APIErrors: null,
    };
    enableSelect = React.createRef();

    static contextType = CaptivePortalContext;
    token = this.context.dataToExclude.token ? this.context.dataToExclude.token : localStorage.getItem('token');

    static propTypes = {};

    static defaultProps = {};

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.id !== nextState.id)
            || (this.state.apiKey !== nextState.apiKey)
            || (this.state.groupPrefix !== nextState.groupPrefix)
            || (this.state.enable !== nextState.enable)
            || (this.state.submittedType !== nextState.submittedType)
            || (this.state.credentialsTested !== nextState.credentialsTested)
            || (this.state.credentialsTestValid !== nextState.credentialsTestValid)
            || (this.state.APIErrors !== nextState.APIErrors);
    }

    fieldsHandler = (e, handleChange) => {
        handleChange && handleChange(e);
        const currentState = this.state;
        const fieldName = e.currentTarget.getAttribute('datatype');
        const value = fieldName !== 'enable' ? e.currentTarget.value : e.currentTarget.checked;
        currentState[fieldName] = value;
        this.setState(currentState);
        this.context.profileHandler(currentState);
    };


    selectOnMountHandler = (element, value) => {
        let svg = element.current.nextSibling.children[0];
        let span = document.createElement('span');
        element.current.value = value;
        let data = element.current.options[element.current.selectedIndex] && element.current.options[element.current.selectedIndex].value || 'No';
        span.innerText = data;
        element.current.nextSibling.insertBefore(span, svg);
        this.context.profileHandler(this.state);
    };
    selectHandler = (e) => {
        const currentState = this.state;
        const fieldName = e.currentTarget.getAttribute('name');
        const data = e.currentTarget.options[e.currentTarget.selectedIndex] && e.currentTarget.options[e.currentTarget.selectedIndex].value || 'No';
        const span = e.currentTarget.nextSibling.children[0];
        span.innerText = data;
        currentState[fieldName] = data;
        this.setState(currentState);
        this.context.profileHandler(currentState);
    };

    
    saveMailerLite = async () => {
        this.context.loaderHandler(true);
        this.setState({ credentialsTested: false, APIErrors: null });
        const {apiKey, enable, groupPrefix} = this.state;
        const query = updateMailerLite(this.token, {apiKey, enable: Boolean(enable === 'Yes'), groupPrefix});
        await query.then(res => {
            console.log(res);
            this.getAPIErrors(res);
            this.context.loaderHandler(false);
        });
    };

    testMailerLite = async () => {
        this.context.loaderHandler(true);
        this.setState({ credentialsTested: false, APIErrors: null });
        const {apiKey, enable, groupPrefix} = this.state;
        const query = checkMailerLite(this.token, {apiKey, enable: Boolean(enable === 'Yes'), groupPrefix});
        await query.then(res => {
            let credentialsTested = false, credentialsTestValid = false;
            this.getAPIErrors(res);
            if (res && res.data.hasOwnProperty('valid')) {
                credentialsTested = true;
                credentialsTestValid = Boolean(res.data.valid);
            }
            this.setState({ credentialsTested, credentialsTestValid });
            this.context.loaderHandler(false);
        });
    };

    getMailerLite = async () => {
        this.context.loaderHandler(true);
        const query = getMailerLite(this.token);
        const currentState = this.state;
        await query.then(res => {
            console.log(res);
            const {data: {apiKey, enable, groupPrefix}} = res;
            currentState.apiKey = apiKey;
            currentState.enable = enable ? 'Yes' : 'No';
            currentState.groupPrefix = groupPrefix;
            this.selectOnMountHandler(this.enableSelect, enable ? 'Yes' : 'No');
            if (this._form && this._form.setValues) {
                this._form.setValues({apiKey, enable: enable ? 'Yes' : 'No', groupPrefix});
            }
            this.context.loaderHandler(false);
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
            apiKey,
            groupPrefix,
            enable,
            credentialsTested,
            credentialsTestValid
        } = this.state;
        return (
            <div className={'width-100'}>

                <div className="info profile">
                    <h3>MailerLite Integration</h3>
                    <p>MailerLite.com is a email marketing solution for smart small business. Enable integration if you want to push your emails to MailerLite.</p>
                </div>

                <div className="settingsDetailsWrap" data-cy="mailerliteIntegrationForm">
                    <Formik ref={el => this._form = el}
                        initialValues={{ apiKey, groupPrefix, enable }}
                        validationSchema={ValidationSchema}
                        validateOnChange={true}
                        render={({
                            values,
                            errors,
                            touched,
                            handleChange,
                            submitForm,
                            isValid
                        }) => {
                            const getErr = fieldName => this.getFieldErrorText(errors, touched, fieldName);
                            const hasErr = fieldName => Boolean( getErr(fieldName) );
                            return (
                            <div className="settingsForm">
                                <label htmlFor={'enable'} className={(values.enable === 'Yes' && hasErr('apiKey')) ? 'error' : ''}>
                                    Integration enabled
                                </label>
                                {(values.enable === 'Yes' && hasErr('apiKey')) && <p className={'errorText'}>* Please enter API key to enable integration</p>}
                                <div className={'profileDetails'}>
                                    <select id={'enable'} name="enable"
                                        ref={this.enableSelect}
                                        value={values.enable}
                                        data-cy="mailerliteIntegrationSelect"
                                        onChange={(e) => { handleChange(e); this.selectHandler(e); }}
                                    >
                                        <option value='Yes' data-cy="mailerliteIntegrationSelectOption">Yes</option>
                                        <option value='No' data-cy="mailerliteIntegrationSelectOption">No</option>
                                    </select>
                                    <p className="select">
                                        <Icons.DropdownIcon fill="#FFF"/>
                                    </p>
                                </div>

                                <label htmlFor={'apiKey'} className={hasErr('apiKey') ? 'error' : ''}>
                                    API key
                                </label>
                                {getErr('apiKey')}
                                <div className={hasErr('apiKey') ? 'errorField' : ''}>
                                    <input
                                        type="text"
                                        datatype="apiKey"
                                        id={'apiKey'}
                                        placeholder={"Key"}
                                        data-cy="mailerliteIntegrationApiKey"
                                        defaultValue={values.apiKey}
                                        onChange={(e) => this.fieldsHandler(e, handleChange)}
                                        onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                    />
                                </div>

                                <label htmlFor={'groupPrefix'} className={hasErr('groupPrefix') ? 'error' : ''}>
                                    Subscribers group prefix
                                </label>
                                {getErr('groupPrefix')}
                                <div className={hasErr('groupPrefix') ? 'errorField' : ''}>
                                    <input
                                        type="text"
                                        datatype="groupPrefix"
                                        id={'groupPrefix'}
                                        placeholder={"Prefix"}
                                        data-cy="mailerliteIntegrationGroupPrefix"
                                        defaultValue={values.groupPrefix}
                                        onChange={(e) => this.fieldsHandler(e, handleChange)}
                                        onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                    />
                                </div>
                                
                                <div className={'statusBlockWrap'}>
                                    {credentialsTested && <div className={`statusBlock ${credentialsTestValid ? 'valid' : 'failed'}`}>
                                        <p>Credentials {credentialsTestValid ? 'test succeeded!' : 'test failed!'}</p>
                                    </div>}
                                </div>

                                <div className="controlsRow">
                                    <button type='submit'
                                            data-cy="mailerliteIntegrationTest"
                                            className="testBtn"
                                            onClick={isValid ? this.testMailerLite.bind(this) : submitForm}>
                                        Test
                                    </button>
                                    <button type='submit'
                                            data-cy="mailerliteIntegrationSave"
                                            onClick={isValid ? this.saveMailerLite.bind(this) : submitForm} >
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

export default MailerliteDetails;
