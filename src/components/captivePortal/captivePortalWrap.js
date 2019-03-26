import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import CaptivePortal from './captive-portal';
import CaptivePortalList from './captivePortalList';
import Loader from "../../loader";

export default class CaptivePortalWrap extends Component {
    state = {
        // currentId: '',
        currentId: '',
        loader: false,
        // storageCleared: false
        storageCleared: false
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

    storageCleaningHandler = () => {
        localStorage.removeItem('cpID');
        this.setState({
            currentId: '',
            storageCleared: true
        });
    };

    componentDidMount() {
        this.setState({
            storageCleared: false
        });
    }

    render() {
        return (
            <div className={"container"}>
                <Switch>
                    <Route path='/captive-portals/:uuid' render={() => (
                        <CaptivePortal settedId={this.state.currentId} loaderHandler={this.loaderHandler}/>
                    )}/>
                    <Route exact path='/captive-portals' render={() => (
                        <CaptivePortalList setId={this.idHandler} clearing={this.storageCleaningHandler}/>
                    )}/>
                </Switch>
                {/*{*/}
                {/*// (this.state.currentId !== '' || this.state.storageCleared) ?*/}
                {/*<CaptivePortal settedId={this.state.currentId}*/}
                {/*loaderHandler={this.loaderHandler}/>:*/}
                {/*<CaptivePortalList setId={this.idHandler}*/}
                                   {/*clearing={this.storageCleaningHandler}/>*/}

                {/*}*/}
                {this.state.loader && <Loader/>}
            </div>
        )
    }
}
