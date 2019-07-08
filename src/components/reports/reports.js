import React, {Component} from 'react';
import HorizontalTabs from './horizontalTabs';
import People from './people';
import PortalUsage from './portal-usage';

export default class Reports extends Component {
    state = {};

    static propTypes = {};

    static defaultProps = {};

    render() {
        console.log(this.props.match.params);
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
                        (param.page === 'portal-usage' ?
                            <PortalUsage/> :
                                <div></div>)
                    }
                </div>
            </div>
        )
    }
}
