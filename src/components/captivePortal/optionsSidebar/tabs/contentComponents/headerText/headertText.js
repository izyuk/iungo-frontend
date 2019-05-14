import React, {Component} from 'react';
import HeaderTop from './headerTop'
import HeaderDescription from './headerDescription'

class HeaderText extends Component {
    state = {
        top: '',
        description: ''
    };

    render() {
        return (
            <div className="container">
                <HeaderTop/>
                <HeaderDescription/>
            </div>
        )
    }
}

export default HeaderText;
