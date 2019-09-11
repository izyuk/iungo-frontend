import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FileBase64 from 'react-file-base64';
import Icons from '~/static/images/icons';

class Modal extends Component {

    formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    };

    render() {
        return ReactDOM.createPortal(
            <div className={'modal ' + (this.props.className || '')}>
                <div className="modalContent">
                    <div className="modalHead">
                        <p>Image Uploader</p>
                        <button type='button' onClick={this.props.onClose} className={'close'}>&times;</button>
                    </div>
                    <div className="modalBody">
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
                                {/*<span>Max size limit: {this.formatBytes(5120)} 5120 KB</span>*/}
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

                        {/*{*/}
                        {/*    this.props.imageEventType === 'click' &&*/}
                        {/*    <div className="upload apply" onClick={this.props.applyOnUpload}>*/}
                        {/*        <span>Apply and Close</span>*/}
                        {/*    </div>*/}
                        {/*}*/}

                    </div>
                </div>
            </div>,
            document.getElementById('modalPlace')
        );
    }
}

export default Modal;
