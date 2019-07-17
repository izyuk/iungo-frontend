import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class HorizontalTabs extends Component {
    state = {
        active: 'people'
    };

    static propTypes = {};

    static defaultProps = {};

    render() {
        return (
            <div className="tabsLine">
                <div className="row">
                    <div className="line">
                        <NavLink to={'/reports/hotspot-usage'} activeClassName={'active'}>
                            <span>
                                Hotspot Usage
                            </span>
                        </NavLink>
                        <NavLink to={'/reports/people'} activeClassName={'active'}>
                            <span>
                                People
                            </span>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}
