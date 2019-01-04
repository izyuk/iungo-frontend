import React, {Component} from 'react';
import { connect } from 'react-redux';

import Border from './border';
import Background from './background';
import Size from './size';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            border : this.props.container_border || {

            },
            background : this.props.container_background || {

            },
            size : this.props.container_size || {

            },
        };
        this.border = this.border.bind(this);
        this.background = this.background.bind(this);
        this.size = this.size.bind(this);
    }

    border(data){
        this.setState({
            border: data
        })
    }

    background(data){
        this.setState({
            background: data
        })
    }

    size(data){
        this.setState({
            size: data
        })
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.state.border !== nextState.border){
            return true;
        } else if (this.state.background !== nextState.background){
            return true;
        } else if (this.state.size !== nextState.size){
            return true;
        } else
            return false;
    }
    componentDidMount(){
        this.props.handler(this.state);
    }

    componentDidUpdate(){
       this.props.handler(this.state);
    }

    render() {
        return (
            <div className={this.props.style.container}>
                <Border style={this.props.style} handler={this.border}/>
                <Background style={this.props.style} handler={this.background}/>
                <Size style={this.props.style} handler={this.size}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        container_border: state.container_border,
        container_background: state.container_background,
        container_size: state.container_size,
    })
)
(Container);
