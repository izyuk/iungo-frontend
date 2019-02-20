import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Index from './components';
import Tool from './components/tool/tool';

class MainRouter extends Component {
    state = {
        unauthorized: false
    };

    componentDidMount() {
        console.log(!localStorage.getItem('token'));
        if (window.location.pathname !== '/' && !localStorage.getItem('token')) {
            this.setState({
                unauthorized: true
            })
        }
        setTimeout(() => {
            this.setState({unauthorized: false});
        }, 2000)

    }

    render() {
        return (
            <Switch>
                {this.state.unauthorized && <Redirect to={'/'}/>}
                <Route exact path="/(|register)" component={Index}/>
                <Route component={Tool}/>
            </Switch>
        )
    }
}

export default MainRouter;
