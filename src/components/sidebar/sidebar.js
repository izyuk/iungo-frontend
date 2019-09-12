import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import Icons from '~/static/images/icons';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    pageEvent = (match, location) => {
        if (!match) {
            return false
        }
        console.log('pageEvent props', this.props);
        if(window.location.pathname === '/reports/') 
            this.props.history.replace('/reports/hotspot-usage');
        const eventID = location.pathname.split('/');
        return eventID.indexOf('reports');
    };

    render() {
        return (
            <nav className={this.props.status ? 'sidebar opened' : 'sidebar'}>
                <NavLink to="/captive-portals" activeClassName='active' data-cy='linkCP'>
                    <Icons.CaptivePortalIcon />
                    <span>
                        Captive Portals
                    </span>
                </NavLink>
                <NavLink to="/hotspot" activeClassName='active' data-cy='linkHotspots'>
                    <Icons.HotspotsIcon />
                    <span>
                        Hotspots
                    </span>
                </NavLink>
                <NavLink to="/reports/" isActive={this.pageEvent} activeClassName='active' data-cy='linkReports'>
                    <Icons.ReportsIcon />
                    <span>
                        Reports
                    </span>
                </NavLink>
                <NavLink to="/settings" activeClassName='active' data-cy='linkSettings'>
                    <Icons.SettingsIcon />
                    <span>
                        Settings
                    </span>
                </NavLink>
            </nav>
        )
    }
}

export default withRouter(Sidebar);
