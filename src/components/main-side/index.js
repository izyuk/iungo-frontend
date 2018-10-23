import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import style from './main-side.less';
import Dashboard from '../dashboard/dashboard';
import CaptivePortal from '../captivePortal/captive-portal';

class MainSide extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div className={style.mainSide}>
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/captive-portals" component={CaptivePortal}/>
                </Switch>
            </div>
        )
    }
}

export default MainSide;
