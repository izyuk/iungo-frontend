import React, {Component} from 'react';
import Notification from "~/components/additional/notification";
import {createHotspot, getAllPortals, getHotspotByUUID, updateHotspotById} from "~/api/API";
import CaptivePortalContext from "~/context/project-context";
import Loader from "~/loader";
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icons from '~/static/images/icons';

const ValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required')
});

class HotspotEditor extends Component {

    state = {
        name: '',
        address: '',
        description: '',
        list: '',
        id: '',
        captivePortalID: '',
        captivePortalName: '',
        portalsList: '',
        portalUrl: '',
        submitted: false,
        submittedType: '',
    };

    static contextType = CaptivePortalContext;

    handleInputChange = (e, handleChange) => {
        handleChange && handleChange(e);
        const currentState = this.state;
        const name = e.target.getAttribute('name');
        currentState[name] = e.target.value;
        this.setState(currentState)
    };

    getAllPortalsMethodHandler = async (str) => {
        const query = getAllPortals(str);
        const currentState = this.state;
        await query.then(res => {
            const {data} = res;
            currentState.portalsList = data;
            this.setState(currentState)
        });
    };

    handleCorrect = async (e) => {
        e.preventDefault();
        if (this.state.name !== '') {
            this.context.loaderHandler(true);
            this.setState({
                incorrect: false
            });
            const token = localStorage.getItem('token');
            var query;
            if (this.state.id !== '') {
                query = updateHotspotById(token, this.state.name, this.state.address, this.state.description, this.state.captivePortalID, this.state.id);
                this.setState({ submitted: true, submittedType: 'updated' });
            } else {
                query = createHotspot(token, this.state.name, this.state.address, this.state.description, this.state.captivePortalID);
                this.setState({ submitted: true, submittedType: 'created' });
            }
            await query.then(res => {
                if (res && res.data) {
                    if (res.data.uuid && window.location.pathname === '/hotspot/new') {
                        window.history.pushState(null, null, `/hotspot/${res.data.uuid}`);
                    }
                    this.setState({ id: res.data.id });
                    this.context.setNotification('Hotspot settings was saved successfully', false, true);
                    setTimeout(() => {
                        this.context.setNotification('', false, false);
                    }, 3000);
                }
            });
            this.context.loaderHandler(false);
            setTimeout(() => {
                this.setState({ submitted: false, submittedType: '' });
            }, 2000)
        } else {
            this.setState({
                incorrect: true
            });
        }
    };

    getHotspotMethodHandler = async (string) => {
        const uuid = this.props.match.params.uuid;
        if (uuid !== 'new') {
            const query = getHotspotByUUID(string, uuid);
            await query.then(res => {
                console.log(res.data);
                const {data: {address, description, id, name, portal, virtualUrl}} = res;
                console.log(address, description, id, name, portal, virtualUrl);
                const currentState = this.state;
                currentState.address = address;
                currentState.description = description;
                currentState.id = id;
                currentState.name = name;
                if (!!portal) {
                    currentState.captivePortalID = portal.id;
                    currentState.captivePortalName = portal.name;
                    currentState.portalUrl = portal.externalUrl;
                }
                if (this._form && this._form.setValues) {
                    this._form.setValues({ name, address, description });
                }
                this.setState(currentState);
            });
        }
    };

    selectHandler = (e) => {
        const currentState = this.state;
        const selected = e.currentTarget.options[e.currentTarget.selectedIndex];
        currentState.captivePortalName = selected.value;
        currentState.portalUrl = selected.getAttribute('portalUrl');
        currentState.captivePortalID = selected.getAttribute('dataid');
        this.setState(currentState);
    };

    copyToClipboard = (e) => {
        const NODE = document.querySelector('.HSurlCopyData');
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(NODE);
        selection.removeAllRanges();
        selection.addRange(range);
        try {
            let successful = document.execCommand('copy');
            selection.removeAllRanges();
            let msg = 'Copying text command was ' + (successful ? 'successful' : 'unsuccessful');
            console.info(msg);
            successful && this.context.setNotification('Hotspot settings was saved successfully', false, true);
        } catch (err) {
            console.warn('Oops, unable to copy');
        }
        e.preventDefault();
        setTimeout(() => {
            this.context.setNotification('', false, false);
        }, 2000)
    };

    async componentDidMount() {
        if (this.props.match.params.uuid === 'new') localStorage.removeItem('HSurl');
        console.log(this.props.match.params.uuid);
        await this.getAllPortalsMethodHandler(localStorage.getItem('token'));
        await this.getHotspotMethodHandler(localStorage.getItem('token'));
    }

    getFieldErrorText(errors, touched, fieldName) {
        let error;
        if (touched[fieldName]) {
            if (errors && errors[fieldName]) {
                error = errors[fieldName];
            }
        }
        return Boolean(error) ? <p className={'errorText'}>* {error}</p> : null;
    }

