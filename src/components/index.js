import React, { Component } from 'react';
import { connect } from 'react-redux';
import { download_users } from '../reducers/background_and_logo';

import Enter from './login/enter';
import Restore from './login/restore';


import {Switch, Route} from 'react-router-dom';

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
                <img src={require('../static/images/logo.png')} alt=""/>
            </div>
            <Switch>
                <Route exact path={'/(|register)'} component={Enter}/>
                <Route exact path={'/reset'} component={Restore}/>
            </Switch>
        </div>
      </div>
    );
  }
}

export const Button = props => {
  return (
    <button type='button' onClick={props.onClick}>Press me</button>
  );
};

export default connect(
  state => ({
  }),
  dispatch => ({})
)(Index);
