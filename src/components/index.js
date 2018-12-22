import React, { Component } from 'react';
import { connect } from 'react-redux';
import { download_users } from '../reducers/background_and_logo';

import Enter from './login/enter';

import style from './index.less';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.loadData = this.loadData.bind(this);s
  }

  // componentDidMount() {
  //   this.props.downloadUsers();
  // }
  //
  // loadData() {
  //   this.setState({
  //     click: true
  //   });
  //   let list = this.props.users.users;
  //   console.log(list);
  //   let arr = [];
  //   list.map((item, i) => {
  //     arr.push(
  //       <div key={i}>
  //         <p>Name: {item.name}</p>
  //         <p>UserName: {item.username}</p>
  //         <p>Phone: {item.phone}</p>
  //       </div>
  //     );
  //   });
  //   Promise.resolve()
  //     .then(() => {
  //       this.setState({
  //         data: arr
  //       });
  //     })
  //     .then(() => {
  //       this.setState({
  //         status: true,
  //         click: false
  //       });
  //     });
  //
  // }


  render() {
    return (
      <div className={style.loginPage}>

        {/*<div className={style.list}>*/}
          {/*{(!this.state.data && !this.state.status && this.state.click) ? <Loader/> : this.state.data}*/}
            {/*<Loader/>*/}
        {/*</div>*/}
        <div className={style.loginWrap}>
            <div className={style.logo}>
                <img src={require('../static/images/logo.png')} alt=""/>
            </div>
            <Enter/>
        </div>
      </div>
    );
  }
}

export const Loader = () => {
  return (
    <div className={style.loader}>
      <span></span>
    </div>
  );
};

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
