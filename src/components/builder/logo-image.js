import React, {Component} from 'react';
import {connect} from 'react-redux';
import {upload_logo} from '../../reducers/logo_upload';
import {logo} from '../../static/uploads/logo/preview.png';
import ImagePlace from './imagePlace';

class LogoImage extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            selectedFile: null,
            image: '',
            dataType: ''
        };
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    };

    fileUploadHandler = async () => {
        this.props.uploadLogo('image', this.state.selectedFile, this.state.selectedFile.name);

        this.setState({
            uploadedLogo: this.props.logo_upload
        });
        console.log(this.props.logo_upload.logo_upload && this.props.logo_upload.logo_upload);
    };

    render() {

        const UPLOADED_LOGO_PATH = '../../static/uploads/logo/';
        return (
            <div className={this.props.style.container}>
                <div className={this.props.style.imagePreview} ref={this.inputRef}>
                    <img src={require('../../static/uploads/logo/preview.png')}/>
                    {/*{this.props.logo_upload && <img src={require(UPLOADED_LOGO_PATH+this.props.logo_upload)} />}*/}
                </div>
                {/*<ImagePlace image_path={this.props.logo_upload}/>*/}
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

export default connect(
    state => ({
        logo_upload: state
    }),
    dispatch => ({
        uploadLogo: (typeString, selectedFile, selectedFileName) => {
            dispatch(upload_logo(typeString, selectedFile, selectedFileName));
        }
    })
)(LogoImage);
