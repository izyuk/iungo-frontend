import React, {Component} from 'react';
import Notification from "../additional/notification";
import {exportHotspotUsersCSV, getHotspotUsers} from "../../api/API";
import {dateISO} from '../../modules/dateISO';
import {withRouter} from "react-router-dom";
import {AgGridReact} from "ag-grid-react";

class People extends Component {
    state = {
        rowData: [],
        UUIDChecker: false,
        notificationText: 'Nothing to export',
        filterText: '',
        gridOptions: {
            defaultColDef: {
                resizable: true,
                sortable: true
            },
            columnDefs: [{
                headerName: "Email Address",
                field: "email",
                filter: "agTextColumnFilter",
            }, {
                headerName: "First Seen",
                valueFormatter: (data) => dateISO(data.value),
                field: "firstVisit"
            }, {
                headerName: "Last Seen",
                field: "latestVisit",
                valueFormatter: (data) => dateISO(data.value),
                sort: 'desc'
            }, {
                headerName: "Visits",
                field: "totalVisit",
            }]
        }
    };
    token = localStorage.getItem('token');

    componentDidMount() {
        if (this.props.match.params.uuid) {
            this.getUserList(this.props.match.params.uuid);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.uuid !== this.props.match.params.uuid) {
            this.getUserList(nextProps.match.params.uuid);
        }
    }

    getUserList = async (uuid) => {
        const query = getHotspotUsers(this.token, uuid);
        let rows = [];
        await query.then(res => {
            const {data} = res;
            rows = data;
        });
        this.setState({
            rowData: rows
        })
    };

    exportCSV = async () => {
        const uuid = this.props.match.params.uuid;
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

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.state.rowData !== nextState.rowData);
    }

    onFirstDataRendered(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    }

    onFilterTextBoxChanged = (event) => {
        this.setState({filterText: event.target.value});
        this.gridApi.setQuickFilter(event.target.value);
    };

    render() {
        console.log(this.state.rowData);
        return (
            <React.Fragment>
                <div className="contentWrapWithTopBorder">
                    <div
                        className="ag-theme-material"
                        style={{
                            width: '100%',
                            height: 'calc(100% - 70px)'
                        }}>
                        <div className={'filterRow'}>
                            Filter:
                            <div>
                                <input type="text" placeholder="Filter..." value={this.state.filterText}
                                       onChange={this.onFilterTextBoxChanged} autoFocus/>
                            </div>
                        </div>
                        <AgGridReact
                            gridOptions={this.state.gridOptions}
                            rowData={this.state.rowData}
                            onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                        >
                        </AgGridReact>
                        {this.state.UUIDChecker && <Notification type={'info'} text={this.state.notificationText}/>}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const withRouterAndRef = (WrappedComponent) => {
    class InnerComponentWithRef extends React.Component {
        render() {
            const {forwardRef, ...rest} = this.props;
            return <WrappedComponent {...rest} ref={forwardRef}/>;
        }
    }

    const ComponentWithRouter = withRouter(InnerComponentWithRef, {withRef: true});
    return React.forwardRef((props, ref) => {
        return <ComponentWithRouter {...props} forwardRef={ref}/>;
    });
};
export default withRouterAndRef(People);
