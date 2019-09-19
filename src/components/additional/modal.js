import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FileBase64 from 'react-file-base64';
import Icons from '~/static/images/icons';

class Modal extends Component {

    dropArea = React.createRef();

    formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    };

    preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation()
    };

    highlight = (e) => {
        this.dropArea.current.classList.add('highlight')
    };

    unhighlight = (e) => {
        this.dropArea.current.classList.remove('highlight')
    };

    handleDrop = (e) => {
        let dt = e.dataTransfer;
        let files = dt.files;

        this.handleFiles(files);
    };

    handleFiles = (files) => {
        const reader = new FileReader();
        const toCorrectFormat = {
            name: files[0].name,
            file: files[0],
            size: this.formatBytes(files[0].size),
            type: files[0].type,
            base64: reader.onloadend = function () {
                return reader.result;
            }
        };

        reader.onloadend = () => {
            toCorrectFormat.base64 = reader.result;
            this.props.uploadHandler(toCorrectFormat);
            return toCorrectFormat;
        };


        if (files[0]) {
            reader.readAsDataURL(files[0]);
        }


        // ([...files]).forEach(this.props.uploadHandler);
    };

    componentDidMount() {
        let dropArea = this.dropArea.current;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, this.preventDefaults, false)
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, this.highlight, false)
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, this.unhighlight, false)
        });

        dropArea.addEventListener('drop', this.handleDrop, false)
    }


    render() {
        return ReactDOM.createPortal(
            <div className={'modal ' + (this.props.className || '')}>
                <div className="modalContent">
                    <div className="modalHead">
                        <p>Image Uploader</p>
                        <button type='button' onClick={this.props.onClose} className={'close'}>&times;</button>
                    </div>
                    <div className="modalBody" ref={this.dropArea}>
                        {this.props.children}
                    </div>
                    <div className="modalFooter">
                        <div className="upload">
                            <Icons.UploadIcon fill="#FFF"/>
                            <span>Upload</span>
                            <FileBase64
                                multiple={false}
                                onDone={this.props.uploadHandler}/>
                        </div>
                        {!this.props.fileInfo &&
                        <span>Max size limit: 5.12 MB</span>
                        }
                        {this.props.fileInfo &&

                        <div className="uploadInfo">
                            <div className="top">
                                <span>Name: {this.props.fileInfo.name}</span>
                                <span>Size: {this.formatBytes(this.props.fileInfo.size)}</span>
                            </div>
                            <div className="progress">
                                <span className={'bar'}>
                                    <span style={{width: `${this.props.progress}%`}}></span>
                                </span>
                                <span className={'persentage'}>{this.props.progress}%</span>
                            </div>
                        </div>
                        }

                        {
                            (this.props.progress === 100 || this.props.imageEventType === 'click') &&
                            <div className="upload apply" onClick={this.props.applyOnUpload}>
                                <span>Apply and Close</span>
                            </div>
                        }

                    </div>
                </div>
            </div>,
            document.getElementById('modalPlace')
        );
    }
}

export default Modal;
