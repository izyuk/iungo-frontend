import React, {Component} from 'react';

import Border from './border';
import Background from './background';
import Size from './size';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={this.props.style.container}>
                <Border style={this.props.style}/>
                <Background style={this.props.style}/>
                <Size style={this.props.style}/>
            </div>
        )
    }
}

export default Container;
