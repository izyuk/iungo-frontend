import React, {Component} from 'react';
import HotspotForm from './hotspotForm';
import HotspotTable from './hotspotTable';
import Notification from '../additional/notification';

import {createHotspot, getAllPortals, getHotspots, updateHotspotById} from '../../api/API';
import {connect} from "react-redux";

class HotspotDetails extends Component {
    state = {
        incorrect: false,
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

    handleInputChange = (e) => {
        const type = e.target.getAttribute('datatype');
        this.setState({
            [type]: e.target.value
        })
    };

    getHotspotsMethodHandler = async (str) => {
        const query = getHotspots(str);
        await query.then(res => {
            const {data} = res;
            this.setState({
                list: data
            })
        });
    };

    getAllPortalsMethodHandler = async (str) => {
        const query = getAllPortals(str);
        await query.then(res => {
            const {data} = res;
            this.setState({
                portalsList: data
            })
        });
    };

    toggleCPSelectorActive = (e) => {
        e.currentTarget.classList.toggle("active");
    };


    handleCorrect = async (e) => {
        e.preventDefault();
        if (this.state.name !== '') {
            this.setState({
                incorrect: false
            });
            const token = localStorage.getItem('token');
            var query;
            if (this.state.id !== '') {
                query = updateHotspotById(token, this.state.name, this.state.address, this.state.description, this.state.captivePortalID, this.state.id);
                this.setState({
                    submitted: true,
                    submittedType: 'updated'
                })
            } else {
                query = createHotspot(token, this.state.name, this.state.address, this.state.description, this.state.captivePortalID);
                this.setState({
                    submitted: true,
                    submittedType: 'created'
                })
            }

            await query.then(res => {
                this.getHotspotsMethodHandler(localStorage.getItem('token'));
            });


            setTimeout(() => {
                this.setState({submitted: false, submittedType: ''});
            }, 2000)

        } else {
            this.setState({
                incorrect: true
            });
        }
    };

    componentDidMount() {
        this.getHotspotsMethodHandler(localStorage.getItem('token'));
        this.getAllPortalsMethodHandler(localStorage.getItem('token'))
    }

    editHandler = (HSid, HSname, HSaddress, HSdescription, portalID) => {
        const data = {id: HSid, name: HSname, address: HSaddress, description: HSdescription};
        Object.keys(data).map((el) => {
            this.setState({
                [el]: data[el]
            });
        });
        if (portalID) {
            let portalsList = this.state.portalsList;
            const {[0]: {id, name}} = portalsList.filter(el => {
                if (el.id === portalID) {
                    console.log(el);
                    return el;
                }
            });
            document.getElementsByClassName('selectedPortal')[0].innerText = name;
            this.setState({captivePortalID: id});
        } else {
            document.getElementsByClassName('selectedPortal')[0].innerText = 'Select Captive Portal';
            this.setState({captivePortalID: ''});

        }
    };

    setCPId(e) {
        document.getElementsByClassName('selectedPortal')[0].innerText = e.currentTarget.innerText;
        this.setState({captivePortalID: e.currentTarget.getAttribute('dataid') ? e.currentTarget.getAttribute('dataid') : ''});
    }

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

    render() {
        const {
            name,
            address,
            description
        } = this.state;
        return (
            <div className="hotspotDetailsWrap">
                <HotspotForm
                    incorrect={this.state.incorrect}
                    onCorrect={this.handleCorrect}>

                    <div>
                        <input
                            type="text"
                            datatype="name"
                            placeholder={"Your name"}
                            value={name}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            datatype="address"
                            placeholder={"Your address"}
                            value={address}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <textarea
                            datatype="description"
                            placeholder={"Your description"}
                            value={description}
                            onChange={this.handleInputChange}
                        >

                        </textarea>
                    </div>
                    <div className={"cpSelectorHead"}>
                        <div className="cpSelector" onClick={this.toggleCPSelectorActive}>
                            <p className={'selectedPortal'}>Select Captive Portal</p>
                            <div className="list">
                                <p onClick={(e) => this.setCPId(e)}>Set nothing</p>
                                {this.state.portalsList !== '' && this.state.portalsList.map((item, i) => {
                                    return <p onClick={(e) => this.setCPId(e)} key={i} dataid={item.id}>{item.name}</p>
                                })}
                            </div>
                        </div>
                    </div>
                </HotspotForm>
                <HotspotTable
                    hotspotList={this.state.list !== '' ? this.state.list : false}
                    editHandler={this.editHandler}/>
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
