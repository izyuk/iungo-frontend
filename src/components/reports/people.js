import React, {Component} from 'react';
import Notification from "../additional/notification";
import {getHotspots, getHotspotUsers, exportHotspotUsersCSV} from "../../api/API";
import {connect} from "react-redux";

class People extends Component {
    state = {
        list: '',
        usersList: '',
        uuid: '',
        UUIDChecker: false,
        notificationText: 'Nothing to export'
    };
    token = this.props.token.token !== undefined ? this.props.token.token : localStorage.getItem('token');

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.list !== nextProps.list) return true;
        else if (this.state.usersList !== nextProps.usersList) return true;
        else if (this.state.uuid !== nextProps.uuid) return true;
        else if (this.state.UUIDChecker !== nextProps.UUIDChecker) return true;
        else if (this.state.notificationText !== nextProps.notificationText) return true;
        else return false
    }

    toggleCPSelectorActive = (e) => {
        e.currentTarget.classList.toggle("active");
    };


    getHotspotsMethodHandler = async (str) => {
        const query = getHotspots(str);
        await query.then(res => {
            const {data} = res;
            console.log(data);
            this.setState({
                list: data
            })
        });
    };

    componentDidMount() {
        this.getHotspotsMethodHandler(this.token);
    }

    setCPId = async (e, uuid, id) => {
        this.setState({
            uuid: uuid
        });
        document.getElementsByClassName('selectedPortal')[0].childNodes[0].innerText = e.currentTarget.innerText;
        this.setState({captivePortalID: e.currentTarget.getAttribute('dataid') ? e.currentTarget.getAttribute('dataid') : ''});
        const query = getHotspotUsers(this.token, uuid);
        await query.then(res => {
            const {data} = res;
            console.log(data);
            this.setState({
                usersList: data
            })
        });
    };
    exportCSV = async () => {
        if(this.state.uuid) {
            this.setState({UUIDChecker: false});
            const query = exportHotspotUsersCSV(this.token, this.state.uuid);
            await query.then(res => {
                console.log(res.headers);
                let {data} = res;
                let filename, link;
                if (data == '' || data == null) {
                    this.setState({
                        notificationText: 'Nothing to export'
                    });
                    this.setState({
                        UUIDChecker: true
                    });
                    setTimeout(() => {
                        this.setState({copied: false});
                    }, 2000)
                } else {
                    this.setState({UUIDChecker: false});
                    let csv = data;
                    if (csv == null) return;

                    filename = 'export.csv';

                    if (!csv.match(/^data:text\/csv/i)) {
                        csv = 'data:text/csv;charset=utf-8,' + csv;
                    }
                    data = encodeURI(csv);

                    link = document.createElement('a');
                    link.setAttribute('href', data);
                    link.setAttribute('download', filename);
                    link.click();
                }
            });
        } else {
            this.setState({
                notificationText: 'Choose hotspot form list'
            });
            this.setState({
                UUIDChecker: true
            });
            setTimeout(() => {
                this.setState({copied: false});
            }, 2000)
        }

    };

    render() {
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
                                <p onClick={(e) => this.setCPId(e)}>Set nothing</p>
                                {this.state.list !== '' && this.state.list.map((item, i) => {
                                    return <p onClick={(e) => this.setCPId(e, item.uuid, item.id)} key={i}
                                              dataid={item.id}>{item.name}</p>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="exportCSV">
                        <button type='button' onClick={this.exportCSV}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#BFC5D2" fillRule="nonzero" d="M17 11.1V11c0-2.8-2.2-5-5-5-2.5 0-4.6 1.8-4.9 4.3-1.8.6-3.1 2.2-3.1 4.2C4 17 6 19 8.5 19H16c2.2 0 4-1.8 4-4 0-1.9-1.3-3.4-3-3.9zM11 13v-3h2v3h3l-4 4-4-4h3z"/>
                            </svg>
                            <span>Export to CSV</span>
                        </button>
                    </div>
                </div>
                <table className={"peopleTable"} rules="rows">
                    <thead>
                    <tr>
                        {/*<th><input type="checkbox"/></th>*/}
                        <th>Email Address</th>
                        <th>First Seen</th>
                        <th>Last Seen</th>
                        <th>Visits</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.usersList !== '' && this.state.usersList.map((item, i) => {
                            return (
                                <tr key={i}>
                                    {/*<td><input type="checkbox"/></td>*/}
                                    <td>{item.email}</td>
                                    <td>{item.firstVisit}</td>
                                    <td>{item.latestVisit}</td>
                                    <td>{item.totalVisit}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                    {this.state.UUIDChecker && <Notification type={'info'} text={this.state.notificationText}/>}
                </table>
            </div>
        )
    }
}

// export default People;
export default connect(
    state => ({
        token: state.token
    }),
    dispatch => ({})
)(People)
