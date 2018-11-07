import React, {Component} from 'react';
import axios from "axios";
import {SketchPicker} from 'react-color';

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: false,
            uploadedFile: '',
            selectedFile: null,
            displayColorPicker: false,
            alignment: true,
            colorHEX: '#f9f9fc',
            color: {
                r: '249',
                g: '249',
                b: '252',
                a: '1',
            }
        };
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checked = React.createRef();
        this.cpbButton = React.createRef();
        this.alignment = this.alignment.bind(this);
        this.transferFileData = this.transferFileData.bind(this);
    }

    fileSelectedHandler = async (event) => {
        this.props.file_upload.file_upload.backgroundType = 'image';

        this.state.backgroundColor = false;
        this.state.alignment = true;
        let type = this.props.type;

        const fd = new FormData();
        fd.append(type, event.currentTarget.files[0]);

        let query = axios.create({
            baseURL: 'http://localhost:4000'
        });
        if (type === 'background')
            if (fd.get('logo'))
                fd.delete('logo');
        if (type === 'logo')
            if (fd.get('background'))
                fd.delete('background');

        let promise = await query.post(`/upload/${type}`, fd, {
            onUploadProgress: progressEvent => {
                console.log('Upload progress: ', Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
            }
        })
            .then(result => {
                if (result.error) {
                    throw new Error("Error in uploading object");
                }
                return result.data;
            })
            .catch(error => {
                console.log(error);
            });

        let file = {'data': {}};

        await Promise.all([promise]).then((value) => {
            return file.data = value[0];
        });

        console.log(file.data);

        this.transferFileData(file.data, type, 'image');
    };

    transferFileData(data, type, backgroundType) {
        this.props.uploadFile(data);
        this.props.handler(data, type, backgroundType);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.file_upload !== this.props.file_upload) {
            console.log(this.props.file_upload);
        }
    }

    componentDidMount() {
        if (this.props.type == "background") {
            if (this.props.color.color) {
                let red = this.props.color.color.rgba.r,
                    green = this.props.color.color.rgba.g,
                    blue = this.props.color.color.rgba.b,
                    alpha = this.props.color.color.rgba.a;
                this.setState({
                    color: {
                        r: red,
                        g: green,
                        b: blue,
                        a: alpha
                    },
                    colorHEX: this.props.color.color.hex
                });
                this.cpbButton.current.removeAttribute('style');
                this.cpbButton.current.setAttribute('style', `background: rgba(${ red }, ${ green }, ${ blue }, ${ alpha })`);
            }
        }

        if(this.props.type === "logo")
            document.getElementById(this.props.position.position).setAttribute('checked', 'checked');
    }

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    };

    handleClose = () => {
        this.setState({displayColorPicker: false});

    };

    alignment(e) {
        if (e.target.getAttribute('id') === 'left') {
            this.props.alignment('flex-start');
            this.props.logoPos('left');
        }
        if (e.target.getAttribute('id') === 'center') {
            this.props.alignment('center');
            this.props.logoPos('center');
        }
        if (e.target.getAttribute('id') === 'right') {
            this.props.alignment('flex-end');
            this.props.logoPos('right');
        }
    }

    handleChange = (color) => {
        this.setState({
            color: {
                r: color.rgb.r,
                g: color.rgb.g,
                b: color.rgb.b,
                a: color.rgb.a
            }
        });
        this.setState({colorHEX: color.hex});
        this.state.backgroundColor = true;
        this.props.file_upload.file_upload.backgroundType = 'color';
        let type = this.props.type;
        this.props.handler(`rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`, type, 'color');
        this.props.updateColor(color.hex, {r: color.rgb.r, g: color.rgb.g, b: color.rgb.b, a: color.rgb.a});
    };

    render() {
        const popover = {
            position: 'absolute',
            zIndex: '2',
            top: 32,
            left: 0
        };
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        };
        return (
            <div
                className={this.props.type == "background" ? [this.props.style.container, this.props.style.active].join(' ') : this.props.style.container}>
                <div className={this.props.style.row}>
                    <div className={this.props.type == "logo" ? this.props.style.logoLeft: this.props.style.left}>
                        <span className={this.props.style.descr}>
                            {/*upload {this.props.type}*/} Image
                        </span>
                    </div>
                    <div className={this.props.style.right}>
                        <div className={this.props.style.innerRow}>
                            <div className={this.props.style.upload}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#FFF" fillRule="nonzero"
                                          d="M17 11.1V11c0-2.8-2.2-5-5-5-2.5 0-4.6 1.8-4.9 4.3-1.8.6-3.1 2.2-3.1 4.2C4 17 6 19 8.5 19H16c2.2 0 4-1.8 4-4 0-1.9-1.3-3.4-3-3.9zM13 14v3h-2v-3H8l4-4 4 4h-3z"/>
                                </svg>
                                <span>Upload</span>
                                <input type="file"
                                       onChange={this.fileSelectedHandler} accept="image/*"/>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.type == "background" ?
                    <div className={this.props.style.row}>
                        <div className={this.props.style.left}>
                                <span className={this.props.style.descr}>
                                    Color
                                </span>
                        </div>
                        <div className={this.props.style.right}>
                            <div className={this.props.style.innerRow}>
                                <div className={this.props.style.colorWrap}>
                                    <input type="text" value={this.state.colorHEX} disabled/>
                                    <button ref={this.cpbButton}
                                            style={{backgroundColor: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`}}
                                            onClick={this.handleClick}> </button>
                                    {this.state.displayColorPicker ? <div style={popover}>
                                        <div style={cover} onClick={this.handleClose}/>
                                        <SketchPicker color={this.state.color} onChange={this.handleChange}/>
                                    </div> : null}
                                </div>
                            </div>
                        </div>
                    </div> :
                false}
                {this.props.type == "logo" ?
                    (this.state.alignment ?
                        <div className={this.props.style.row}>
                            <div className={this.props.style.logoLeft}>
                                <span className={this.props.style.descr}>
                                    Image position
                                </span>
                            </div>
                            <div className={this.props.style.right}>
                                <div className={this.props.style.innerCol}>
                                    <label htmlFor="left">Left
                                        <div className={this.props.style.inputRadioWrap}>
                                            <input onChange={this.alignment} id='left' type="radio" name='alignment'/>
                                            <span className={this.props.style.radio}></span>
                                        </div>
                                    </label>
                                    <label htmlFor="center">Center
                                        <div className={this.props.style.inputRadioWrap}>
                                            <input onChange={this.alignment} id='center' type="radio" name='alignment'/>
                                            <span className={this.props.style.radio}></span>
                                        </div>
                                    </label>
                                    <label htmlFor="right">Right
                                        <div className={this.props.style.inputRadioWrap}>
                                            <input onChange={this.alignment} id='right' type="radio" name='alignment'/>
                                            <span className={this.props.style.radio}></span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div> :
                    false) :
                false}
            </div>
        )
    }
}

export default ImageUploader;
