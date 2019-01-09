import React, {Component} from 'react';
import HotspotDetails from './hotspot_details';

export default class Hotspot extends Component {
    state = {};

    static propTypes = {};

    static defaultProps = {};

    render() {
        return (
            <div className="container containerFix">
                <div className="wrap wrapFix2">
                    <div className="info">
                        <h3>Hotspot Settings</h3>
                    </div>
                    <HotspotDetails/>
                </div>
            </div>
        )
    }
}
