import React, {Component} from 'react';
import HorizontalTabs from './horizontalTabs';
import People from './people';
import HotspotUsage from './hotspot-usage';
import {getHotspots} from "~/api/API";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Icons from '~/static/images/icons';

export default class Reports extends Component {
    state = {
        hotspotList: [],
        uuid: this.props.match.params.uuid || '',
        inited: false,
        startDate: moment().startOf('month').valueOf(),
        endDate: moment().endOf('month').valueOf(),
    };
    _startDatePicker = React.createRef();
    _endDatePicker = React.createRef();
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
            this.setState({ hotspotList: data, inited: true }, () => {
                if (this.props.match.params.uuid) {
                    data.map(item => {
                        if (item.uuid === this.props.match.params.uuid) {
                            document.getElementsByClassName('selectedPortal')[0].childNodes[0].innerText = item.name;
                        }
                    })
                }
            });
        });
    };

    setHotspotId = async (e, uuid, id) => {
        const page = this.props.match.params.page;
        this.props.history.push(`/reports/${page}/${uuid}`);
        
        this.setState({ uuid: uuid});
        document.getElementsByClassName('selectedPortal')[0].childNodes[0].innerText = e.currentTarget.innerText;
    };
    
    exportCSV = async () => {
        if (this._people_component && this._people_component.current && this._people_component.current.exportCSV) {
            this._people_component.current.exportCSV();
        }
    };

    handleChangeDate(name, val) {
        const { startDate, endDate } = this.state;
        const isStart = name === 'startDate';
        let newStartDate = isStart ? val : startDate,
            newEndDate = isStart ? endDate : val;
        if (newStartDate > newEndDate && isStart) {
            newEndDate = moment(newStartDate).add('days', 1).valueOf();
        }
        this.setState({ startDate: newStartDate, endDate: newEndDate }, () => {
            if (isStart && this._endDatePicker && this._endDatePicker.current && this._endDatePicker.current.setFocus) {
                this._endDatePicker.current.setFocus();
            }
        });
    }

    render() {
        const param = this.props.match.params;
        const {uuid, hotspotList, inited, startDate, endDate} = this.state;

        return (
            <div className="container containerFix">
                <div className="wrap wrapFix2">
                    <div className="info">
                        <h3>Reports</h3>
                    </div>
                    <HorizontalTabs uuid={uuid}/>
                    <div className={'container'}>
                        <div className="setInfoLine">
                            <div className={"hsSelectorHead"}>
                                <div className="hsSelector" onClick={this.toggleCPSelectorActive}>
                                    <p className={'selectedPortal'}>
                                        <span>
                                            Select Hotspot
                                        </span>
                                        <Icons.DropdownIcon fill="#FFF"/>
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
                                        <Icons.ExportDownloadIcon/>
                                    <span>Export to CSV</span>
                                </button>
                            </div>}
                            {param.page === 'hotspot-usage' && <div className="reportsDateRange">
                                <DatePicker ref={this._startDatePicker}
                                    dateFormat="MMM d, yyyy" 
                                    selected={startDate}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={val => this.handleChangeDate('startDate', val)}
                                /> 	&mdash;
                                <DatePicker ref={this._endDatePicker}
                                    dateFormat="MMM d, yyyy &darr;"
                                    selected={endDate}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={val => this.handleChangeDate('endDate', val)}
                                    minDate={startDate}
                                    popperPlacement="top-end"
                                />
                            </div>}
                        </div>

                        {param.page === 'people' ?
                            <People ref={this._people_component} /> :
                            (param.page === 'hotspot-usage' ?
                                <HotspotUsage startDate={startDate} endDate={endDate} renderChart={inited}/> :
                                    <div></div>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}
