import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import style from './sidebar.less';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <nav className={[style.sidebar, this.props.status ? style.opened : '' ].join(' ')}>
                <NavLink to="/dashboard" activeClassName={style.active}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g fill="#BFC5D2" fillRule="nonzero">
                            <path d="M11 6c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7h-7V6z"/>
                            <path d="M13 4v7h7c0-3.9-3.1-7-7-7z"/>
                        </g>
                    </svg>
                    <span>
                        Dashboard
                    </span>
                </NavLink>
                <NavLink to="/captive-portals" activeClassName={style.active}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#BFC5D2" fillRule="nonzero"
                              d="M16 4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 11H9v-2h6v2zm0-4H9V9h6v2z"/>
                    </svg>
                    <span>
                        Captive Portals
                    </span>
                </NavLink>
                <NavLink to="/campaigns" activeClassName={style.active}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#BFC5D2" fillRule="nonzero"
                              d="M7.5 8C5.6 8 4 9.6 4 11.5S5.6 15 7.5 15h.1l2.6 4.3c.4.7 1.3.9 2.1.5.7-.4.9-1.3.5-2.1L11.1 15H13l7 4V4l-7 4H7.5z"/>
                    </svg>
                    <span>
                        Campaigns
                    </span>
                </NavLink>
                <NavLink to="/reports" activeClassName={style.active}>
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
