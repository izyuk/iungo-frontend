import React, {Component} from 'react';
import {getAllPortals} from "../../api/API";
import {dateISO} from '../../modules/dateISO';
import Loader from "../../loader";
import {Link, Redirect} from "react-router-dom";
import CaptivePortalContext from "../../context/project-context";
import {AgGridReact} from "ag-grid-react";

class CaptivePortalList extends Component {

    static contextType = CaptivePortalContext;

    state = {
        // list: '',
        cleared: false,

        filterText: '',
        rowData: '',

        gridOptions: {
            defaultColDef: {
                resizable: true,
                sortable: true
            },
            columnDefs: [{
                headerName: "Name",
                field: "name",
                filter: "agTextColumnFilter",
            }, {
                headerName: "Created",
                valueFormatter: (data) => dateISO(data.value),
                field: "createdAt"
            }, {
                headerName: "Updated",
                field: "updatedAt",
                valueFormatter: (data) => dateISO(data.value),
                sort: 'desc'
            }]
        }
    };

    findAllPortals = async (data) => {
        let query = getAllPortals(data);
        let rows = [];
        await query.then(res => {
            let {data} = res;
            console.log(data);
            rows = data;
        });
        this.setState({
            rowData: rows
        })
    };

    onFirstDataRendered(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    }

    onFilterTextBoxChanged = (event) => {
        this.setState({filterText: event.target.value});
        this.gridApi.setQuickFilter(event.target.value);
    };

    viewCP = (params) => {
        console.log('click', params.data.uuid);
        localStorage.setItem('cpID', params.data.id);
        console.log(this.props);
        this.props.history.push(`/captive-portals/${params.data.uuid}`);
    };

    addNewCP = async () => {
        const STYLE = document.getElementsByTagName('STYLE')[0];
        if (STYLE) STYLE.parentNode.removeChild(STYLE);
        this.context.resetGlobalState();
        // this.props.history.push(`/captive-portals/${params.data.uuid}`);
        localStorage.removeItem('cpID');
        localStorage.removeItem('templateID');
    };

    componentDidMount() {
        console.log('TOKEN: ', localStorage.getItem('token'));
        const STYLE = document.getElementsByTagName('STYLE')[0];
        if (STYLE) STYLE.parentNode.removeChild(STYLE);
        this.findAllPortals(localStorage.getItem('token'));
        this.addNewCP();
        this.context.resetGlobalState();
        console.log(this.context);
        localStorage.setItem('from', 'cp-list');
    }

    render() {
        return (
            this.state.cleared ? <Redirect to='/captive-portal'/> :
                <div className="container containerFix">
                    <div className="wrap wrapFix2">
                        <div className="info">
                            <h3>Captive Portals</h3>
                            <Link className={"addNewCPButton"} to={`/captive-portals/templates`}>Get started</Link>
                        </div>
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
                                        <input type="text" placeholder="Filter..." value={this.state.filterText} onChange={this.onFilterTextBoxChanged}/>
                                    </div>
                                </div>
                                <AgGridReact
                                    gridOptions={this.state.gridOptions}
                                    rowData={this.state.rowData}
                                    onRowClicked={this.viewCP}
                                    onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                                >
                                </AgGridReact>

                            </div>
                        </div>
                    </div>
                    {this.state.rowData === '' && <Loader/>}
                </div>
        )
    }
}

export default CaptivePortalList;
