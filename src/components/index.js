import React, { Component } from 'react';
import { connect } from 'react-redux';
import { download_users } from '../reducers/reducer';
import { Link } from 'react-router-dom';

// import { loader } from './loader';
import Builder from './dashboard/builder';
import style from './index.less';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.loadData = this.loadData.bind(this);
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
      <div>
        <Button onClick={this.loadData}/>
          <Link to='/builder'>Builder</Link>

        {/*<div className={style.list}>*/}
          {/*{(!this.state.data && !this.state.status && this.state.click) ? <Loader/> : this.state.data}*/}
        {/*</div>*/}
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
