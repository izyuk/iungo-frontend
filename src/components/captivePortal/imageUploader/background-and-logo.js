import React, {Component} from 'react';
import {SketchPicker} from 'react-color';
import Palette from '~/static/styles/palette';
import {getAllImages} from '~/api/API';

import Modal from '~/components/additional/modal';
import axios from "axios";
import CaptivePortalContext from "~/context/project-context";
import Repeating from "./backgroundStylingComponents/repeating";
import Position from "./backgroundStylingComponents/position";
import Size from "./backgroundStylingComponents/size";

const BACKEND_API = process.env.BACKEND_API;

class BackgroundAndLogo extends Component {

    static contextType = CaptivePortalContext;
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
        logo: this.context.style.background_and_logo.desktopLogo.url,
        logoHorizontalPosition: this.context.style.background_and_logo.desktopLogo.horizontalPosition,
        logoVerticalPosition: this.context.style.background_and_logo.desktopLogo.verticalPosition,
        fileInfo: '',
        fileAdditional: {
            width: '',
            height: ''
        },
        isModalOpen: false,
        imagesList: '',
        progress: '',
        inModalImageEventType: ''
    };


    cpbButton = React.createRef();

    newUploadedImageData = {};

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

    uploadImage = (string, name, base64, data) => {
        return axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${string}`
            },
            url: `${BACKEND_API}/image`,
            mode: 'no-cors',
            data: {"name": name, "base64Content": base64, "width": data.clientWidth, "height": data.clientHeight},
            onUploadProgress: progressEvent => {
                this.setState({
                    progress: Math.round(progressEvent.loaded / progressEvent.total * 100)
                })
            }
        })
            .then(res => {
                    this.newUploadedImageData = res
                }
            )
            .catch(err => console.warn('In uploadImage API method\n', err));

    };

    fileSelectedHandler = async (files) => {
        this.state.backgroundColor = false;
        this.state.alignment = true;
        if ((files.type === "image/jpeg") ||
            (files.type === "image/png") ||
            (files.type === "image/gif") ||
            (files.type === "image/svg+xml")) {
            if (files.file.size < 5120000) {
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
                let query = this.uploadImage(localStorage.getItem('token'), this.state.fileInfo.name, this.state.fileInfo.base64, img);
                await query.then(res => {
                    this.getImages();
                });
            } else {
                await this.context.setNotification('File shouldn`t be larger than 5.12 MB', true, true);
                setTimeout(() => {
                    this.context.setNotification('', false, false);
                }, 5000)
            }
        } else {
            await this.context.setNotification('Wrong file format', true, true);
            setTimeout(() => {
                this.context.setNotification('', false, false);
            }, 5000)
        }
        document.querySelector('.modalFooter input').value = '';
    };

    chooseImage = (e) => {
        const list = document.querySelectorAll('.imagesList div');
        for (let i = 0; i < list.length; i++) {
            list[i].classList.remove('active');
        }
        e.currentTarget.classList.add('active');
        this.newUploadedImageData = {
            data: {
                id: e.currentTarget.getAttribute('dataid'),
                externalUrl: e.currentTarget.getAttribute('dataurl')
            }
        };
        switch (this.props.type) {
            case "logo":
                this.setState({logo: e.currentTarget.getAttribute('dataurl')});
                this.context.setLogo(e.currentTarget.getAttribute('dataurl'), this.state.logoHorizontalPosition, this.state.logoVerticalPosition);
                this.context.setLogoID(e.currentTarget.getAttribute('dataid'));
                break;
            case "background":
                this.setState({background: e.currentTarget.getAttribute('dataurl')});
                const colorData = this.state.color;
                this.context.setBackgroundID(e.currentTarget.getAttribute('dataid'));
                this.context.setBackground(e.currentTarget.getAttribute('dataurl'), colorData, 'IMAGE');
                break;
        }
        this.setState({
            inModalImageEventType: e.type
        });
        if (e.type === 'dblclick') {
            this.toggleModal();
        }
    };

    applyOnUpload = () => {
        console.log(this.newUploadedImageData);
        const {data: {id, externalUrl}} = this.newUploadedImageData;
        switch (this.props.type) {
            case "logo":
                this.setState({logo: externalUrl});
                this.context.setLogo(externalUrl, this.state.logoHorizontalPosition, this.state.logoVerticalPosition);
                this.context.setLogoID(id);
                break;
            case "background":
                this.setState({background: externalUrl});
                const colorData = this.state.color;
                this.context.setBackgroundID(id);
                this.context.setBackground(externalUrl, colorData, 'IMAGE');
                break;
        }
        this.toggleModal();
    };

    getImages = async () => {

        const token = this.context.dataToExclude.token || localStorage.getItem('token');

        let query = getAllImages(token);
        let array = [];
        await query.then(res => {
                res.data.map((item, i) => {
                    array.push(
                        <div key={i} dataid={item.id} data-cy={`backgroundImageItem${i}`} dataurl={item.externalUrl}
                             onDoubleClick={this.chooseImage} onClick={this.chooseImage}>
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


    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    };

    handleClose = () => {
        this.setState({displayColorPicker: false});
    };

    horizontalAlignment = (e) => {
        this.context.setLogo(this.state.logo, e.target.getAttribute('datatype'), this.state.logoVerticalPosition);
        this.setState({
            logoHorizontalPosition: e.target.getAttribute('datatype')
        })
    };

    verticalAlignment = (e) => {
        const logoVerticalPosition = e.target.getAttribute('datatype');
        this.context.setLogo(this.state.logo, this.state.logoHorizontalPosition, logoVerticalPosition);
        this.setState({logoVerticalPosition})
    };

    handleChange = (color) => {
        const currentState = this.state;
        currentState.color = {
            rgba: {
                r: color.rgb.r,
                g: color.rgb.g,
                b: color.rgb.b,
                a: color.rgb.a
            },
            hex: color.hex
        };
        Palette.addUserColor(color.hex);
        this.state.backgroundColor = true;
        this.context.setBackground(this.state.background, this.state.color, 'COLOR');
    };

    removeLogoHandler = () => {
        this.context.removeLogo();
    };

    removeBackgroundHandler = () => {
        this.context.removeBackground();
    };

    componentDidMount() {
        this.updateLogo();
        this.updateBackground();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let currentState = this.state;
        let context = this.context;
        if (currentState !== nextState) return true;
        else if (context !== nextContext) return true;
        else return true;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextContext.previewDeviceType !== this.context.previewDeviceType) {
            this.updateLogo(nextContext);
            this.updateBackground(nextContext);
        }
    }

    updateLogo(nextContext) {
        if (this.props.type === 'logo') {
            const context = nextContext || this.context;
            const {style: {background_and_logo}, previewDeviceType} = context;
            const logo = background_and_logo[`${previewDeviceType}Logo`];
            const {horizontalPosition, verticalPosition} = logo;
            this.setState({
                logoHorizontalPosition: horizontalPosition,
                logoVerticalPosition: verticalPosition
            });
            document.querySelector(`[datatype='${verticalPosition}']`).checked = true;
            document.getElementById((horizontalPosition ? (horizontalPosition === 'flex-start' ? 'left' : (horizontalPosition === 'flex-end' ? 'right' : 'center')) : this.state.logoHorizontalPosition)).checked = true;
        }
    }

    updateBackground(nextContext) {
        if (this.props.type === "background") {
            const context = nextContext || this.context;
            const {style: {background_and_logo}, previewDeviceType} = context;
            const background = background_and_logo[`${previewDeviceType}Background`];
            if (background) {
                let currentState = this.state;
                currentState.color = background.color;
                this.setState(currentState);
                let red = this.state.color.rgba.r,
                    green = this.state.color.rgba.g,
                    blue = this.state.color.rgba.b,
                    alpha = this.state.color.rgba.a;
                this.cpbButton.current.removeAttribute('style');
                this.cpbButton.current.setAttribute('style', `background-color: rgba(${red}, ${green}, ${blue}, ${alpha})`);
            }
        }
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

        const {style: {background_and_logo}, previewDeviceType} = this.context;
        const logo = background_and_logo[`${previewDeviceType}Logo`];
        const logoId = this.context[`${previewDeviceType}LogoId`];
        const background = background_and_logo[`${previewDeviceType}Background`];
        const backgroundId = this.context[`${previewDeviceType}BackgroundId`];
        return (
            <div
                className="container active">
                <div className="row">
                    <div className={this.props.type === "logo" ? "logoLeft" : "left"}>
                        <span className="descr">
                            Image
                        </span>
                    </div>
                    <div className="right">
                        <div className="innerRow logo">
                            <div className="upload" onClick={this.toggleModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#FFF" fillRule="nonzero"
                                          d="M17 11.1V11c0-2.8-2.2-5-5-5-2.5 0-4.6 1.8-4.9 4.3-1.8.6-3.1 2.2-3.1 4.2C4 17 6 19 8.5 19H16c2.2 0 4-1.8 4-4 0-1.9-1.3-3.4-3-3.9zM13 14v3h-2v-3H8l4-4 4 4h-3z"/>
                                </svg>
                                <span>Choose</span>
                            </div>
                            {
                                this.props.type === "logo" &&
                                ((logo.url && logo.url !== '' && logoId && logoId !== '') &&
                                    <span className="removeLogo" onClick={this.removeLogoHandler}>
                                        Remove
                                    </span>)
                            }
                            {
                                this.props.type === "background" &&
                                ((background.url && background.url !== '' && backgroundId && backgroundId !== '') &&
                                    <span className="removeLogo" onClick={this.removeBackgroundHandler}>
                                        Remove
                                    </span>)
                            }
                        </div>
                    </div>
                </div>
                {this.props.type === "background" ?
                    <div>
                        <div className="row">
                            <div className="left">
                                <span className="descr">
                                    Color
                                </span>
                            </div>
                            <div className="right">
                                <div className="innerRow">
                                    <div className="colorWrap">
                                        <input type="text" value={background.color.hex} disabled/>
                                        <button ref={this.cpbButton}
                                                style={{backgroundColor: `rgba(${background.color.rgba.r}, ${background.color.rgba.g}, ${background.color.rgba.b}, ${background.color.rgba.a})`}}
                                                onClick={this.handleClick}
                                                data-cy="openColorPicker"></button>
                                        {this.state.displayColorPicker ? <div style={popover}>
                                            <div style={cover} onClick={this.handleClose}/>
                                            <SketchPicker color={background.color.rgba}
                                                          onChange={this.handleChange}
                                                          presetColors={Palette.getUserColors()}
                                            />
                                        </div> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            background.backgroundType === 'IMAGE' &&
                            <div>
                                <Repeating/>
                                <Position/>
                                <Size/>
                            </div>
                        }
                    </div> :
                    false}
                {this.props.type === "logo" ?
                    <React.Fragment>
                        <div className="row">
                            <div className="logoLeft logoLeftFull">
                                <span className="header">Position</span>
                            </div>
                        </div>
                        <div className="row spaceBottom">
                            <div className="logoLeft ">
                                <span className="descr position">
                                    Horizontal
                                </span>
                            </div>
                            <div className="right">
                                <div className="innerCol">
                                    <label htmlFor="left" data-cy="logoHorizontalAlignment_Left">Left
                                        <div className="inputRadioWrap">
                                            <input onChange={this.horizontalAlignment} id='left' datatype={'flex-start'}
                                                   type="radio"
                                                   name='h-alignment'/>
                                            <span className="radio"> </span>
                                        </div>
                                    </label>
                                    <label htmlFor="center" data-cy="logoHorizontalAlignment_Center">Center
                                        <div className="inputRadioWrap">
                                            <input onChange={this.horizontalAlignment} id='center' datatype={'center'}
                                                   type="radio"
                                                   name='h-alignment'/>
                                            <span className="radio"> </span>
                                        </div>
                                    </label>
                                    <label htmlFor="right" data-cy="logoHorizontalAlignment_Right">Right
                                        <div className="inputRadioWrap">
                                            <input onChange={this.horizontalAlignment} id='right' datatype={'flex-end'}
                                                   type="radio"
                                                   name='h-alignment'/>
                                            <span className="radio"> </span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="logoLeft">
                                <span className="descr position">
                                    Vertical
                                </span>
                            </div>
                            <div className="right">
                                <div className="innerCol">
                                    <label htmlFor="top" data-cy="logoVerticalAlignment_Top">Top
                                        <div className="inputRadioWrap">
                                            <input onChange={this.verticalAlignment} id='top' datatype='top'
                                                   type="radio"
                                                   name='v-alignment'/>
                                            <span className="radio"> </span>
                                        </div>
                                    </label>
                                    <label htmlFor="middle" data-cy="logoVerticalAlignment_Middle">Middle
                                        <div className="inputRadioWrap">
                                            <input onChange={this.verticalAlignment} id='middle' datatype='middle'
                                                   type="radio"
                                                   name='v-alignment'/>
                                            <span className="radio"> </span>
                                        </div>
                                    </label>
                                    <label htmlFor="bottom" data-cy="logoVerticalAlignment_Bottom">Bottom
                                        <div className="inputRadioWrap">
                                            <input onChange={this.verticalAlignment} id='bottom' datatype='bottom'
                                                   type="radio"
                                                   name='v-alignment'/>
                                            <span className="radio"> </span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    false}
                {
                    this.state.isModalOpen &&
                    <Modal className="imagesModal"
                           onClose={this.toggleModal}
                           uploadHandler={this.fileSelectedHandler}
                           progress={this.state.progress}
                           fileInfo={this.state.fileInfo.file}
                           applyOnUpload={this.applyOnUpload}
                           imageEventType={this.state.inModalImageEventType}>
                        <div className="imagesList">
                            {this.state.imagesList !== '' && this.state.imagesList}
                        </div>
                    </Modal>
                }
            </div>
        )
    }
}

export default BackgroundAndLogo;
