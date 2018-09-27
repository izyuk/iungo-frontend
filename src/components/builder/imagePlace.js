import React, { Component } from 'react';

class ImagePlace extends Component{
    constructor(props){
        super(props);
        let image = this.props.image_path;
        this.state={
            // image: image === undefined ? React.createElement('img',{src: '/static/uploads/logo/preview.png'}):  React.createElement('img',{src: '/static/uploads/logo/' + image})
            image: image
        }
    }

    render(){
        const path = '../../../src/static/uploads/logo/';
        return(
            <div className={this.props.class}>
                {console.log(this.state.image)}
                <img src={this.state.image === undefined ? require(path+'review.png') : requre(path + this.state.image)} alt=""/>
            </div>
        )
    }
}
// export default ImagePlace;
