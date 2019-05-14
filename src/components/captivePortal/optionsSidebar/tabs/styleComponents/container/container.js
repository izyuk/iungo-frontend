import React, {Component} from 'react';

import Border from './border';
import Background from './background';
import Size from './size';
import CaptivePortalContext from "../../../../../../context/captive-portal-context";

class Container extends Component {
    render() {
        return (
            <div className="container">
                <Border/>
                <Background/>
                <Size/>
            </div>
        )
    }
}

export default Container;
