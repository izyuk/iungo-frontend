import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Index from './components';
import Tool from './components/tool/tool'

class MainRouter extends Component {
    state = {
        unauthorized: false
    };

    componentDidMount() {
        if (!localStorage.getItem('token') && (window.location.pathname !== '/') && (window.location.pathname !== '/restore')) {
            this.setState({
                unauthorized: true
            })
        }
        setTimeout(() => {
            this.setState({unauthorized: false});
        });


    }

    render() {
        return (
            <Switch>
                {this.state.unauthorized && <Redirect to={'/'}/>}
                <Route exact path="/(|register|reset)" component={Index}/>
                <Route component={Tool}/>
            </Switch>
        )
    }
}

export default MainRouter;
