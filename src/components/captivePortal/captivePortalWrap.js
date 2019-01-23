import React, {Component} from 'react';
import {connect} from 'react-redux';

import CaptivePortal from './captive-portal';
import CaptivePortalList from './captivePortalList';
import Loader from "../../loader";

export default class CaptivePortalWrap extends Component {
    state = {
        currentId: '',
        loader: false
    };

    idHandler = (id) => {
        this.setState({
            currentId: id
        });
        localStorage.setItem('cpID', id);
        console.log(id);
    };


    loaderHandler = () => {
        this.setState({
            loader: !this.state.loader
        });
    };

    render(){
        return(
            <div className={this.state.currentId !== '' ? "container" : "container containerFix"}>
                {this.state.loader && <Loader/>}
                {
                    this.state.currentId === '' ?
                        <CaptivePortalList setId={this.idHandler}/> :
                        <CaptivePortal settedId={this.state.currentId}
                                       loaderHandler={this.loaderHandler}/>
                }
            </div>
        )
    }
}
