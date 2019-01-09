import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../dashboard/dashboard';
import CaptivePortal from '../captivePortal/captive-portal';
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
                    <Route exact path="/captive-portals" component={CaptivePortal}/>
                    <Route exact path="/hotspot" component={Hotspot}/>
                </Switch>
            </div>
        )
    }
}

export default MainSide;
