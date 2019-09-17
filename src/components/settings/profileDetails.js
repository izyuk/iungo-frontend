import React, {Component} from 'react';
import Notification from '~/components/additional/notification';
import {getCompanyProfileInfo, setCompanyProfileInfo} from '~/api/API';
import CaptivePortalContext from "~/context/project-context";
import Loader from "~/loader";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icons from '~/static/images/icons';

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
        locale: 'EN',
        APIErrors: null,
    };
    token = this.context.dataToExclude.token ? this.context.dataToExclude.token : localStorage.getItem('token');
    country = React.createRef();
    language = React.createRef();

    static propTypes = {};
    static defaultProps = {};

    selectHandler = (e) => {
        const currentState = this.state;
        const fieldName = e.currentTarget.getAttribute('name');
        const data = e.currentTarget.options[e.currentTarget.selectedIndex].value;
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
        this.context.loaderHandler(true);
        const profileInfo = this.context.dataToExclude.profileInfo;
        console.log(profileInfo);
        const query = setCompanyProfileInfo(this.token, profileInfo);
        await query.then(res => {
            console.log(res);
            this.getAPIErrors(res);
            this.context.loaderHandler(false);
        })
    };

    async componentDidMount() {
        this.context.loaderHandler(true);
        const query = getCompanyProfileInfo(this.token);
        await query.then(res => {
            console.log(res);
            if (res.status === 200) {
                const {data: {id, createdAt, updatedAt, uuid, ...rest}} = res;
                this.setState(rest);
                this.context.profileHandler(rest);
                if (this._form && this._form.setValues) {
                    this._form.setValues(rest);
                }
            } else if (res.status !== 404) {
                console.error(res);
            }
            this.context.loaderHandler(false);
        }).catch(err => {
            this.context.loaderHandler(false);
            console.error(err);
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
            city,
            locale
        } = this.state;
        return (
            <div className={'width-100'}>
                <div className="info profile">
                    <h3>Company Profile</h3>
                    <p>Enter company details for presenting the General Data Protections Regulation (GDPR) documents to your customer.</p>
                </div>
                <div className="settingsDetailsWrap" data-cy="companyProfileForm">
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
                                        data-cy="companyProfileName"
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
                                        data-cy="companyProfileCompanyCode"
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
                                        data-cy="companyProfileAddress"
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
                                        data-cy="companyProfileZipCode"
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
                                        data-cy="companyProfileCountry"
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
                                        data-cy="companyProfileCity"
                                        defaultValue={values.city}
                                        onChange={(e) => this.fieldsHandler(e, handleChange)}
                                        onBlur={(e) => this.fieldsHandler(e, handleChange)}
                                    />
                                </div>

                                <div className="controlsRow">
                                    <button type='submit' data-cy="companyProfileSave" onClick={isValid ? this.saveData.bind(this) : submitForm}>
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
                    <div className="settingsForm">
                        <label htmlFor={'country'}>Language</label>
                        <div className={'profileDetails'}>
                            <select name="locale"
                                    data-cy="profileLocaleSelect"
                                    ref={this.language}
                                    onChange={this.selectHandler}
                                    value={locale}
                            >
                                <option value="LT" data-cy="profileLocaleSelectOption">Lithuanian</option>
                                <option value="EN" data-cy="profileLocaleSelectOption">English</option>
                            </select>
                            <p className="select">
                                <span>{locale}</span>
                                <Icons.DropdownIcon fill="#FFF"/>
                            </p>
                        </div>
                        <div className="controlsRow">
                            <button onClick={this.saveData} data-cy="profileLocaleSave">Save</button>
                        </div>
                    </div>
                </div>
                {this.context.dataToExclude.loader && <Loader/>}

            </div>

        )

    }
}

export default ProfileDetails;
