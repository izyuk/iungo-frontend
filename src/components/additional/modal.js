import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Modal extends Component {

    formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    };

    inputHandler = (e) => {
        console.log(e.target.files[0]);
        this.props.getExif(e.target.files);
        this.props.uploadHandler(e.target.files[0]);
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#FFF" fillRule="nonzero"
                                      d="M17 11.1V11c0-2.8-2.2-5-5-5-2.5 0-4.6 1.8-4.9 4.3-1.8.6-3.1 2.2-3.1 4.2C4 17 6 19 8.5 19H16c2.2 0 4-1.8 4-4 0-1.9-1.3-3.4-3-3.9zM13 14v3h-2v-3H8l4-4 4 4h-3z"/>
                            </svg>
                            <span>Upload</span>
                            {/*<FileBase64*/}
                            {/*    multiple={false}*/}
                            {/*    onDone={this.props.uploadHandler}/>*/}
                            <input type="file" onChange={this.inputHandler}/>

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
