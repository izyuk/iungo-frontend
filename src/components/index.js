import React, {Component} from 'react';

import Enter from './login/enter';
import Restore from './login/restore';
import Icons from '~/static/images/icons';

import {Route, Switch} from 'react-router-dom';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="loginPage">
                <div className="loginWrap">
                    <div className="logo">
                        <Icons.Logo />
                    </div>
                    <Switch>
                        <Route exact path={'/(login|register)'} component={Enter}/>
                        <Route exact path={'/reset'} component={Restore}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Index;
