import React, {Component} from 'react';
import {SketchPicker} from 'react-color';
import {getAllImages} from '../../../api/API';

import Modal from '../../additional/modal';
import axios from "axios";

const BACKEND_API = 'https://backend.bravofy.com';

class ImageUploader extends Component {
    state = {
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
        },
        isModalOpen: false,
        imagesList: '',
        progress: ''
    };

    cpbButton = React.createRef();

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

    uploadImage = (string, name, base64) => {
        return axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${string}`
            },
            url: `${BACKEND_API}/image`,
            mode: 'no-cors',
            data: {"name": name, "base64Content": base64},
            onUploadProgress: progressEvent => {
                this.setState({
                    progress: Math.round(progressEvent.loaded / progressEvent.total * 100)
                })
            }
        })
            .then(res =>
                console.log(res)
            )
            .catch(err => console.warn('In uploadImage API method\n', err));

    };

    fileSelectedHandler = async (files) => {
        this.props.background_and_logo.backgroundType = 'IMAGE';


        this.state.backgroundColor = false;
        this.state.alignment = true;

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


        let query = this.uploadImage(this.props.token.token ? this.props.token.token : localStorage.getItem('token'), this.state.fileInfo.name, this.state.fileInfo.base64);
        await query.then(res => {
            this.getImages();
        });
    };

    chooseImage = (e) => {
        const list = document.querySelectorAll('.imagesList div');
        for (let i = 0; i < list.length; i++) {
            list[i].classList.remove('active');
        }
        e.currentTarget.classList.add('active');
        this.transferFileData(e.currentTarget.getAttribute('dataurl'), this.props.type, 'IMAGE');
        this.props.setID(e.currentTarget.getAttribute('dataid'));
    };

    getImages = async () => {
        const token = this.props.token.token ? this.props.token.token : localStorage.getItem('token');

        let query = getAllImages(token);
        let array = [];
        await query.then(res => {
                res.data.map((item, i) => {
                    array.push(
                        <div key={i} dataid={item.id} dataurl={item.externalUrl}
                             onClick={this.chooseImage}>
                            <img src={item.externalUrl} alt=""/>
                            <span>{item.name}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" width="512px"
                                 height="512px" viewBox="0 0 442.533 442.533" enableBackground='new 0 0 442.533 442.533'>
                                <g>
                                    <path
                                        d="M434.539,98.499l-38.828-38.828c-5.324-5.328-11.799-7.993-19.41-7.993c-7.618,0-14.093,2.665-19.417,7.993L169.59,247.248   l-83.939-84.225c-5.33-5.33-11.801-7.992-19.412-7.992c-7.616,0-14.087,2.662-19.417,7.992L7.994,201.852   C2.664,207.181,0,213.654,0,221.269c0,7.609,2.664,14.088,7.994,19.416l103.351,103.349l38.831,38.828   c5.327,5.332,11.8,7.994,19.414,7.994c7.611,0,14.084-2.669,19.414-7.994l38.83-38.828L434.539,137.33   c5.325-5.33,7.994-11.802,7.994-19.417C442.537,110.302,439.864,103.829,434.539,98.499z"
                                        fill="#FFFFFF"/>
                                </g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                            </svg>
                        </div>
                    )
                });
            }
        );
        this.setState({
            imagesList: array
        })
    };

    toggleModal = () => {
        this.setState(state => ({isModalOpen: !state.isModalOpen}));
        this.getImages();
    };


    transferFileData = (data, type, backgroundType) => {
        if (type === 'logo') {
            this.props.uploadFile(data, this.state.logoPosition);
        } else if (type === 'background') {
            let colorData = this.state.color;
            this.props.uploadFile(data, colorData, backgroundType);
        }
        this.props.handler(data, type, backgroundType);
    };

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    };

    handleClose = () => {
        this.setState({displayColorPicker: false});
    };

    alignment = (e) => {
        this.props.alignment(e.target.getAttribute('datatype'));
        this.props.uploadFile(this.props.background_and_logo.background_and_logo.logo.url, e.target.getAttribute('datatype'));
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
        this.props.background_and_logo.backgroundType = 'COLOR';
        const type = this.props.type;
        this.props.handler(this.state.color, type, 'COLOR');
        this.props.uploadFile(this.state.background, {
            hex: color.hex,
            rgba: {r: color.rgb.r, g: color.rgb.g, b: color.rgb.b, a: color.rgb.a}
        }, 'COLOR');
    };

    componentDidUpdate(prevProps, prevState) {
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
            let position = this.props.position;
            document.getElementById((position ? (position === 'flex-start' ? 'left' : (position === 'flex-end' ? 'right' : 'center')) : this.state.logoPosition)).checked = true;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.imagesList !== nextState.imagesList) return true;
        else return true;
    }

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
                className={this.props.type === "background" ? "container active" : "container"}>
                <div className="row">
                    <div className={this.props.type === "logo" ? "logoLeft" : "left"}>
                        <span className="descr">
                            Image
                        </span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <div className="upload" onClick={this.toggleModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#FFF" fillRule="nonzero"
                                          d="M17 11.1V11c0-2.8-2.2-5-5-5-2.5 0-4.6 1.8-4.9 4.3-1.8.6-3.1 2.2-3.1 4.2C4 17 6 19 8.5 19H16c2.2 0 4-1.8 4-4 0-1.9-1.3-3.4-3-3.9zM13 14v3h-2v-3H8l4-4 4 4h-3z"/>
                                </svg>
                                <span>Choose</span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.type === "background" ?
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
                {this.props.type === "logo" ?
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
                                        <input onChange={this.alignment} id='left' datatype={'flex-start'} type="radio"
                                               name='alignment'/>
                                        <span className="radio"> </span>
                                    </div>
                                </label>
                                <label htmlFor="center">Center
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='center' datatype={'center'} type="radio"
                                               name='alignment'/>
                                        <span className="radio"> </span>
                                    </div>
                                </label>
                                <label htmlFor="right">Right
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='right' datatype={'flex-end'} type="radio"
                                               name='alignment'/>
                                        <span className="radio"> </span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div> :
                    false}
                {
                    this.state.isModalOpen &&
                    <Modal onClose={this.toggleModal}
                           uploadHandler={this.fileSelectedHandler}
                           progress={this.state.progress}
                           fileInfo={this.state.fileInfo.file}>
                        <div className="imagesList">
                            {this.state.imagesList !== '' && this.state.imagesList}
                        </div>
                    </Modal>
                }
            </div>
        )
    }
}

export default ImageUploader;
