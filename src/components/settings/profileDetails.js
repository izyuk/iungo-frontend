import React, {Component} from 'react';
import SettingsForm from './settingsForm';
import Notification from '../additional/notification';
import {getCompanyProfileInfo, setCompanyProfileInfo} from '../../api/API';
import CaptivePortalContext from "../../context/project-context";
import { Formik } from 'formik';
import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
    companyCode: Yup.string()
        .required('Required'),
    country: Yup.string()
        .required('Required'),
    zipCode: Yup.string()
        .matches(/^[0-9]{5}$/, 'Bad format'),
    city: Yup.string()
        .required('Required'),
    address: Yup.string()
        .required('Required'),
});

class ProfileDetails extends Component {

    static contextType = CaptivePortalContext;

    state = {
        name: '',
        companyCode: '',
        vatCode: '',
        country: '',
        region: '',
        city: '',
        address: '',
        zipCode: '',
        locale: '',
        APIErrors: null,
    };
    token = this.context.dataToExclude.token ? this.context.dataToExclude.token : localStorage.getItem('token');
    country = React.createRef();
    language = React.createRef();

    static propTypes = {};

    static defaultProps = {};

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.id !== nextState.id)
            || (this.state.name !== nextState.name)
            || (this.state.list !== nextState.list)
            || (this.state.address !== nextState.address)
            || (this.state.description !== nextState.description)
            || (this.state.portalsList !== nextState.portalsList)
            || (this.state.submitted !== nextState.submitted)
            || (this.state.submittedType !== nextState.submittedType)
            || (this.state.APIErrors !== nextState.APIErrors);
    }

    selectOnMountHandler = (element, value) => {
        // collection.map((item) => {
        let svg = element.current.nextSibling.children[0];
        let span = document.createElement('span');
        element.current.value = value ? value : 'Language';
        span.innerText = element.current.options[element.current.selectedIndex].value;
        element.current.nextSibling.insertBefore(span, svg);
        this.context.profileHandler(this.state);
        // });
    };

    selectHandler = (e) => {
        const currentState = this.state;
        const fieldName = e.currentTarget.getAttribute('name');
        const data = e.currentTarget.options[e.currentTarget.selectedIndex].value;
        const span = e.currentTarget.nextSibling.children[0];
        span.innerText = data;
        currentState[fieldName] = data;
        this.setState(currentState);
        this.context.profileHandler(currentState);
    };

    fieldsHandler = (e, handleChange) => {
        handleChange && handleChange(e);
        const currentState = this.state;
        const fieldName = e.currentTarget.getAttribute('datatype');
        const value = fieldName !== 'enable' ? e.currentTarget.value : e.currentTarget.checked;
        currentState[fieldName] = value;
        this.setState(currentState);
        this.context.profileHandler(currentState);
    };

    saveData = async () => {
        const profileInfo = this.context.dataToExclude.profileInfo;
        console.log(profileInfo);
        const query = setCompanyProfileInfo(this.token, profileInfo);
        await query.then(res => {
            console.log(res);
            this.getAPIErrors(res);
        })
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state);

    }

    async componentDidMount() {
        const query = getCompanyProfileInfo(this.token);
        await query.then(res => {
            console.log(res);
            const {data: {id, createdAt, updatedAt, uuid, ...rest}} = res;
            this.selectOnMountHandler(this.language, rest.locale);
            this.setState(rest);
            if (this._form && this._form.setValues) {
                this._form.setValues(rest);
            }
        });
        this.context.profileHandler(this.state);
    };

    getAPIErrors(res) {
        if (res && res.data.hasOwnProperty('errors')) {
            const APIErrors = {};
            res.data.errors.map(err => {
                APIErrors[err.field] = err.message;
            });
            this.setState({ APIErrors }, () => {
                if (this._form && this._form.submitForm) {
                    this._form.submitForm();
                }
            });
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
            name,
            companyCode,
            address,
            zipCode,
            country,
            city
        } = this.state;
        return (
            <div className={'width-100'}>
                <div className="info profile">
                    <h3>Company Profile</h3>
                    <p>Enter company details for presenting the General Data Protections Regulation (GDPR) documents to your customer.</p>
                </div>
                <div className="settingsDetailsWrap">
                    <Formik ref={el => this._form = el}
                        initialValues={{ name, companyCode, address, zipCode, country, city }}
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
                                <label htmlFor={'company-name'} className={hasErr('name') ? 'error' : ''}>
                                    Company name
                                </label>
                                {getErr('name')}
                                <div className={hasErr('name') ? 'errorField' : ''}>
                                    <input
                                        type="text"
                                        datatype="name"
                                        id={'company-name'}
                                        name='name'
                                        placeholder={"Company name"}
                                        defaultValue={values.name}
                                        onChange={(e) => this.fieldsHandler(e, handleChange)}
                                        onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                    />
                                </div>

                                <label htmlFor={'registration-number'} className={hasErr('companyCode') ? 'error' : ''}>
                                    Registration Number
                                </label>
                                {getErr('companyCode')}
                                <div className={hasErr('companyCode') ? 'errorField' : ''}>
                                    <input
                                        type="text"
                                        datatype="companyCode"
                                        id={'registration-number'}
                                        placeholder={"Registration number"}
                                        name='companyCode'
                                        defaultValue={values.companyCode}
                                        onChange={(e) => this.fieldsHandler(e, handleChange)}
                                        onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                    />
                                </div>

                                <label htmlFor={'registered-office-address'} className={hasErr('address') ? 'error' : ''}>
                                    Registered Office Address
                                </label>
                                {getErr('address')}
                                <div className={hasErr('address') ? 'errorField' : ''}>
                                    <input
                                        type="text"
                                        datatype="address"
                                        id={'registered-office-address'}
                                        placeholder={"Registered office address"}
                                        name='address'
                                        defaultValue={values.address}
                                        onChange={(e) => this.fieldsHandler(e, handleChange)}
                                        onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                    />
                                </div>

                                <label htmlFor={'zip-code'} className={hasErr('zipCode') ? 'error' : ''}>
                                    ZIP Code
                                </label>
                                {getErr('zipCode')}
                                <div className={hasErr('zipCode') ? 'errorField' : ''}>
                                    <input
                                        type="text"
                                        datatype="zipCode"
                                        id={'zip-code'}
                                        placeholder={"Zip code"}
                                        name='zipCode'
                                        defaultValue={values.zipCode}
                                        onChange={(e) => this.fieldsHandler(e, handleChange)}
                                        onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                    />
                                </div>

                                <label htmlFor={'country'} className={hasErr('country') ? 'error' : ''}>
                                    Country
                                </label>
                                {getErr('country')}
                                <div className={hasErr('country') ? 'errorField' : ''}>
                                    <input
                                        type="text"
                                        datatype="country"
                                        id={'country'}
                                        placeholder={"Country"}
                                        name='country'
                                        defaultValue={values.country}
                                        onChange={(e) => this.fieldsHandler(e, handleChange)}
                                        onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                    />
                                </div>

                                <label htmlFor={'city'} className={hasErr('city') ? 'error' : ''}>
                                    City
                                </label>
                                {getErr('city')}
                                <div className={hasErr('city') ? 'errorField' : ''}>
                                    <input
                                        type="text"
                                        datatype="city"
                                        id={'city'}
                                        placeholder={"City"}
                                        name='city'
                                        defaultValue={values.city}
                                        onChange={(e) => this.fieldsHandler(e, handleChange)}
                                        onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                    />
                                </div>

                                <div className="controlsRow">
                                    <button type='submit' onClick={isValid ? this.saveData.bind(this) : submitForm}>
                                        Save
                                    </button>
                                </div>
                            </div>

                        )}}
                    />  
                    {this.state.submitted &&
                    <Notification type={'info'}
                                  text={`Hotspot settings was ${this.state.submittedType} successfully`}/>}
                </div>

                <div className="info profile">
                    <h3>Language Settings</h3>
                    <p>Select the default language for presenting terms and conditions documents to your customer.</p>
                </div>
                <div className="settingsDetailsWrap">
                    <SettingsForm onCorrect={this.saveData}>
                        <label htmlFor={'country'}>Language</label>
                        <div className={'profileDetails'}>
                            <select name="locale" ref={this.language} onChange={this.selectHandler}>
                                <option value="LT">Lithuanian</option>
                                <option value="EN">English</option>
                            </select>
                            <p className="select">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                                    <path fill="#ffffff" fillRule="nonzero"
                                          d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                </svg>
                            </p>
                        </div>
                    </SettingsForm>
                </div>

            </div>

        )

    }
}

export default ProfileDetails;
