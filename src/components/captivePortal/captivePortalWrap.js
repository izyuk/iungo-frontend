import React, {Component} from 'react';
import {connect} from 'react-redux';

import CaptivePortal from './captive-portal';
import CaptivePortalList from './captivePortalList';
import Loader from "../../loader";

export default class CaptivePortalWrap extends Component {
    state = {
        currentId: '',
        loader: false,
        storageCleared: false
    };

    idHandler = (id) => {
        this.setState({
            currentId: id
        });
        localStorage.setItem('cpID', id);
    };


    loaderHandler = () => {
        this.setState({
            loader: !this.state.loader
        });
    };

    storageCleaningHandler = () => {
        // this.setState(prevState => ({
        //     storageCleared: !prevState.storageCleared
        // }))
    };

    render() {
        return (
            <div className={this.state.currentId !== '' ? "container" : "container containerFix"}>
                {this.state.loader && <Loader/>}
                {
                    (this.state.currentId !== '' || this.state.storageCleared) ?
                        <CaptivePortal settedId={this.state.currentId}
                                       loaderHandler={this.loaderHandler}/>:
                        <CaptivePortalList setId={this.idHandler}
                                           clearing={this.storageCleaningHandler}/>

                }
            </div>
        )
    }
}
