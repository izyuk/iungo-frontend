import React, {Component} from 'react';
import ProfileForm from './profileForm';
import Notification from '../additional/notification';
import {getCompanyProfileInfo, setCompanyProfileInfo} from '../../api/API';
import CaptivePortalContext from "../../context/project-context";

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
        locale: ''
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
            || (this.state.submittedType !== nextState.submittedType);
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

    fieldsHandler = (e) => {
        const currentState = this.state;
        const fieldName = e.currentTarget.getAttribute('datatype');
        const value = e.currentTarget.value;
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
        });
        this.context.profileHandler(this.state);
    };

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
            <div className={'profileDetailsWrapContainer'}>
                <div className="profileDetailsWrap">
                    <ProfileForm onCorrect={this.saveData}>
                        <label htmlFor={'company-name'}>Company name</label>
                        <div>
                            <input
                                type="text"
                                datatype="name"
                                id={'company-name'}
                                placeholder={"Company name"}
                                defaultValue={name}
                                onChange={this.fieldsHandler}
                            />
                        </div>
                        <label htmlFor={'registration-number'}>Registration Number</label>
                        <div>
                            <input
                                type="text"
                                datatype="companyCode"
                                id={'registration-number'}
                                placeholder={"Registration number"}
                                defaultValue={companyCode}
                                onChange={this.fieldsHandler}
                            />
                        </div>
                        <label htmlFor={'registered-office-address'}>Registered Office Address</label>
                        <div>
                            <input
                                type="text"
                                datatype="address"
                                id={'registered-office-address'}
                                placeholder={"Registered office address"}
                                defaultValue={address}
                                onChange={this.fieldsHandler}
                            />
                        </div>
                        <label htmlFor={'zip-code'}>ZIP Code</label>
                        <div>
                            <input
                                type="text"
                                datatype="zipCode"
                                id={'zip-code'}
                                placeholder={"Zip code"}
                                defaultValue={zipCode}
                                onChange={this.fieldsHandler}
                            />
                        </div>
                        <label htmlFor={'country'}>Country</label>
                        <div>
                            <input
                                type="text"
                                datatype="country"
                                id={'country'}
                                placeholder={"Country"}
                                defaultValue={country}
                                onChange={this.fieldsHandler}
                            />
                        </div>
                        <label htmlFor={'city'}>City</label>
                        <div>
                            <input
                                type="text"
                                datatype="city"
                                id={'city'}
                                placeholder={"City"}
                                defaultValue={city}
                                onChange={this.fieldsHandler}
                            />
                        </div>
                    </ProfileForm>
                    {this.state.submitted &&
                    <Notification type={'info'}
                                  text={`Hotspot settings was ${this.state.submittedType} successfully`}/>}
                </div>
                <div className="info profile">
                    <h3>Language Settings</h3>
                    <p>Select the default language for presenting terms and conditions documents to your customer.</p>
                </div>
                <div className="profileDetailsWrap">
                    <ProfileForm onCorrect={this.saveData}>
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

                    </ProfileForm>
                    {this.state.submitted &&
                    <Notification type={'info'}
                                  text={`Hotspot settings was ${this.state.submittedType} successfully`}/>}
                </div>
            </div>

        )

    }
}

export default ProfileDetails;
