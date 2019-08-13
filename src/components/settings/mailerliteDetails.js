import React, {Component} from 'react';
import {getMailerLite, updateMailerLite} from '../../api/API';
import CaptivePortalContext from "../../context/project-context";
import { Formik } from 'formik';
import * as Yup from 'yup';

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
        this.setState({ APIErrors: null });
        const {apiKey, enable, groupPrefix} = this.state;
        const query = updateMailerLite(this.token, {apiKey, enable: Boolean(enable === 'Yes'), groupPrefix});
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
            currentState.enable = enable ? 'Yes' : 'No';
            currentState.groupPrefix = groupPrefix;
            this.selectOnMountHandler(this.enableSelect, enable ? 'Yes' : 'No');
            if (this._form && this._form.setValues) {
                this._form.setValues({apiKey, enable: enable ? 'Yes' : 'No', groupPrefix});
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
        return Boolean(error) ? <p className={'errorText'}>* {error}</p> : null;
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
                                        onChange={(e) => { handleChange(e); this.selectHandler(e); }}
                                    >
                                        <option value='Yes'>Yes</option>
                                        <option value='No'>No</option>
                                    </select>
                                    <p className="select">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                                            <path fill="#ffffff" fillRule="nonzero"
                                                d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                        </svg>
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
                                        defaultValue={values.groupPrefix}
                                        onChange={(e) => this.fieldsHandler(e, handleChange)}
                                        onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                    />
                                </div>

                                <div className="controlsRow">
                                    <button type='submit' onClick={isValid ? this.saveMailerLite.bind(this) : submitForm}>
                                        Save
                                    </button>
                                </div>
                            </div>

                        )}}
                    />  

                </div>
            </div>

        )

    }
}

export default MailerliteDetails;
