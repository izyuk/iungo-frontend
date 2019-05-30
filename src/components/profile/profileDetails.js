import React, {Component} from 'react';
import ProfileForm from './profileForm';
// import HotspotTable from './hotspotTable';
import Notification from '../additional/notification';
// import {createHotspot, getAllPortals, getHotspots, updateHotspotById} from '../../api/API';
import {connect} from "react-redux";

class HotspotDetails extends Component {
    state = {

    };

    country = React.createRef();
    language = React.createRef();

    static propTypes = {
        // name: PropTypes.string.isRequired,
        // address: PropTypes.string.isRequired,
        // description: PropTypes.string.isRequired,
        // url: PropTypes.string.isRequired,
        // portalId: PropTypes.number,
        // data: PropTypes.object.isRequired
    };

    static defaultProps = {
        // name: 'Your name',
        // address: 'Your address',
        // description: 'Your description',
        // url: 'Your virtual URL',
        // portalId: 0,
        // data: {
        //     id: 0
        // }
    };

    // handleInputChange = (e) => {
    //     const type = e.target.getAttribute('datatype');
    //     this.setState({
    //         [type]: e.target.value
    //     })
    // };
    //
    // getHotspotsMethodHandler = async (str) => {
    //     const query = getHotspots(str);
    //     await query.then(res => {
    //         const {data} = res;
    //         this.setState({
    //             list: data
    //         })
    //     });
    // };
    //
    // getAllPortalsMethodHandler = async (str) => {
    //     const query = getAllPortals(str);
    //     await query.then(res => {
    //         const {data} = res;
    //         this.setState({
    //             portalsList: data
    //         })
    //     });
    // };
    //
    // toggleCPSelectorActive = (e) => {
    //     e.currentTarget.classList.toggle("active");
    // };
    //
    //
    // handleCorrect = async (e) => {
    //     e.preventDefault();
    //     if (this.state.name !== '') {
    //         this.setState({
    //             incorrect: false
    //         });
    //         const token = localStorage.getItem('token');
    //         var query;
    //         if (this.state.id !== '') {
    //             query = updateHotspotById(token, this.state.name, this.state.address, this.state.description, this.state.captivePortalID, this.state.id);
    //             this.setState({
    //                 submitted: true,
    //                 submittedType: 'updated'
    //             })
    //         } else {
    //             query = createHotspot(token, this.state.name, this.state.address, this.state.description, this.state.captivePortalID);
    //             this.setState({
    //                 submitted: true,
    //                 submittedType: 'created'
    //             })
    //         }
    //
    //         await query.then(res => {
    //             this.getHotspotsMethodHandler(localStorage.getItem('token'));
    //         });
    //
    //
    //         setTimeout(() => {
    //             this.setState({submitted: false, submittedType: ''});
    //         }, 2000)
    //
    //     } else {
    //         this.setState({
    //             incorrect: true
    //         });
    //     }
    // };
    //
    // componentDidMount() {
    //     this.getHotspotsMethodHandler(localStorage.getItem('token'));
    //     this.getAllPortalsMethodHandler(localStorage.getItem('token'))
    // }
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
    //
    // setCPId(e) {
    //     document.getElementsByClassName('selectedPortal')[0].innerText = e.currentTarget.innerText;
    //     this.setState({captivePortalID: e.currentTarget.getAttribute('dataid') ? e.currentTarget.getAttribute('dataid') : ''});
    // }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.id !== nextState.id) return true;
        else if (this.state.name !== nextState.name) return true;
        else if (this.state.list !== nextState.list) return true;
        else if (this.state.address !== nextState.address) return true;
        else if (this.state.description !== nextState.description) return true;
        else if (this.state.portalsList !== nextState.portalsList) return true;
        else if (this.state.submitted !== nextState.submitted) return true;
        else if (this.state.submittedType !== nextState.submittedType) return true;
        else return true;
    }

    selectHandler = (ref) => {
        let svg = ref.current.nextSibling.children[0];
        let span = document.createElement('span');
        span.innerText = ref.current.options[ref.current.selectedIndex].value;
        ref.current.nextSibling.insertBefore(span, svg);
    };

    componentDidMount() {
        // this.country.current.value = repeat;
        this.selectHandler(this.country);
        this.selectHandler(this.language);
    };

    render() {
        // const {
        //     name,
        //     address,
        //     description
        // } = this.state;
        return (
            <div className="profileDetailsWrap">
                <ProfileForm
                    // incorrect={this.state.incorrect}
                    // onCorrect={this.handleCorrect}
                >

                    <div>
                        <input
                            type="text"
                            datatype="company-name"
                            placeholder={"Company name"}
                            // value={name}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            datatype="registration-number"
                            placeholder={"Registration number"}
                            // value={address}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            datatype="registered-office-address"
                            placeholder={"Registered office address"}
                            // value={address}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            datatype="zip-code"
                            placeholder={"Zip code"}
                            // value={address}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className={'profileDetails'}>
                        <select name="country" ref={this.country}>
                            <option value="Country" selected disabled>Country</option>
                        </select>
                        <p className="select">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#BFC5D2" fillRule="nonzero"
                                      d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                            </svg>
                        </p>
                    </div>
                    <div>
                        <input
                            type="email"
                            datatype="protection-officers-email"
                            placeholder={"Protection officer`s email"}
                            // value={address}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <p className={'onTopFieldLabel'}>Set the default language to use for customer facing Terms and condition documents</p>
                    <div className={'profileDetails'}>
                        <select name="language" ref={this.language}>
                            <option value="Language" selected disabled>Language</option>
                            <option value="Lithuanian">Lithuanian</option>
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
