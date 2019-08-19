import React, {Component} from 'react';

// import {dateISO} from "../../modules/dateISO";


class HotspotUsage extends Component {

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
                                    {!!summaryInfo ? (summaryInfo.newDevices !== null ? summaryInfo.newDevices : '0') : '0'}
                                </span>
                            </p>
                        </div>
                        <div className="infoCell">
                            <span className={'name'}>Unique Devices</span>
                            <p className="info">
                                <span
                                    className={'count'}>
                                    {!!summaryInfo ? (summaryInfo.uniqueDevices !== null ? summaryInfo.uniqueDevices : '0') : '0'}
                                </span>
                            </p>
                        </div>
                        <div className="infoCell">
                            <span className={'name'}>Average Visits</span>
                            <p className="info">
                                <span
                                    className={'count'}>
                                    {!!summaryInfo ? (summaryInfo.averageSessionDuration !== null ? summaryInfo.averageSessionDuration : '0') : '0'}
                                    min</span>
                            </p>
                        </div>
                        <div className="infoCell">
                            <span className={'name'}>Total Sessions</span>
                            <p className="info">
                                <span
                                    className={'count'}>
                                    {!!summaryInfo ? (summaryInfo.totalSessions !== null ? summaryInfo.totalSessions : 0) : '0'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
        )
    }
}

export default HotspotUsage;