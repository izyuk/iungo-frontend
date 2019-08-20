import React, {Component} from 'react';
import HorizontalTabs from './horizontalTabs';
import People from './people';
import HotspotUsage from './hotspot-usage';
import {getHotspots, getSummaryAnalytics, getHotspotUsers} from "../../api/API";

export default class Reports extends Component {
    state = {
        hotspotList: '',
        uuid: '',
        id: '',
        summaryInfo: null,
        usersList: []
    };
    _people_component = React.createRef();

    token = localStorage.getItem('token');

    componentDidMount() {
        this.getAllHotspots(this.token);
    }

    toggleCPSelectorActive = (e) => {
        e.currentTarget.classList.toggle("active");
    };

    getAllHotspots = async (token) => {
        const query = getHotspots(token);
        await query.then(res => {
            const {data} = res;
            this.setState({ hotspotList: data });
        });
    };

    setHotspotId = async (e, uuid, id) => {
        this.setState({ uuid: uuid, id: id ? id : ''});
        document.getElementsByClassName('selectedPortal')[0].childNodes[0].innerText = e.currentTarget.innerText;
        this.getSummaryInfo(uuid);
        this.getUserList(uuid);
    };

    getSummaryInfo = async (uuid) => {
        const query = getSummaryAnalytics(this.token, uuid);
        await query.then(res => {
            const {data} = res;
            this.setState({
                summaryInfo: data
            })
        });
    }

    getUserList = async (uuid) => {
        const query = getHotspotUsers(this.token, uuid);
        await query.then(res => {
            const {data} = res;
            this.setState({
                usersList: data
            })
        });
    }
    
    exportCSV = async () => {
        if (this._people_component && this._people_component.current && this._people_component.current.exportCSV) {
            this._people_component.current.exportCSV();
        }
    };

    render() {
        const param = this.props.match.params;
        const {uuid, hotspotList, summaryInfo, usersList} = this.state;

        return (
            <div className="container containerFix">
                <div className="wrap wrapFix2">
                    <div className="info">
                        <h3>Reports</h3>
                    </div>
                    <HorizontalTabs/>
                    <div className={'container'}>
                        <div className="setInfoLine">
                            <div className={"hsSelectorHead"}>
                                <div className="hsSelector" onClick={this.toggleCPSelectorActive}>
                                    <p className={'selectedPortal'}>
                                        <span>
                                            Select Hotspot
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path fill="#FFF" fillRule="nonzero"
                                                d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                        </svg>

                                    </p>
                                    <div className="list">
                                        {hotspotList && hotspotList.length && hotspotList.map((item, i) =>
                                            <p key={i} dataid={item.id} onClick={(e) => this.setHotspotId(e, item.uuid, item.id)}>
                                                {item.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {param.page === 'people' && <div className="exportCSV">
                                <button type='button' onClick={this.exportCSV}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="#BFC5D2" fillRule="nonzero"
                                            d="M17 11.1V11c0-2.8-2.2-5-5-5-2.5 0-4.6 1.8-4.9 4.3-1.8.6-3.1 2.2-3.1 4.2C4 17 6 19 8.5 19H16c2.2 0 4-1.8 4-4 0-1.9-1.3-3.4-3-3.9zM11 13v-3h2v3h3l-4 4-4-4h3z"/>
                                    </svg>
                                    <span>Export to CSV</span>
                                </button>
                            </div>}
                        </div>

                        {param.page === 'people' ?
                            <People ref={this._people_component} uuid={uuid} usersList={usersList}/> :
                            (param.page === 'hotspot-usage' ?
                                <HotspotUsage uuid={uuid} summaryInfo={summaryInfo}/> :
                                    <div></div>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}
