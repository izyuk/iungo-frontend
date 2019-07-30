import React, {Component} from 'react';
import HotspotDetails from './hotspot_list';
import {Link} from "react-router-dom";

export default class Hotspot extends Component {
    render() {
        return (
            <div className="container containerFix">
                <div className="wrap wrapFix2">
                    <div className="info">
                        <h3>Hotspots</h3>
                        <Link className={"addNewCPButton"} to={`/hotspot/new`}>Create new hotspot</Link>
                    </div>
                    <HotspotDetails/>
                </div>
            </div>
        )
    }
}
