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
        // this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        // this.handleClose = this.handleClose.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.previewRef = React.createRef();
        this.alignment = this.alignment.bind(this);
    }

    fileSelectedHandler = async (event)=> {
        console.log(this.props.file_upload.file_upload.background);
        this.props.file_upload.file_upload.backgroundType = 'image';
        // let blob = event.currentTarget.files[0].slice(0, -1, 'image/png');
        // let newFile = new File([blob], `${this.props.type}.png`, {type: 'image/png'});

        // console.log(newFile);

        this.state.backgroundColor = false;
        this.state.alignment = true;
        let name = event.currentTarget.files[0].name;
        let type = this.props.type;
        let backgroundType = 'image';
        await this.props.uploadFile(this.props.type, event.currentTarget.files[0], event.currentTarget.files[0].name);
        this.props.handler(name, type, backgroundType);
        // newFile = null;
        console.log(this.props.file_upload);
    };

    // fileUploadHandler = async () => {
    //     await this.props.uploadFile(this.props.type, this.state.selectedFile, this.state.selectedFile.name);
    // };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.file_upload !== this.props.file_upload) {
            // this.setState({
            //     uploadedFile: this.props.file_upload.file_upload.file_upload
            // });
            // console.log(this.state.uploadedFile);
            console.log(this.props.file_upload);
        }
    }

    componentDidMount() {
        // console.log(this.props.type);
        this.props.handler('#ffdfca', 'background', 'color');
    }

    // handleClick = () => {
    //     this.setState({displayColorPicker: !this.state.displayColorPicker})
    // };
    //
    // handleClose = () => {
    //     this.setState({displayColorPicker: false});
    //
    // };

    alignment(e) {
        if (e.target.getAttribute('id') === 'left')
            this.previewRef.current.style.justifyContent = 'flex-start';
        if (e.target.getAttribute('id') === 'center')
            this.previewRef.current.style.justifyContent = 'center';
        if (e.target.getAttribute('id') === 'right')
            this.previewRef.current.style.justifyContent = 'flex-end';
    }

    // handleChange = (color) => {
    //     this.setState({color: color.rgb});
    //     this.state.backgroundColor = true;
    //     this.previewRef.current.style.backgroundColor = `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`;
    // };

    render() {
        return (
            <div
                className={this.props.type == "background" ? [this.props.style.container, this.props.style.active].join(' ') : this.props.style.container}>
                {/*<div className={this.props.style.imagePreview}*/}
                {/*ref={this.previewRef}>*/}
                {/*{this.state.backgroundColor == false ? <img*/}
                {/*src={require(`../../static/uploads/${this.props.type}/${this.state.uploadedFile != '' ?*/}
                {/*this.state.uploadedFile :*/}
                {/*'preview.png'}`)}/> : false}*/}

                {/*</div>*/}
                <div className={this.props.style.row}>
                    <div className={this.props.style.left}>
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
                    {/*<button onClick={this.fileUploadHandler}>Upload</button>*/}
                </div>
                {this.props.type == "background" ?
                        <div className={this.props.style.row}>
                            <div className={this.props.style.left}>
                                <span className={this.props.style.descr}>
                                    Color
                                </span>
                            </div>
                            <div className={this.props.style.right}>
                                {/*<div className={this.props.style.innerRow}>*/}
                                    {/*<div style={styles.swatch}*/}
                                         {/*onClick={this.handleClick}>*/}
                                        {/*<div style={styles.color}/>*/}
                                    {/*</div>*/}
                                    {/*{this.state.displayColorPicker ?*/}
                                        {/*<div style={styles.popover}>*/}
                                            {/*<div style={styles.cover}*/}
                                                 {/*onClick={this.handleClose}/>*/}
                                            {/*<SketchPicker color={this.state.color}*/}
                                                          {/*onChange={this.handleChange}/>*/}
                                        {/*</div> :*/}
                                        {/*null}*/}
                                {/*</div>*/}
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
