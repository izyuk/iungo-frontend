import React, { Component } from 'react';
import style from "./builder.less";

class LogoImage extends Component{
    render(){
        return(
            <div className={this.props.style.container}>
                <div className={this.props.style.imagePreview} ref={this.inputRef}>
                </div>
                <div className={this.props.style.row}>
                                <span className={this.props.style.descr}>
                                    upload logo image
                                </span>
                    <input type="file" onChange={this.fileSelectedHandler}/>
                    <button onClick={this.fileUploadHandler}>Upload</button>
                </div>
            </div>
        )
    }
}

export default LogoImage;
