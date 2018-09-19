import React, { Component } from 'react';

class Builder extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render() {
    console.log(this.props.list);
    return (
      <div className="user"></div>
    );
  }
}

export default Builder;