    render() {
        const {
            name,
            address,
            description,
            portalsList,
            portalUrl,
            captivePortalID,
            captivePortalName
        } = this.state;
        return (
            <div className="container containerFix">
                <div className="wrap wrapFix2 hotspotEditorWrap">
                    <div className="hotspotFormCol">
                        <div className="info">
                            {!!!!localStorage.getItem('HSurl') ? (
                                <h3>Edit Hotspot</h3>
                            ) : (
                                <h3>Create Hotspot</h3>
                            )
                            }
                        </div>
                        <div className="contentWrapWithTopBorder">
                            <Formik ref={el => this._form = el}
                                    initialValues={{name, address, description}}
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
                                        const hasErr = fieldName => Boolean(getErr(fieldName));
                                        return (
                                            <div className="hotspotForm" data-cy="newHotspotForm">
                                                <label htmlFor={'hotspot-name'} className={hasErr('name') ? 'error' : ''}>
                                                    Name
                                                </label>
                                                {getErr('name')}
                                                <div className={hasErr('name') ? 'errorField' : ''}>
                                                    <input
                                                        id={'hotspot-name'}
                                                        type="text"
                                                        name="name"
                                                        data-cy="newHotspotName"
                                                        placeholder={"Hostpot name"}
                                                        onChange={(e) => this.handleInputChange(e, handleChange)}
                                                        onBlur={(e) => this.handleInputChange(e, handleChange)}
                                                        value={values.name}
                                                    />
                                                </div>

                                                <label htmlFor={'hotspot-address'}
                                                    className={hasErr('address') ? 'error' : ''}>
                                                    Address or location
                                                </label>
                                                {getErr('address')}
                                                <div className={hasErr('address') ? 'errorField' : ''}>
                                                    <input
                                                        id={'hotspot-address'}
                                                        type="text"
                                                        name="address"
                                                        data-cy="newHotspotAddress"
                                                        placeholder={"Hotspot location or address"}
                                                        onChange={(e) => this.handleInputChange(e, handleChange)}
                                                        onBlur={(e) => this.handleInputChange(e, handleChange)}
                                                        value={address}
                                                    />
                                                </div>

                                                <label htmlFor={'hotspot-description'}
                                                    className={hasErr('description') ? 'error' : ''}>
                                                    Description
                                                </label>
                                                {getErr('description')}
                                                <div
                                                    className={'withTextarea ' + (hasErr('description') ? 'errorField' : '')}>
                                            <textarea
                                                id={'hotspot-description'}
                                                name="description"
                                                data-cy="newHotspotDescription"
                                                placeholder={"Description"}
                                                onChange={(e) => this.handleInputChange(e, handleChange)}
                                                onBlur={(e) => this.handleInputChange(e, handleChange)}
                                                value={description}
                                            >

                                            </textarea>
                                                </div>

                                                <label htmlFor={'select-captive-portal'}>
                                                    Select Captive Portal
                                                </label>
                                                <div className={'profileDetails'}>
                                                    <select name="portals"
                                                            id={'select-captive-portal'}
                                                            data-cy="newHotspotSelectCP"
                                                            onChange={this.selectHandler}>
                                                        <option value="">Choose portal</option>
                                                        {
                                                            portalsList !== '' &&
                                                            portalsList.map((item, i) => {
                                                                return <option key={i} dataid={item.id}
                                                                            data-cy={`newHotspotSelectCP_Option_${i}`}
                                                                            data-name={item.name}
                                                                            selected={captivePortalID === item.id}
                                                                            portalurl={item.externalUrl}>{item.name}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <p className="select">
                                                        <span>{captivePortalName || 'Choose portal'}</span>
                                                        <Icons.DropdownIcon fill="#FFF" width="36" height="36"/>
                                                    </p>
                                                </div>
                                                <button data-cy="newHotspotSave" onClick={isValid ? this.handleCorrect : submitForm}>Save</button>


                                                {
                                                    (localStorage.getItem('HSurl') !== 'null' && localStorage.getItem('HSurl')) &&
                                                    <p className="link">
                                                        <span>
                                                            Copy and paste this URL to your device settings<br/>
                                                            <br/>
                                                            <span className="HSurlCopyData">
                                                                {localStorage.getItem('HSurl')}
                                                            </span>
                                                        </span>
                                                        <span onClick={this.copyToClipboard}>
                                                            <Icons.ClipboardCopyIcon/>
                                                        </span>
                                                    </p>
                                                }

                                            </div>

                                        )
                                    }}
                            />
                        </div>
                    </div>

                    <div className="hotspotPreviewCol">
                        <div className="info">
                            <h3>Preview</h3>
                        </div>
                        <div className="contentWrapWithTopBorder">
                            <div className={'portalPreviewWrap'}>
                                <div className="portalPreview">
                                    {
                                        !!portalUrl &&
                                        <iframe src={portalUrl} frameBorder="0" data-cy="portalPreviewIframe"></iframe>
                                    }
                                </div>
                            </div>
                            {this.state.submitted &&
                            <Notification type={'info'}
                                        text={`Hotspot settings was ${this.state.submittedType} successfully`}/>}
                        </div>
                    </div>
                </div>
                {this.context.dataToExclude.notification && <Notification/>}
                {this.context.dataToExclude.loader && <Loader/>}
            </div>
        )
    }
}

export default HotspotEditor;