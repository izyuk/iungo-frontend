import React, {Component} from 'react';
import {getAllPortals, getSummaryAnalytics} from "../../api/API";

// import {dateISO} from "../../modules/dateISO";



class HotspotUsage extends Component {
    state = {
        portalList: '',
        uuid: '',
        captivePortalID: '',
        summaryInfo: ''
    };

    token = localStorage.getItem('token');

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.portalList !== nextState.list) ||
            (this.state.uuid !== nextState.uuid) ||
            (this.state.captivePortalID !== nextState.captivePortalID);
    }

    getAllPortalsMethodHandler = async (str) => {
        const query = getAllPortals(str);
        const currentState = this.state;
        await query.then(res => {
            const {data} = res;
            console.log(data);
            currentState.portalList = data;
        });
        this.setState(currentState)
    };

    toggleCPSelectorActive = (e) => {
        e.currentTarget.classList.toggle("active");
    };

    setCPId = async (e, uuid, id) => {
        this.setState({
            uuid: uuid
        });
        document.getElementsByClassName('selectedPortal')[0].childNodes[0].innerText = e.currentTarget.innerText;
        this.setState({captivePortalID: id ? id : ''});
        const query = getSummaryAnalytics(this.token, id);
        await query.then(res => {
            const {data} = res;
            console.log(data);
            this.setState({
                summaryInfo: data
            })
        });
    };

    componentDidMount() {
        this.getAllPortalsMethodHandler(this.token);
    }

    render() {
        const {portalList} = this.state;
        console.log(portalList);
        return (
            <div className={'container'}>
                <div className="setInfoLine">
                    <div className={"hsSelectorHead"}>
                        <div className="hsSelector" onClick={this.toggleCPSelectorActive}>
                            <p className={'selectedPortal'}>
                                <span>
                                    Select CP
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#FFF" fillRule="nonzero"
                                          d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                </svg>

                            </p>
                            <div className="list">
                                {!!portalList && portalList.map((item, i) =>
                                    <p onClick={(e) => this.setCPId(e, item.uuid, item.id)} key={i} dataid={item.id}>{item.name}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'mainGraph'}>
                    <div className="numericRow">
                        <div className="infoCell">
                            <span className={'name'}>New Devices</span>
                            <p className="info">
                                <span className={'count'}>{'1,621'}</span>{/*<span className={'difference'}>{'1,2'}%</span>*/}
                            </p>
                        </div>
                        <div className="infoCell">
                            <span className={'name'}>Unique Devices</span>
                            <p className="info">
                                <span className={'count'}>{'3,403'}</span>{/*<span className={'difference'}>{'1,2'}%</span>*/}
                            </p>
                        </div>
                        <div className="infoCell">
                            <span className={'name'}>Average Visits</span>
                            <p className="info">
                                <span className={'count'}>{'52 min'}</span>{/*<span className={'difference'}>{'1,2'}%</span>*/}
                            </p>
                        </div>
                        <div className="infoCell">
                            <span className={'name'}>Total Sessions</span>
                            <p className="info">
                                <span className={'count'}>{'10,321'}</span>{/*<span className={'difference'}>{'1,2'}%</span>*/}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HotspotUsage;