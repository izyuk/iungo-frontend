import React, {Component} from 'react';
import HotspotTable from './hotspotTable';
import Notification from '../additional/notification';

import {getHotspots} from '../../api/API';
import {Route} from "react-router-dom";
import {dateISO} from "../../modules/dateISO";

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

    findAllHotspots = async (str) => {
        let query = getHotspots(str);
        let listArray = [];
        await query.then(res => {
            let {data} = res;
            data.map((item, i) => {
                console.log(item);
                listArray.push(
                    <Route key={i} render={({history}) => (
                        <tr dataid={item.id} datauuid={item.uuid} onClick={(e) => {
                            history.push(`/hotspot/${item.uuid}`)
                        }}>
                            <td>{item.name}</td>
                            <td>{item.portal ? item.portal.name : ''}</td>
                            <td>{item.address}</td>
                            <td>{item.description}</td>
                            <td className={"url"}>
                                {item.virtualUrl !== null ?
                                    <a href={`${item.virtualUrl}`}
                                       onClick={this.copyToClipboard}
                                    >
                                        {item.virtualUrl}
                                    </a>
                                    : ''
                                }
                            </td>
                            <td>{dateISO(item.updatedAt)}</td>
                        </tr>
                    )}/>
                )
            });
        });
        this.setState({
            list: listArray
        })
    };

    componentDidMount() {
        this.findAllHotspots(localStorage.getItem('token'));
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
        return (
            <div className="contentWrapWithTopBorder">
                <HotspotTable
                    hotspotList={this.state.list !== '' ? this.state.list : false}
                    editHandler={this.editHandler}/>
                {this.state.submitted &&
                <Notification type={'info'} text={`Hotspot settings was ${this.state.submittedType} successfully`}/>}
            </div>
        )
    }
}

export default HotspotDetails;
