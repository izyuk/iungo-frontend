import React, { Component } from 'react';
import { connect } from 'react-redux';
import { download_users } from '../reducers/background_and_logo';

import Enter from './login/enter';
import Restore from './login/restore';


import {Switch, Route, Redirect} from 'react-router-dom';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.loadData = this.loadData.bind(this);s
  }

  render() {
    return (
      <div className="loginPage">

        {/*<div className={style.list}>*/}
          {/*{(!this.state.data && !this.state.status && this.state.click) ? <Loader/> : this.state.data}*/}
            {/*<Loader/>*/}
        {/*</div>*/}
        <div className="loginWrap">
            <div className="logo">
                <img src={require('../static/images/logo.png')} alt=""/>
            </div>
            <Switch>
                <Route exact path={'/(|register)'} component={Enter}/>
                <Route exact path={'/restore'} component={Restore}/>
            </Switch>
            {/*<Enter/>*/}
            {/*<Restore/>*/}
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
