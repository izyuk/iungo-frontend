import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../dashboard/dashboard';
import CaptivePortalWrap from '../captivePortal/captivePortalWrap';
import Hotspot from '../hotspot/hotspot';

class MainSide extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div className="mainSide">
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/captive-portals" component={CaptivePortalWrap}/>
                    <Route exact path="/hotspot" component={Hotspot}/>
                </Switch>
            </div>
        )
    }
}

export default MainSide;
