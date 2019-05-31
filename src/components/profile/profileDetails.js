import React, {Component} from 'react';
import ProfileForm from './profileForm';
import Notification from '../additional/notification';
import {getCompanyProfileInfo, setCompanyProfileInfo} from '../../api/API';
import {connect} from "react-redux";
import CaptivePortalContext from "../../context/project-context";

class HotspotDetails extends Component {

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

    selectOnMountHandler = (ref, value) => {
        let svg = ref.current.nextSibling.children[0];
        let span = document.createElement('span');
        ref.current.value = value ? value : 'Language';
        span.innerText = ref.current.options[ref.current.selectedIndex].value;
        ref.current.nextSibling.insertBefore(span, svg);
    };

    selectHandler = (e) => {
        const fieldName = e.currentTarget.getAttribute('name');
        const data = e.currentTarget.options[e.currentTarget.selectedIndex].value;
        const span = e.currentTarget.nextSibling.children[0];
        span.innerText = data;
        this.setState({
            [fieldName]: data
        });
    };

    fieldsHandler = (e) => {
        const fieldName = e.currentTarget.getAttribute('datatype');
        console.log(fieldName);
        const value = e.currentTarget.value;
        this.setState({
            [fieldName]: value
        });
    };

    saveData = async () => {
        const currentState = this.state;
        const query = setCompanyProfileInfo(this.context.dataToExclude.token, currentState);
        await query.then(res => {
            console.log(res);
        })
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state);
    }

    async componentDidMount () {

        const query = getCompanyProfileInfo(this.context.dataToExclude.token);
        await query.then(res => {
            console.log(res);
            const {data: {id, createdAt, updatedAt, uuid, ...rest}} = res;
            this.selectOnMountHandler(this.language, rest.locale);
            this.setState(rest);
        });
    };

    render() {
        const {
            name,
            companyCode,
            vatCode,
            country,
            region,
            city,
            address,
            zipCode,
            locale
        } = this.state;
        return (
            <div className="profileDetailsWrap">
                <ProfileForm onCorrect={this.saveData}>
                    <div>
                        <input
                            type="text"
                            datatype="name"
                            placeholder={"Company name"}
                            defaultValue={name}
                            onChange={this.fieldsHandler}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            datatype="companyCode"
                            placeholder={"Registration number"}
                            defaultValue={companyCode}
                            onChange={this.fieldsHandler}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            datatype="address"
                            placeholder={"Registered office address"}
                            defaultValue={address}
                            onChange={this.fieldsHandler}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            datatype="zipCode"
                            placeholder={"Zip code"}
                            defaultValue={zipCode}
                            onChange={this.fieldsHandler}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            datatype="country"
                            placeholder={"Country"}
                            defaultValue={country}
                            onChange={this.fieldsHandler}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            datatype="city"
                            placeholder={"City"}
                            defaultValue={city}
                            onChange={this.fieldsHandler}
                        />
                    </div>
                    <p className={'onTopFieldLabel'}>Set the default language to use for customer facing Terms and
                        condition documents</p>
                    <div className={'profileDetails'}>
                        <select name="locale" ref={this.language} onChange={this.selectHandler}>
                            <option value="Language" defaultValue>Language</option>
                            <option value="LT">Lithuanian</option>
                            <option value="EN">English</option>
                        </select>
                        <p className="select">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#BFC5D2" fillRule="nonzero"
                                      d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                            </svg>
                        </p>
                    </div>

                </ProfileForm>
                {this.state.submitted &&
                <Notification type={'info'} text={`Hotspot settings was ${this.state.submittedType} successfully`}/>}
            </div>
        )
    }
}

export default connect(
    state => ({
        token: state.token
    }),
    dispatch => ({})
)(HotspotDetails);
