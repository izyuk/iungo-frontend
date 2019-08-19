import React, {Component} from 'react';
import Notification from "../additional/notification";
import {exportHotspotUsersCSV} from "../../api/API";
import {dateISO} from '../../modules/dateISO';

class People extends Component {
    state = {
        UUIDChecker: false,
        notificationText: 'Nothing to export'
    };
    token = localStorage.getItem('token');

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.UUIDChecker !== nextProps.UUIDChecker) ||
                (this.state.notificationText !== nextProps.notificationText);
    }

    exportCSV = async () => {
        const { uuid } = this.props;
        if (uuid) {
            this.setState({UUIDChecker: false});
            const query = exportHotspotUsersCSV(this.token, uuid);
            await query.then(res => {
                let {data} = res;
                let filename, link;
                if (data == '' || data == null) {
                    this.setState({
                        notificationText: 'Nothing to export',
                        UUIDChecker: true
                    });
                    setTimeout(() => {
                        this.setState({UUIDChecker: false});
                    }, 2000)
                } else {
                    this.setState({UUIDChecker: false});
                    let csv = data;
                    if (csv == null) return;

                    filename = res.request.getResponseHeader('Filename') ? res.request.getResponseHeader('Filename') : 'export.csv';

                    if (!csv.match(/^data:text\/csv/i)) {
                        csv = 'data:text/csv;charset=utf-8,' + csv;
                    }
                    data = encodeURI(csv);
                    link = document.createElement('a');
                    link.setAttribute('href', data);
                    link.setAttribute('download', filename);
                }
                link && link.click();
            });
        } else {
            this.setState({
                notificationText: 'Choose hotspot form list',
                UUIDChecker: true
            });
            setTimeout(() => {
                this.setState({UUIDChecker: false});
            }, 2000)
        }

    };

    render() {
        const { usersList } = this.props;
        return (
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
                        (usersList && usersList.length) ? usersList.map((item, i) => {
                            return (
                                <tr key={i}>
                                    {/*<td><input type="checkbox"/></td>*/}
                                    <td>{item.email}</td>
                                    <td>{dateISO(item.firstVisit)}</td>
                                    <td>{dateISO(item.latestVisit)}</td>
                                    <td>{item.totalVisit}</td>
                                </tr>
                            )
                        }) : <tr>
                            <td colSpan='4'>Nothing to show</td>
                        </tr>
                    }
                    </tbody>
                    {this.state.UUIDChecker && <Notification type={'info'} text={this.state.notificationText}/>}
                </table>
        )
    }
}

// export default People;
export default People;
