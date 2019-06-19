import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Dashboard from '../dashboard/dashboard';
import Hotspot from '../hotspot/hotspot';
import Reports from '../reports/reports';
import CaptivePortal from "../captivePortal/captive-portal";
import CaptivePortalList from "../captivePortal/captivePortalList";
import Profile from '../profile/profile';
import CaptivePortalContext from "../../context/project-context";


class MainSide extends Component {

    static contextType = CaptivePortalContext;

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
        if (this.context.dataToExclude.urlPath !== location.pathname) {
            this.context.urlPathHandler(location.pathname);
        }
        return (
            <div className="mainSide">
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path='/captive-portals' render={() => (
                        <CaptivePortalList setId={this.idHandler} clearing={this.storageCleaningHandler}/>
                    )}/>
                    <Route path='/captive-portals/:uuid' render={() => (
                        <CaptivePortal settedId={this.state.currentId}/>
                    )}/>
                    <Route exact path="/hotspot" component={Hotspot}/>
                    <Route exact path="/reports/people" component={Reports}/>
                    <Route exact path="/profile" component={Profile}/>
                </Switch>
            </div>
        )
    }
}

export default MainSide;
