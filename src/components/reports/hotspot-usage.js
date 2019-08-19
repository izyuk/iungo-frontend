import React, {Component} from 'react';
import {getHotspots, getSummaryAnalytics} from "../../api/API";
import CaptivePortalContext from "../../context/project-context";

// import {dateISO} from "../../modules/dateISO";
import moment from 'moment';


class HotspotUsage extends Component {

    static contextType = CaptivePortalContext;

    state = {
        hotspotList: '',
        uuid: '',
        captivePortalID: '',
        summaryInfo: ''
    };

    token = localStorage.getItem('token');

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.hotspotList !== nextState.list) ||
            (this.state.uuid !== nextState.uuid) ||
            (this.state.captivePortalID !== nextState.captivePortalID);
    }

    getAllHotspotsMethodHandler = async (str) => {
        const query = getHotspots(str);
        const currentState = this.state;
        await query.then(res => {
            const {data} = res;
            currentState.hotspotList = data;
        });
        this.setState(currentState)
    };

    toggleCPSelectorActive = (e) => {
        e.currentTarget.classList.toggle("active");
    };

    setHSId = async (e, uuid, id) => {
        this.setState({
            uuid: uuid
        });
        document.getElementsByClassName('selectedPortal')[0].childNodes[0].innerText = e.currentTarget.innerText;
        this.setState({captivePortalID: id ? id : ''});
        const query = getSummaryAnalytics(this.token, uuid);
        await query.then(res => {
            const {data} = res;
            this.setState({
                summaryInfo: data
            })
        });
    };

    componentDidMount() {
        this.getAllHotspotsMethodHandler(this.token);
    }

    formatSessionDuration(s = 0) {
        const h = (s-(s%=3600))/3600;
        const m = (s-(s%=60))/60;
        return <span className={'count'}>
            {h}<span className={'count-sm'}> h</span> {(9<m ?'':'0') + m}<span className={'count-sm'}> m</span> {(9<s ?'':'0') + s} <span className={'count-sm'}> s</span>
        </span>;
    }

    render() {
        const {hotspotList, summaryInfo} = this.state;
        return (
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
                                {!!hotspotList && hotspotList.map((item, i) =>
                                    <p onClick={(e) => this.setHSId(e, item.uuid, item.id)} key={i}
                                       dataid={item.id}>{item.name}</p>
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
                                <span
                                    className={'count'}>
                                    {(summaryInfo && summaryInfo.newDevices !== null) ? summaryInfo.newDevices : '0'}
                                </span>
                            </p>
                        </div>
                        <div className="infoCell">
                            <span className={'name'}>Unique Devices</span>
                            <p className="info">
                                <span
                                    className={'count'}>
                                    {(summaryInfo && summaryInfo.uniqueDevices !== null) ? summaryInfo.uniqueDevices : '0'}
                                </span>
                            </p>
                        </div>
                        <div className="infoCell">
                            <span className={'name'}>Average Visits</span>
                            <p className="info">
                                {this.formatSessionDuration((summaryInfo && summaryInfo.averageSessionDuration) || 0)}
                            </p>
                        </div>
                        <div className="infoCell">
                            <span className={'name'}>Total Sessions</span>
                            <p className="info">
                                <span
                                    className={'count'}>
                                    {(summaryInfo && summaryInfo.totalSessions !== null) ? summaryInfo.totalSessions : '0'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HotspotUsage;