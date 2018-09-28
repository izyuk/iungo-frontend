import React, { Component } from 'react';

import { preview } from '../../static/uploads/logo/preview.png';

class ImagePlace extends Component{
    constructor(props){
        super(props);
        let image = this.props.image_path;
        this.state={
            // image: image === undefined ? React.createElement('img',{src: '}):  React.createElement('img',{src: '/static/uploads/logo/' + image})
            image: image,
            uploadedLogo: this.props.image_path
        }
    }

    render(){
        console.log(preview);
        const path = '../../../src/static/uploads/logo/';
        return(
            <div className={this.props.class}>

            </div>
        )
    }
}
export default ImagePlace;
