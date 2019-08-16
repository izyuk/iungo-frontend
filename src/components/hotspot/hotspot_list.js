import React, {Component} from 'react';
import Notification from '../additional/notification';

import {getHotspots} from '../../api/API';
import {withRouter} from "react-router-dom";
import {dateISO} from "../../modules/dateISO";

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import '../../static/styles/ag-grid-custom.less'


class HotspotDetails extends Component {
    state = {
        incorrect: false,
        name: '',
        address: '',
        description: '',
        url: '',
        list: '',
        id: '',
        captivePortalID: '',
        portalsList: '',
        submitted: false,
        submittedType: '',

        filterText: '',
        rowData: '',

        gridOptions: {
            defaultColDef: {
                resizable: true,
                sortable: true
            },
            columnDefs: [{
                headerName: "Hotspot",
                field: "name",
            }, {
                headerName: "Captive portal",
                field: "portal.name",
            }, {
                headerName: "Address",
                field: "address",
            }, {
                headerName: "Description",
                field: "description",
            }, {
                headerName: "Updated",
                field: "updatedAt",
                valueFormatter: (data) => dateISO(data.value),
                sort: 'desc'
            }
            ]
        }

    };

    findAllHotspots = async (str) => {
        let query = getHotspots(str);
        let rows = [];
        await query.then(res => {
            let {data} = res;
            rows = data;
        });
        this.setState({
            rowData: rows
        })
    };

    componentDidMount() {
        this.findAllHotspots(localStorage.getItem('token'));
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.id !== nextState.id) return true;
        else if (this.state.name !== nextState.name) return true;
        else if (this.state.list !== nextState.list) return true;
        else if (this.state.address !== nextState.address) return true;
        else if (this.state.description !== nextState.description) return true;
        else if (this.state.portalsList !== nextState.portalsList) return true;
        else if (this.state.submitted !== nextState.submitted) return true;
        else if (this.state.submittedType !== nextState.submittedType) return true;
        else return true;
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

    viewHotspotForm = (params) => {
        localStorage.setItem('HSurl', params.data.virtualUrl);
        this.props.history.push(`/hotspot/${params.data.uuid}`);
    };

    render() {
        const colDef = {
            name: 'Static Styles',
            field: 'field1',
            cellStyle: {color: 'red', 'background-color': 'green'}
        };
        return (
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
                            <input type="text" placeholder="Filter..." value={this.state.filterText} onChange={this.onFilterTextBoxChanged} autoFocus/>
                        </div>
                    </div>
                    <AgGridReact
                        gridOptions={this.state.gridOptions}
                        rowData={this.state.rowData}
                        onRowClicked={this.viewHotspotForm}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                    >
                    </AgGridReact>

                </div>
                {this.state.submitted &&
                <Notification type={'info'}
                              text={`Hotspot settings was ${this.state.submittedType} successfully`}/>}
            </div>
        )
    }

}

export default withRouter(HotspotDetails);
