import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import HorizontalTabs from './horizontalTabs';
import People from './people';

export default class Reports extends Component {
    state = {};

    static propTypes = {};

    static defaultProps = {};

    render() {
        return (
            <div className="container containerFix">
                <div className="wrap wrapFix2">
                    <div className="info">
                        <h3>Reports</h3>
                    </div>
                    <HorizontalTabs/>
                    <People/>
                </div>
            </div>
        )
    }
}
