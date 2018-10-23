import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './components';
import Tool from './components/tool/tool';
import Dashdoard from './components/dashboard/dashboard';

class MainRouter extends Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Index}/>
        <Route component={Tool}/>
      </Switch>
    )
  }
}

export default MainRouter;
