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
    state = {
        currentId: '',
        loader: false,
        storageCleared: false
    };

    idHandler = (id) => {
        this.setState({
            currentId: id
        });
        localStorage.setItem('cpID', id);
        console.log(id);
    };


    loaderHandler = () => {
        this.setState({
            loader: !this.state.loader
        });
    };

    storageCleaningHandler = () => {
        localStorage.removeItem('cpID');
        this.setState({
            currentId: '',
            storageCleared: true
        });
    };

    componentDidMount() {
        this.setState({
            storageCleared: false
        });
    }

    render() {
        return (
            <div className="mainSide">
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path='/captive-portals' render={() => (
                        <CaptivePortalList setId={this.idHandler} clearing={this.storageCleaningHandler}/>
                    )}/>
                    <Route path='/captive-portals/:uuid' render={() => (
                        <CaptivePortal settedId={this.state.currentId} loaderHandler={this.loaderHandler}/>
                    )}/>
                    <Route exact path="/hotspot" component={Hotspot}/>
                    <Route exact path="/reports/people" component={Reports}/>
                </Switch>
            </div>
        )
    }
}

export default MainSide;
