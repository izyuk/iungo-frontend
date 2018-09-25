import React, {Component} from 'react';
import {connect} from 'react-redux';
import {upload_logo} from '../../reducers/logo_upload';
import axios from "axios";

import style from "./builder.less";

class LogoImage extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            selectedFile: null,
            image: '',
            dataType: ''
        };
        this.check = this.check.bind(this);
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    };

    fileUploadHandler = async () => {
        console.log(this.state.selectedFile);
        this.props.uploadLogo('image', this.state.selectedFile, this.state.selectedFile.name);

        // const fd = new FormData();
        // fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        // let path = '';
        // let query = await axios.post('http://localhost:4000/api/upload/logo', fd)
        //     .then(res => {
        //         return res.data;
        //     })
        //     .then(val => {
        //         console.log(val);
        //
        //         path = '/../../../src/static/uploads/logo/' + val;
        //         return path;
        //     });
        //
        // let el = document.querySelector(`.${this.props.style.imagePreview} img`);
        // if (el) {
        //     el.remove();
        // }
        //
        // this.setState({
        //     image: React.createElement('img', {
        //         src: query,
        //         dataType: 'image'
        //     })
        // });
        //
        // console.log(this.state.image);
        // const image = new Image();
        // image.src = this.state.image;
        // image.onload = () => {
        //     this.setState({
        //         dataType: 'image',
        //         dataImage: image
        //     });
        //     console.log('here');
        //     console.log(this.state.dataImage);
        // };
    };

    // componentDidMount() {
    //     this.updateImage();
    // }
    //
    // componentDidUpdate() {
    //     this.updateImage();
    // }

    // updateImage(data) {
    //     const image = new Image();
    //     image.src = this.state.image;
    //     image.onload = () => {
    //         this.setState({
    //             dataType: 'image',
    //             dataImage: image,
    //             imageLink: data
    //         });
    //         console.log('here');
    //         console.log(this.state.dataImage);
    //     };
    // }

    shouldComponentUpdate(nextProps) {
        return (this.props.logo_upload.logo_upload !== nextProps.logo_upload.logo_upload);
    }

    check() {
        // console.log(this);
        console.log(this.props.logo_upload.logo_upload);
    };

    componentDidMount() {
        console.log(this.props.logo_upload);
    }

    render() {
        return (
            <div className={this.props.style.container}>
                <div className={this.props.style.imagePreview} ref={this.inputRef}>
                    {/*{(this.props.logo_upload.logo_upload !== null || this.props.logo_upload.logo_upload !== undefined || this.props.logo_upload.logo_upload !== '') ?
                        <img
                            src={require(`../../../src/static/uploads/logo/${this.props.logo_upload.logo_upload}`)}/> : ''}*/}
                </div>
                <div className={this.props.style.row}>
                                <span className={this.props.style.descr}>
                                    upload logo image
                                </span>
                    <input type="file" onChange={this.fileSelectedHandler}/>
                    <button onClick={this.fileUploadHandler}>Upload</button>
                    <button onClick={this.check}>Check <b>uploaded_logo</b> state</button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        logo_upload: state.logo_upload
    }),
    dispatch => ({
        uploadLogo: (typeString, selectedFile, selectedFileName) => {
            dispatch(upload_logo(typeString, selectedFile, selectedFileName));
        }
    })
)(LogoImage);
