import React, {Component} from 'react';
import {withRouter, Redirect, Route, Switch} from 'react-router-dom';

import Index from './components';
import Tool from './components/tool/tool'
import GlobalCaptivePortalState from "./context/GlobalCaptivePortalState";

class MainRouter extends Component {

    render() {
        const authorized = Boolean(localStorage.getItem('token'));
        return (
            <GlobalCaptivePortalState>
                <Switch>
                    <Redirect exact from="/" to={authorized ? '/captive-portals' : '/login'} />
                    <Route exact path="/(login|register|reset)" component={Index}/>
                    <Route component={Tool}/>
                </Switch>
            </GlobalCaptivePortalState>
        )
    }
}

export default withRouter(MainRouter);
