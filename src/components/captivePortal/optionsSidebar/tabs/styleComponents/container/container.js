import React, {Component} from 'react';

import Border from './border';
import Background from './background';
import Size from './size';

class Container extends Component {
    render() {
        return (
            <div className="container">
                <Background/>
                <Size/>
                <Border/>
            </div>
        )
    }
}

export default Container;
