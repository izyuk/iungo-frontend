import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Dashboard from '../dashboard/dashboard';
import Hotspot from '../hotspot/hotspot';
import Reports from '../reports/reports';
import CaptivePortal from "../captivePortal/captive-portal";
import CaptivePortalTemplates from "../captivePortal/captive-portal-templates";
import CaptivePortalList from "../captivePortal/captivePortalList";
import Profile from '../profile/profile';
import CaptivePortalContext from "../../context/project-context";
import HotspotEditor from "../hotspot/hotspotEditor";
import Settings from '../settings/settings';


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
        if(location.pathname === '/profile') {
            document.querySelector('.mainSide').style.overflowY = 'auto';
        } else {
            document.querySelector('.mainSide').removeAttribute('style');
        }
        if (this.context.dataToExclude.urlPath !== location.pathname) {
            this.context.urlPathHandler(location.pathname);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(location.pathname.includes('/settings')) {
            document.querySelector('.mainSide').style.overflowY = 'auto';
        } else {
            document.querySelector('.mainSide').removeAttribute('style');
        }
    }

    render() {
        return (
            <div className="mainSide">
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path='/captive-portals' render={(props) => (
                        <CaptivePortalList {...props} setId={this.idHandler} clearing={this.storageCleaningHandler}/>
                    )}/>
                    <Route exact path='/captive-portals/templates' render={() => (
                        <CaptivePortalTemplates />
                    )}/>
                    <Route path='/captive-portals/:uuid' render={(props) => (
                        <CaptivePortal settedId={this.state.currentId} {...props}/>
                    )}/>
                    <Route exact path="/hotspot" component={Hotspot}/>
                    <Route exact path="/hotspot/:uuid" component={HotspotEditor}/>
                    <Route exact path="/reports/:page" component={Reports}/>
                    <Route exact path="/settings/:page" component={Settings}/>
                    {/* <Route exact path="/profile" component={Profile}/> */}
                </Switch>
            </div>
        )
    }
}

export default MainSide;
