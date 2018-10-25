import React, {Component} from 'react';
import {SketchPicker} from 'react-color';

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: false,
            uploadedFile: '',
            selectedFile: null,
            displayColorPicker: false,
            alignment: false,
            color: {
                r: '241',
                g: '112',
                b: '19',
                a: '1',
            }
        };
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.previewRef = React.createRef();
        this.alignment = this.alignment.bind(this);
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        });
        this.state.backgroundColor = false;
        this.state.alignment = true;
        this.previewRef.current.style.backgroundColor = '';
    };

    fileUploadHandler = async () => {
        await this.props.uploadFile(this.props.type, this.state.selectedFile, this.state.selectedFile.name);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.file_upload !== this.props.file_upload) {
            this.setState({
                uploadedFile: this.props.file_upload.file_upload.file_upload
            });
        }
    }

    componentDidMount() {
        // console.log(this.props.type);
    }

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    };

    handleClose = () => {
        this.setState({displayColorPicker: false});

    };

    alignment(e) {
        if (e.target.getAttribute('id') === 'left')
            this.previewRef.current.style.justifyContent = 'flex-start';
        if (e.target.getAttribute('id') === 'center')
            this.previewRef.current.style.justifyContent = 'center';
        if (e.target.getAttribute('id') === 'right')
            this.previewRef.current.style.justifyContent = 'flex-end';
    }

    handleChange = (color) => {
        this.setState({color: color.rgb});
        this.state.backgroundColor = true;
        this.previewRef.current.style.backgroundColor = `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`;
    };

    render() {
        const styles = {
            color: {
                width: '70px',
                height: '35px',
                borderRadius: '2px',
                background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
            },
            swatch: {
                padding: '3px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
                float: 'left'
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
                left: '265px'
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            }
        };
        return (
            <div
                className={this.props.type == "background" ? [this.props.style.container, this.props.style.active].join(' ') : this.props.style.container}>
                <div className={this.props.style.imagePreview}
                     ref={this.previewRef}>
                    {this.state.backgroundColor == false ? <img
                        src={require(`../../static/uploads/${this.props.type}/${this.state.uploadedFile != '' ?
                            this.state.uploadedFile :
                            'preview.png'}`)}/> : false}

                </div>
                <div className={this.props.style.row}>
                    <span className={this.props.style.descr}>
                        upload {this.props.type} image
                    </span>
                    <input type="file"
                           onChange={this.fileSelectedHandler}/>
                    <button onClick={this.fileUploadHandler}>Upload</button>
                </div>
                {this.props.type == "background" ?
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <p className={this.props.style.hr}>or</p>
                        <div className={this.props.style.row}>
                            <span className={this.props.style.descr}>
                                choose color
                            </span>
                            <div>
                                <div style={styles.swatch}
                                     onClick={this.handleClick}>
                                    <div style={styles.color}/>
                                </div>
                                {this.state.displayColorPicker ?
                                    <div style={styles.popover}>
                                        <div style={styles.cover}
                                             onClick={this.handleClose}/>
                                        <SketchPicker color={this.state.color}
                                                      onChange={this.handleChange}/>
                                    </div> :
                                    null}
                            </div>
                        </div>
                    </div>
                    :
                    false}
                {this.props.type == "logo" ?
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        {this.state.alignment ?
                            <div className={this.props.style.row}>
                                <span className={this.props.style.descr}>
                                    Choose alignment
                                </span>
                                <div className={this.props.style.row}>
                                    <label htmlFor="left">Left
                                        <input onChange={this.alignment} id='left' type="radio" name='alignment'/>
                                    </label>
                                    <label htmlFor="center">Center
                                        <input onChange={this.alignment} id='center' type="radio" name='alignment'/>
                                    </label>
                                    <label htmlFor="right">Right
                                        <input onChange={this.alignment} id='right' type="radio" name='alignment'/>
                                    </label>
                                </div>
                            </div> :
                            false}
                    </div> :
                    false}
            </div>
        )
    }
}

export default ImageUploader;
