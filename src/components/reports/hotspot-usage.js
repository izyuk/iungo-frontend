import React, {Component} from 'react';

// import {dateISO} from "../../modules/dateISO";

class HotspotUsage extends Component {

    formatSessionDuration(s = 0) {
        const h = (s-(s%=3600))/3600;
        const m = (s-(s%=60))/60;
        return <span className={'count'}>
            {h}<span className={'count-sm'}> h</span> {(9<m ?'':'0') + m}<span className={'count-sm'}> m</span> {(9<s ?'':'0') + s} <span className={'count-sm'}> s</span>
        </span>;
    }

    render() {
        const {summaryInfo} = this.props;
        return (
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
        )
    }
}

export default HotspotUsage;