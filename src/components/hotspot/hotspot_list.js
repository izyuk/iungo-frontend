import React, {Component} from 'react';
import HotspotTable from './hotspotTable';
import Notification from '../additional/notification';

import {getHotspots} from '../../api/API';
import {Route, withRouter} from "react-router-dom";
import {dateISO} from "../../modules/dateISO";

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


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
                headerName: "Name",
                field: "name",
                filter: "agTextColumnFilter",
            }, {
                headerName: "Portal name",
                field: "portal.name",
            }, {
                headerName: "Address",
                field: "address",
            }, {
                headerName: "Description",
                field: "description",
            }, {
                headerName: "Login URL",
                field: "virtualUrl",
                sortable: false
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
        let listArray = [];
        let rows = [];
        await query.then(res => {
            let {data} = res;
            rows = res.data;
            data.map((item, i) => {
                console.log(item);
                listArray.push(
                    <Route key={i} render={({history}) => (
                        <tr dataid={item.id}
                            datauuid={item.uuid}
                            onClick={(e) => {
                                localStorage.setItem('HSurl', item.virtualUrl);
                                history.push(`/hotspot/${item.uuid}`)
                            }}>
                            <td>{item.name}</td>
                            <td>{item.portal ? item.portal.name : ''}</td>
                            <td>{item.address}</td>
                            <td>{item.description}</td>
                            <td className={"url"}>
                                {item.virtualUrl !== null ?
                                    <a href={`${item.virtualUrl}`}
                                       onClick={this.copyToClipboard}
                                    >
                                        {item.virtualUrl}
                                    </a>
                                    : ''
                                }
                            </td>
                            <td>{dateISO(item.updatedAt)}</td>
                        </tr>
                    )}/>
                )
            });
        });
        this.setState({
            list: listArray,
            rowData: rows
        })
    };

    componentDidMount() {
        this.findAllHotspots(localStorage.getItem('token'));
    }


    editHandler = (HSid, HSname, HSaddress, HSdescription, portalID) => {
        const data = {id: HSid, name: HSname, address: HSaddress, description: HSdescription};
        Object.keys(data).map((el) => {
            this.setState({
                [el]: data[el]
            });
        });
        if (portalID) {
            let portalsList = this.state.portalsList;
            const {[0]: {id, name}} = portalsList.filter(el => {
                if (el.id === portalID) {
                    console.log(el);
                    return el;
                }
            });
            document.getElementsByClassName('selectedPortal')[0].innerText = name;
            this.setState({captivePortalID: id});
        } else {
            document.getElementsByClassName('selectedPortal')[0].innerText = 'Select Captive Portal';
            this.setState({captivePortalID: ''});

        }
    };

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
        this.setState({filterText: event.target.value})
        this.gridApi.setQuickFilter(event.target.value);
    }

    viewHotspotForm = (params) => {
        console.log('click', params.data.uuid);
        //localStorage.setItem('HSurl', params.data.virtualUrl);
        //createHistory.push(`/hotspot/${params.data.uuid}`);
        this.props.history.push(`/hotspot/${params.data.uuid}`);
    }

    render() {
        console.log('Row data', this.state.rowData);
        return (
            <div>
                {/*<div className="contentWrapWithTopBorder">*/}
                    <div>
                        Filter: <input type="text" placeholder="Filter..." value={this.state.filterText}
                                       onChange={this.onFilterTextBoxChanged}/>
                    </div>
                    <div
                        className="ag-theme-material"
                        style={{
                            height: '100%',
                            width: '100%'
                        }}
                    >
                        <AgGridReact
                            gridOptions={this.state.gridOptions}
                            rowData={this.state.rowData}
                            onRowClicked={this.viewHotspotForm}
                            pagination
                            paginationPageSize={10}
                            onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                        >
                        </AgGridReact>

                    </div>
                    <div className="contentWrapWithTopBorder">
                        <HotspotTable
                            hotspotList={this.state.list !== '' ? this.state.list : false}
                            virtualUrl={this.state.url}
                            editHandler={this.editHandler}
                        />
                    </div>
                    {this.state.submitted &&
                    <Notification type={'info'}
                                  text={`Hotspot settings was ${this.state.submittedType} successfully`}/>}
                {/*</div>*/}
            </div>
        )
    }

}

export default withRouter(HotspotDetails);
