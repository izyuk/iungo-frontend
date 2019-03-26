import React, {Component} from 'react';
import {Switch, Route, Router} from 'react-router-dom';

import Dashboard from '../dashboard/dashboard';
import CaptivePortalWrap from '../captivePortal/captivePortalWrap';
import Hotspot from '../hotspot/hotspot';
import Reports from '../reports/reports';
import People from "../reports/people";
import CaptivePortal from "../captivePortal/captive-portal";
import CaptivePortalList from "../captivePortal/captivePortalList";

// import createBrowserHistory from "history/createBrowserHistory";
//
// const history = createBrowserHistory();


class MainSide extends Component {
    state = {};

    render() {
        return (
            <div className="mainSide">
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/captive-portals" component={CaptivePortalWrap}/>
                    <Route exact path="/hotspot" component={Hotspot}/>
                    <Route exact path="/reports/people" component={Reports}/>
                </Switch>
            </div>
        )
    }
}

export default MainSide;
