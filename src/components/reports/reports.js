import React, {Component} from 'react';
import HorizontalTabs from './horizontalTabs';
import People from './people';
import HotspotUsage from './hotspot-usage';

export default class Reports extends Component {
    state = {};

    static propTypes = {};

    static defaultProps = {};

    render() {
        const param = this.props.match.params;

        return (
            <div className="container containerFix">
                <div className="wrap wrapFix2">
                    <div className="info">
                        <h3>Reports</h3>
                    </div>
                    <HorizontalTabs/>
                    {param.page === 'people' ?
                        <People/> :
                        (param.page === 'hotspot-usage' ?
                            <HotspotUsage/> :
                                <div></div>)
                    }
                </div>
            </div>
        )
    }
}
