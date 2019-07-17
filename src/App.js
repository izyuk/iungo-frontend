import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import Index from './components';
import Tool from './components/tool/tool'
import GlobalCaptivePortalState from "./context/GlobalCaptivePortalState";

class MainRouter extends Component {
    state = {
        unauthorized: false
    };

    componentDidMount() {
        if (!localStorage.getItem('token') && (window.location.pathname !== '/') && (window.location.pathname !== '/reset')) {
            console.log('here');
            this.setState({
                unauthorized: true
            });
        }
        setTimeout(() => {
            this.setState({unauthorized: false});
        });


    }

    render() {
        return (
            <GlobalCaptivePortalState>
                <Switch>
                    {this.state.unauthorized && <Redirect to={'/'}/>}
                    <Route exact path="/(|register|reset)" component={Index}/>
                    <Route component={Tool}/>
                </Switch>
            </GlobalCaptivePortalState>
        )
    }
}

export default MainRouter;
