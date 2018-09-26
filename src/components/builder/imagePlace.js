import React, { Component } from 'react';

class ImagePlace extends Component{
    constructor(props){
        super(props);
        this.state={
            image: null
        }
    }

    componentDidMount(){
        this.setState({
            image: this.props.image_path
        })
    }

    render(){
        return(
            <div>
                {this.state.image !== null ? <img src={this.state.image}/> : ''}
            </div>
        )
    }
}
export default ImagePlace;
