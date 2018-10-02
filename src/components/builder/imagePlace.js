import React, {Component} from 'react';

class ImagePlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadedLogo: '',
            selectedFile: null
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
        await this.props.uploadFile('image', this.state.selectedFile, this.state.selectedFile.name);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.logo_upload !== this.props.logo_upload) {
            this.setState({
                uploadedLogo: this.props.logo_upload.logo_upload.logo_upload
            });
        }
    }

    render() {
        return (
            <div className={this.props.style.container}>
                <div className={this.props.style.imagePreview} ref={this.inputRef}>
                    <img src={require(`../../static/uploads/logo/${this.state.uploadedLogo != '' ? this.state.uploadedLogo : 'preview.png'}`)}/>

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

export default ImagePlace;
