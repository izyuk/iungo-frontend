import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './components';
import Builder from './components/builder/builder';

class MainRouter extends Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Index}/>
        <Route exact path="/builder" component={Builder}/>
      </Switch>
    )
  }
}

export default MainRouter;
