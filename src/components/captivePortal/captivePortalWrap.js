import React, {Component} from 'react';
import {connect} from 'react-redux';

import CaptivePortal from './captive-portal';
import CaptivePortalList from './captivePortalList';

export default class CaptivePortalWrap extends Component {
    state = {
        currentId: ''
    };

    idHandler = (id) => {
        this.setState({
            currentId: id
        });
        localStorage.setItem('cpID', id);
        console.log(id);
    };

    render(){
        return(
            <div className={this.state.currentId !== '' ? "container" : "container containerFix"}>
                {
                    this.state.currentId === '' ?
                        <CaptivePortalList setId={this.idHandler}/> :
                        <CaptivePortal settedId={this.state.currentId}/>
                }
            </div>
        )
    }
}
