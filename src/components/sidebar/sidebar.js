import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';

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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#BFC5D2" fillRule="nonzero"
                              d="M16 4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 11H9v-2h6v2zm0-4H9V9h6v2z"/>
                    </svg>
                    <span>
                        Captive Portals
                    </span>
                </NavLink>
                <NavLink to="/hotspot" activeClassName='active' data-cy='linkHotspots'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" enableBackground="new 0 0 26 26" width="512px" height="512px">
                        <g fill="#BFC5D2" fillRule="nonzero">
                            <path
                                d="M25.7,8.3C22.4,5,18,3,13,3S3.5,5,0.3,8.3C0.1,8.5,0,8.7,0,9c0,0.3,0.1,0.5,0.3,0.7l1.4,1.4c0.4,0.4,1,0.4,1.4,0   C5.6,8.6,9.1,7,13,7s7.4,1.6,9.9,4.1c0.4,0.4,1,0.4,1.4,0l1.4-1.4C25.9,9.5,26,9.3,26,9S25.9,8.4,25.7,8.3z"
                                fill="#BFC5D2"/>
                            <path
                                d="m13,11c-2.8,0-5.2,1.1-7,2.9-0.4,0.4-0.4,1 0,1.4l1.4,1.4c0.4,0.4 1,0.4 1.4,0 1.1-1.1 2.6-1.7 4.2-1.7 1.6,0 3.1,0.7 4.2,1.7 0.4,0.4 1,0.4 1.4,0l1.4-1.4c0.4-0.4 0.4-1 0-1.4-1.8-1.8-4.2-2.9-7-2.9z"
                                fill="#BFC5D2"/>
                            <circle cx="13" cy="21" r="2" fill="#BFC5D2"/>
                        </g>
                    </svg>
                    <span>
                        Hotspots
                    </span>
                </NavLink>
                <NavLink to="/reports/" isActive={this.pageEvent} activeClassName='active' data-cy='linkReports'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g fill="#BFC5D2" fillRule="nonzero">
                            <path
                                d="M12 4l-5 6h3v9c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-9h3l-5-6zM7 15H5c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-3c0-.6-.4-1-1-1z"/>
                            <path d="M19 12h-2c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1z"/>
                        </g>
                    </svg>
                    <span>
                        Reports
                    </span>
                </NavLink>
                <NavLink to="/settings" activeClassName='active' data-cy='linkSettings'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g fill="#BFC5D2" fillRule="nonzero">
                        <path d="M13.3,5.2 L14.4,3.1 L13,1.7 L10.9,2.8 C10.6,2.6 10.2,2.5 9.8,2.4 L9,0 L7,0 L6.2,2.3 C5.9,2.4 5.5,2.5 5.2,2.7 L3.1,1.6 L1.6,3.1 L2.7,5.2 C2.5,5.5 2.4,5.9 2.3,6.2 L0,7 L0,9 L2.3,9.8 C2.4,10.2 2.6,10.5 2.7,10.9 L1.6,13 L3,14.4 L5.1,13.3 C5.4,13.5 5.8,13.6 6.2,13.7 L7,16 L9,16 L9.8,13.7 C10.2,13.6 10.5,13.4 10.9,13.3 L13,14.4 L14.4,13 L13.3,10.9 C13.5,10.6 13.6,10.2 13.7,9.8 L16,9 L16,7 L13.7,6.2 C13.6,5.9 13.5,5.5 13.3,5.2 Z M8,11 C6.3,11 5,9.7 5,8 C5,6.3 6.3,5 8,5 C9.7,5 11,6.3 11,8 C11,9.7 9.7,11 8,11 Z" id="Shape"></path>
                        </g>
                    </svg>
                    <span>
                        Settings
                    </span>
                </NavLink>
            </nav>
        )
    }
}

export default withRouter(Sidebar);
