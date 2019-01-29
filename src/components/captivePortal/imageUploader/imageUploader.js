import React, {Component} from 'react';
import {SketchPicker} from 'react-color';
import FileBase64 from 'react-file-base64';
import {uploadImage} from '../../../api/API';

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: false,
            uploadedFile: '',
            selectedFile: null,
            displayColorPicker: false,
            alignment: true,
            color: {
                rgba: {
                    r: 249,
                    g: 249,
                    b: 252,
                    a: 1,
                },
                hex: '#f9f9fc'
            },
            background: '',
            logo: '',
            logoPosition: 'center',
            fileInfo: '',
            fileAdditional: {
                width: '',
                height: ''
            }
        };
        this.cpbButton = React.createRef();
    }

    imageLoad = (url) => {
        let image = new Image();

        if (!image.complete) {
            image.src = url;
            this.setState({
                fileAdditional: {
                    width: image.width,
                    height: image.height
                }
            });

        }
    };

    fileSelectedHandler = async (files) => {
        this.props.background_and_logo.backgroundType = 'image';


        this.state.backgroundColor = false;
        this.state.alignment = true;
        let type = this.props.type;


        this.setState({
            fileInfo: files
        });

        this.imageLoad(this.state.fileInfo.base64);

        let img = document.createElement('img');
        img.setAttribute('src', this.state.fileInfo.base64);
        document.getElementsByTagName('BODY')[0].appendChild(img);
        img.style.opacity = 0;
        img.style.position = 'absolute';
        img.style.top = 0;
        img.style.left = 0;
        img.style.zIndex = -100;
        img.style.zoom = 0.1;
        let query = uploadImage(this.props.token.token ? this.props.token.token : localStorage.getItem('token'), this.state.fileInfo.name, this.state.fileInfo.base64);
        await query.then(res => {
            this.transferFileData(res.data.externalUrl, type, 'image');
            this.props.setID(res.data.id);
        });
    };


    transferFileData = (data, type, backgroundType) => {
        if (type === 'logo') {
            this.props.uploadFile(data, this.state.logoPosition);
        } else if (type === 'background') {
            let colorData = this.state.color;
            this.props.uploadFile(data, colorData);
        }
        this.props.handler(data, type, backgroundType);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.background_and_logo !== this.props.background_and_logo) {

        }
    }

    componentDidMount() {
        if (this.props.type === "background") {
            if (this.props.background_and_logo.background) {
                let red = this.props.background_and_logo.background.color.rgba.r,
                    green = this.props.background_and_logo.background.color.rgba.g,
                    blue = this.props.background_and_logo.background.color.rgba.b,
                    alpha = this.props.background_and_logo.background.color.rgba.a;
                this.setState({
                    color: {
                        rgba: {
                            r: red,
                            g: green,
                            b: blue,
                            a: alpha
                        },
                        hex: this.props.background_and_logo.background.color.hex
                    }
                });
                this.cpbButton.current.removeAttribute('style');
                this.cpbButton.current.setAttribute('style', `background: rgba(${ red }, ${ green }, ${ blue }, ${ alpha })`);
            }
        }
        if (this.props.type === 'logo') {
            const position = this.props.position;
            document.getElementById((position ? position : this.state.logoPosition)).checked = true;
        }
    }

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    };

    handleClose = () => {
        this.setState({displayColorPicker: false});

    };

    alignment = (e) => {
        if (e.target.getAttribute('id') === 'left') {
            this.props.alignment('flex-start');
            this.props.uploadFile(this.state.logo, 'left');
        }
        if (e.target.getAttribute('id') === 'center') {
            this.props.alignment('center');
            this.props.uploadFile(this.state.logo, 'center');
        }
        if (e.target.getAttribute('id') === 'right') {
            this.props.alignment('flex-end');
            this.props.uploadFile(this.state.logo, 'right');
        }
    };

    handleChange = (color) => {
        this.setState({
            color: {
                rgba: {
                    r: color.rgb.r,
                    g: color.rgb.g,
                    b: color.rgb.b,
                    a: color.rgb.a
                },
                hex: color.hex
            }
        });
        this.state.backgroundColor = true;
        this.props.background_and_logo.backgroundType = 'color';
        let type = this.props.type;
        this.props.handler(`rgba(${ this.state.color.rgba.r }, ${ this.state.color.rgba.g }, ${ this.state.color.rgba.b }, ${ this.state.color.rgba.a })`, type, 'color');
        this.props.uploadFile(this.state.background, {
            hex: color.hex,
            rgba: {r: color.rgb.r, g: color.rgb.g, b: color.rgb.b, a: color.rgb.a}
        });
    };

    render() {
        const popover = {
            position: 'absolute',
            zIndex: 2,
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
                className={this.props.type == "background" ? "container active" : "container"}>
                <div className="row">
                    <div className={this.props.type == "logo" ? "logoLeft" : "left"}>
                        <span className="descr">
                            {/*upload {this.props.type}*/} Image
                        </span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <div className="upload">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#FFF" fillRule="nonzero"
                                          d="M17 11.1V11c0-2.8-2.2-5-5-5-2.5 0-4.6 1.8-4.9 4.3-1.8.6-3.1 2.2-3.1 4.2C4 17 6 19 8.5 19H16c2.2 0 4-1.8 4-4 0-1.9-1.3-3.4-3-3.9zM13 14v3h-2v-3H8l4-4 4 4h-3z"/>
                                </svg>
                                <span>Upload</span>
                                {/*<input type="file"*/}
                                {/*onChange={this.fileSelectedHandler} accept="image/*"/>*/}
                                <FileBase64
                                    multiple={false}
                                    onDone={this.fileSelectedHandler.bind(this)} accept="image/*"/>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.type == "background" ?
                    <div className="row">
                        <div className="left">
                                <span className="descr">
                                    Color
                                </span>
                        </div>
                        <div className="right">
                            <div className="innerRow">
                                <div className="colorWrap">
                                    <input type="text" value={this.state.color.hex} disabled/>
                                    <button ref={this.cpbButton}
                                            style={{backgroundColor: `rgba(${ this.state.color.rgba.r }, ${ this.state.color.rgba.g }, ${ this.state.color.rgba.b }, ${ this.state.color.rgba.a })`}}
                                            onClick={this.handleClick}></button>
                                    {this.state.displayColorPicker ? <div style={popover}>
                                        <div style={cover} onClick={this.handleClose}/>
                                        <SketchPicker color={this.state.color.rgba} onChange={this.handleChange}/>
                                    </div> : null}
                                </div>
                            </div>
                        </div>
                    </div> :
                    false}
                {this.props.type == "logo" ?
                    <div className="row">
                        <div className="logoLeft">
                                <span className="descr position">
                                    Image position
                                </span>
                        </div>
                        <div className="right">
                            <div className="innerCol">
                                <label htmlFor="left">Left
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='left' type="radio" name='alignment'/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                                <label htmlFor="center">Center
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='center' type="radio" name='alignment'/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                                <label htmlFor="right">Right
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='right' type="radio" name='alignment'/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div> :
                    false}
            </div>
        )
    }
}

export default ImageUploader;
