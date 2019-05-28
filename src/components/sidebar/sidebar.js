import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <nav className={this.props.status ? 'sidebar opened' : 'sidebar'}>
                <NavLink to="/captive-portals" activeClassName='active'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#BFC5D2" fillRule="nonzero"
                              d="M16 4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 11H9v-2h6v2zm0-4H9V9h6v2z"/>
                    </svg>
                    <span>
                        Captive Portals
                    </span>
                </NavLink>
                <NavLink to="/hotspot" activeClassName='active'>
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
                <NavLink to="/reports/people" activeClassName='active'>
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
            </nav>
        )
    }
}

export default Sidebar;
