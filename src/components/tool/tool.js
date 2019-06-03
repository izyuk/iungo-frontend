import React, {Component} from 'react';

import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';
import MainSide from '../main-side/index';

class Tool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebar: true
        };
    }

    sidebarStatus = () => {
        this.setState({
            sidebar: !this.state.sidebar
        })
    };

    render() {
        return (
            <div>
                <Header sidebarStatus={this.sidebarStatus}/>
                <div className={'mainContent'}>
                    <Sidebar status={this.state.sidebar}/>
                    <MainSide/>
                </div>
            </div>
        );
    }
}

export default Tool;
