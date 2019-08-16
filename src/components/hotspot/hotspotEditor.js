import React, {Component} from 'react';
import Notification from "../additional/notification";
import {createHotspot, getAllPortals, getHotspotByUUID, updateHotspotById} from "../../api/API";
import CaptivePortalContext from "../../context/project-context";
import {Formik} from 'formik';
import * as Yup from 'yup';

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
        portalsList: '',
        portalUrl: '',
        submitted: false,
        submittedType: '',
    };

    static contextType = CaptivePortalContext;

    portals = React.createRef();

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
            this.setState({
                incorrect: false
            });
            const token = localStorage.getItem('token');
            var query;
            const currentState = this.state;
            if (this.state.id !== '') {
                query = updateHotspotById(token, this.state.name, this.state.address, this.state.description, this.state.captivePortalID, this.state.id);
                currentState.submited = true;
                currentState.submittedType = 'updated';
                this.setState(currentState)
            } else {
                query = createHotspot(token, this.state.name, this.state.address, this.state.description, this.state.captivePortalID);
                currentState.submited = true;
                currentState.submittedType = 'created';
                this.setState(currentState)
            }
            await query.then(res => {
                currentState.id = res.data.id;
                this.setState(currentState)
            });
            setTimeout(() => {
                currentState.submited = false;
                currentState.submittedType = '';
                this.setState(currentState)
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
                    currentState.portalUrl = portal.externalUrl;
                }
                this.setState(currentState);
            });
        }
    };

    selectHandler = (e) => {
        const currentState = this.state;
        console.log(currentState);
        const data = e.currentTarget.options[e.currentTarget.selectedIndex].value;
        const span = e.currentTarget.nextSibling.children[0];
        span.innerText = data;
        console.log(e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute('portalurl'));
        currentState.portalUrl = e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute('portalUrl');
        currentState.captivePortalID = e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute('dataid');

        console.log(e.target);
        console.log(e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute('dataid'));
        this.setState(currentState);
    };

    copyToClipboard = (e) => {
        const NODE = e.currentTarget.previousSibling;
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(NODE);
        selection.removeAllRanges();
        selection.addRange(range);
        try {
            let successful = document.execCommand('copy');
            this.setState({
                copied: successful
            });
            selection.removeAllRanges();
            let msg = successful ? 'successful' : 'unsuccessful';
            console.info('Copying text command was ' + msg);
        } catch (err) {
            console.warn('Oops, unable to copy');
        }
        e.preventDefault();
        setTimeout(() => {
            this.setState({copied: false});
        }, 2000)
    };

    async componentDidMount() {
        if (this.props.match.params.uuid === 'new') localStorage.removeItem('HSurl');
        console.log(this.props.match.params.uuid);
        await this.getAllPortalsMethodHandler(localStorage.getItem('token'));
        await this.getHotspotMethodHandler(localStorage.getItem('token'));
        const data = this.portals.current.options[this.portals.current.selectedIndex].value;
        const span = this.portals.current.nextSibling.children[0];
        span.innerText = data;
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
            captivePortalID
        } = this.state;
        return (
            <div className="container containerFix">
                <div className="wrap wrapFix2">
                    <div className="info">
                        {!!!!localStorage.getItem('HSurl') ? (
                            <h3>Edit Hotspot</h3>
                        ) : (
                            <h3>Create Hotspot</h3>
                        )
                        }
                    </div>
                    <div className="contentWrapWithTopBorder hotspot">
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
                                        <div className="hotspotForm">
                                            <label htmlFor={'hotspot-name'} className={hasErr('name') ? 'error' : ''}>
                                                Name
                                            </label>
                                            {getErr('name')}
                                            <div className={hasErr('name') ? 'errorField' : ''}>
                                                <input
                                                    id={'hotspot-name'}
                                                    type="text"
                                                    name="name"
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
                                                        ref={this.portals}
                                                        onChange={this.selectHandler}>
                                                    <option value="">Choose portal</option>
                                                    {
                                                        portalsList !== '' &&
                                                        portalsList.map((item, i) => {
                                                            console.log(item);
                                                            return <option key={i} dataid={item.id}
                                                                           selected={captivePortalID === item.id}
                                                                           portalurl={item.externalUrl}>{item.name}</option>
                                                        })
                                                    }
                                                </select>
                                                <p className="select">
                                                    <span>Choose portal</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                                                         viewBox="0 0 24 24">
                                                        <path fill="#ffffff" fillRule="nonzero"
                                                              d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                                    </svg>
                                                </p>
                                            </div>
                                            <button onClick={isValid ? this.handleCorrect : submitForm}>Save</button>


                                            {
                                                (localStorage.getItem('HSurl') !== 'null' && localStorage.getItem('HSurl')) &&
                                                <p className="link">
                                            <span>
                                                Copy and paste this URL to your device settings<br/>
                                                <br/>
                                                {localStorage.getItem('HSurl')}
                                            </span>
                                                    <span onClick={this.copyToClipboard}>
                                                <svg version="1.1" id="Capa_1"
                                                     x="0px" y="0px" viewBox="0 0 488.3 488.3"
                                                     style={{enableBackground: 'new 0 0 488.3 488.3'}}
                                                     width="20px" height="20px" className="">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path
                                                                    d="M314.25,85.4h-227c-21.3,0-38.6,17.3-38.6,38.6v325.7c0,21.3,17.3,38.6,38.6,38.6h227c21.3,0,38.6-17.3,38.6-38.6V124    C352.75,102.7,335.45,85.4,314.25,85.4z M325.75,449.6c0,6.4-5.2,11.6-11.6,11.6h-227c-6.4,0-11.6-5.2-11.6-11.6V124    c0-6.4,5.2-11.6,11.6-11.6h227c6.4,0,11.6,5.2,11.6,11.6V449.6z"
                                                                    className="active-path" fill="#5585ED"/>
                                                                <path
                                                                    d="M401.05,0h-227c-21.3,0-38.6,17.3-38.6,38.6c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5c0-6.4,5.2-11.6,11.6-11.6h227    c6.4,0,11.6,5.2,11.6,11.6v325.7c0,6.4-5.2,11.6-11.6,11.6c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5c21.3,0,38.6-17.3,38.6-38.6    V38.6C439.65,17.3,422.35,0,401.05,0z"
                                                                    className="active-path" fill="#5585ED"/>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>

                                            </span>
                                                </p>

                                            }

                                        </div>

                                    )
                                }}
                        />
                        <div className={'portalPreviewWrap'}>
                            <div className="portalPreview">
                                {
                                    !!portalUrl &&
                                    <iframe src={portalUrl} frameBorder="0"></iframe>
                                }
                            </div>
                        </div>
                        {this.state.submitted &&
                        <Notification type={'info'}
                                      text={`Hotspot settings was ${this.state.submittedType} successfully`}/>}
                    </div>
                </div>
            </div>
        )
    }
}

export default HotspotEditor;