import React, {Component} from 'react';
import Notification from "../additional/notification";
import {createHotspot, getAllPortals, updateHotspotById} from "../../api/API";
import CaptivePortalContext from "../../context/project-context";

class HotspotEditor extends Component {

    state = {
        name: '',
        address: '',
        description: '',
        url: '',
        list: '',
        id: '',
        captivePortalID: '',
        portalsList: '',
        submitted: false,
        submittedType: ''
    };

    static contextType = CaptivePortalContext;

    portals = React.createRef();

    handleInputChange = (e) => {
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
                this.getHotspotsMethodHandler(localStorage.getItem('token'));
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
    //
    // setCPId = (e) => {
    //     document.getElementsByClassName('selectedPortal')[0].innerText = e.currentTarget.innerText;
    //     this.setState({captivePortalID: e.currentTarget.getAttribute('dataid') ? e.currentTarget.getAttribute('dataid') : ''});
    // };
    //
    // editHandler = (HSid, HSname, HSaddress, HSdescription, portalID) => {
    //     const data = {id: HSid, name: HSname, address: HSaddress, description: HSdescription};
    //     Object.keys(data).map((el) => {
    //         this.setState({
    //             [el]: data[el]
    //         });
    //     });
    //     if (portalID) {
    //         let portalsList = this.state.portalsList;
    //         const {[0]: {id, name}} = portalsList.filter(el => {
    //             if (el.id === portalID) {
    //                 console.log(el);
    //                 return el;
    //             }
    //         });
    //         document.getElementsByClassName('selectedPortal')[0].innerText = name;
    //         this.setState({captivePortalID: id});
    //     } else {
    //         document.getElementsByClassName('selectedPortal')[0].innerText = 'Select Captive Portal';
    //         this.setState({captivePortalID: ''});
    //
    //     }
    // };

    selectHandler = (e) => {
        const currentState = this.state;
        console.log(currentState);
        const data = e.currentTarget.options[e.currentTarget.selectedIndex].value;
        const span = e.currentTarget.nextSibling.children[0];
        span.innerText = data;
        currentState.url = e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute('url');
        currentState.captivePortalID = e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute('dataid');
        console.log(e.target);
        console.log(e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute('dataid'));
        this.setState(currentState);
        // const {displayColorPicker, ...rest} = this.state;
        // this.context.setBorderStyle(rest);
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

    componentDidMount() {
        this.getAllPortalsMethodHandler(localStorage.getItem('token'));
        // this.getHotspotsMethodHandler(localStorage.getItem('token'));
    }

    render() {
        const {
            name,
            address,
            description,
            portalsList,
            url
        } = this.state;

        return (
            <div className="container containerFix">
                <div className="wrap wrapFix2">
                    <div className="info">
                        <h3>Hotspot Settings</h3>
                    </div>
                    <div className="hotspotDetailsWrap">
                        <div className="hotspotForm">
                            <label htmlFor={'hotspot-name'}>Name</label>
                            <div>
                                <input
                                    id={'hotspot-name'}
                                    type="text"
                                    name="name"
                                    placeholder={"Your name"}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <label htmlFor={'hotspot-address'}>Address</label>
                            <div>
                                <input
                                    id={'hotspot-address'}
                                    type="text"
                                    name="address"
                                    placeholder={"Your address"}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <label htmlFor={'hotspot-description'}>Description</label>
                            <div className={'withTextarea'}>
                                <textarea
                                    id={'hotspot-description'}
                                    name="description"
                                    placeholder={"Your description"}
                                    onChange={this.handleInputChange}
                                >

                                </textarea>
                            </div>
                            <label htmlFor={'select-captive-portal'}>Select Captive Portal</label>
                            <div className={'profileDetails'}>
                                <select name="portals"
                                        id={'select-captive-portal'}
                                        ref={this.portals}
                                        onChange={this.selectHandler}>
                                    <option value="">Choose portal</option>
                                    {
                                        portalsList !== '' &&
                                        portalsList.map((item, i) => {
                                            return <option key={i} dataid={item.id}
                                                           url={item.externalUrl}>{item.name}</option>
                                        })
                                    }
                                </select>
                                <p className="select">
                                    <span>Choose portal</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                                        <path fill="#ffffff" fillRule="nonzero"
                                              d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                    </svg>
                                </p>
                            </div>
                            <button onClick={this.handleCorrect}>Save</button>


                            {
                                !!url &&
                                <p className="link">
                                    <span>
                                        {url}
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
                        <div className={'portalPreviewWrap'}>
                            <div className="portalPreview">
                                {
                                    !!url &&
                                    <iframe src={url} frameBorder="0"></iframe>
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