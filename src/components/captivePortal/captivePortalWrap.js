import React, {Component} from 'react';
import {connect} from 'react-redux';

import CaptivePortal from './captive-portal';
import CaptivePortalList from './captivePortalList';

export default class CaptivePortalWrap extends Component {
    state = {};

    render(){
        return(
            <div>
                <CaptivePortalList/>
            </div>
        )
    }
}
