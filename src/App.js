import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Index from './components';
import Tool from './components/tool/tool'

class MainRouter extends Component {
    state = {
        unauthorized: false
    };

    componentDidMount() {
        console.log('Changed');
        console.log(!localStorage.getItem('token'));
        console.log(window.location.pathname);
        if ((window.location.pathname !== '/' || window.location.pathname !== '/restore') && !localStorage.getItem('token')) {
            this.setState({
                unauthorized: true
            })
        }
        setTimeout(() => {
            this.setState({unauthorized: false});
        }, 2000);
    }

    render() {
        return (
            <Switch>
                {this.state.unauthorized && <Redirect to={'/'}/>}
                <Route exact path="/(|register|restore)" component={Index}/>
                <Route component={Tool}/>
            </Switch>
        )
    }
}

export default MainRouter;
