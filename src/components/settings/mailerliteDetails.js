import React, {Component} from 'react';
import {getMailerLite, updateMailerLite} from '../../api/API';
import CaptivePortalContext from "../../context/project-context";
import { Formik } from 'formik';
import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
    apiKey: Yup.string()
        .required('Required'),
    groupPrefix: Yup.string()
        .required('Required'),
    enable: Yup.boolean(),
});

class MailerliteDetails extends Component {

    state = {
        apiKey: '',
        groupPrefix: '',
        enable: false,
        APIErrors: null,
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
            || (this.state.submittedType !== nextState.submittedType)
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

    
    saveMailerLite = async () => {
        this.setState({ APIErrors: null });
        const {apiKey, enable, groupPrefix} = this.state;
        const query = updateMailerLite(this.token, {apiKey, enable, groupPrefix});
        await query.then(res => {
            console.log(res);
            this.getAPIErrors(res);
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
            if (this._form && this._form.setValues) {
                this._form.setValues({apiKey, enable, groupPrefix});
            }
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
        return Boolean(error) ? <p className={'errorText'}>{error}</p> : null;
    }

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
                        }) => (
                            <div className="settingsForm">
                                <label htmlFor={'toggle'}>Enable</label>
                                <span className="checkBoxPlace">
                                        <input type="checkbox" id="toggle" datatype="enable"
                                            checked={enable}
                                            onChange={(e) => this.fieldsHandler(e, handleChange)}
                                        />
                                        <span></span>
                                    </span>
                                <label htmlFor={'apiKey'}>API key</label>
                                <div className={Boolean(this.getFieldErrorText(errors, touched, 'apiKey')) ? 'errorField' : ''}>
                                    <input
                                        type="text"
                                        datatype="apiKey"
                                        id={'apiKey'}
                                        placeholder={"Key"}
                                        defaultValue={values.apiKey}
                                        onChange={(e) => this.fieldsHandler(e, handleChange)}
                                        onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                    />
                                    {this.getFieldErrorText(errors, touched, 'apiKey')}
                                </div>
                                <label htmlFor={'groupPrefix'}>Subscribers group prefix</label>
                                <div className={Boolean(this.getFieldErrorText(errors, touched, 'groupPrefix')) ? 'errorField' : ''}>
                                    <input
                                        type="text"
                                        datatype="groupPrefix"
                                        id={'groupPrefix'}
                                        placeholder={"Prefix"}
                                        defaultValue={values.groupPrefix}
                                        onChange={(e) => this.fieldsHandler(e, handleChange)}
                                        onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                    />
                                    {this.getFieldErrorText(errors, touched, 'groupPrefix')}
                                </div>

                                <div className="controlsRow">
                                    <button type='submit' onClick={isValid ? this.saveMailerLite.bind(this) : submitForm}>
                                        Save
                                    </button>
                                </div>
                            </div>

                        )}
                    />  

                </div>
            </div>

        )

    }
}

export default MailerliteDetails;
