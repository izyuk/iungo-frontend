import React, {Component} from 'react';

import Border from './border';
import Background from './background';
import Size from './size';
import VerticalAlignment from './verticalAlignment';

class Container extends Component {
    render() {
        return (
            <div className="container">
                <Background/>
                <Size/>
                <Border/>
                <VerticalAlignment/>
            </div>
        )
    }
}

export default Container;
