import React, {Component} from 'react';
import axios from "axios";
import style from "./builder.less";

class Background extends Component {
    constructor(props) {
        super(props);
        this.selectColor = this.selectColor.bind(this);
        this.inputRef = React.createRef();
        this.state = {
            selectedFile: null,
            background: '',
            dataType: ''
        }
    }

    selectColor(e) {
        console.log(e.target.value);
        this.inputRef.current.style.backgroundColor = e.target.value;
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    };

    fileUploadHandler = async() => {
        console.log(this.state.selectedFile);
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        let path = '';
        let query = await axios.post('http://localhost:4000/upload', fd)
            .then(res => {
                return res.data;
            })
            .then(val => {
                console.log(val);

                path = '/../../static/uploads/'+val;
                return path;
            });

        let el = document.querySelector(`.${this.props.style.imagePreview} img`);
        if (el) {
            el.remove();
        }
        this.setState({
            background: query,
            dataType: 'image'
        });

    };
    // shouldComponentUpdate(nextProps, nextState){
    //     return (this.state.background !== nextState.background);
    // }

    render() {
        return (
            <div className={[this.props.style.container, this.props.style.active].join(' ')}>
                <div className={this.props.style.imagePreview} ref={this.inputRef}>
                    {this.state.dataType === 'image'? <img src={require(this.state.background)}/> : ''}
                </div>
                <div className={this.props.style.row}>
                    <span className={this.props.style.descr}>
                        upload background img
                    </span>
                    <input type="file" onChange={this.fileSelectedHandler}/>
                    <button onClick={this.fileUploadHandler}>Upload</button>
                </div>
                <p className={this.props.style.hr}>or</p>
                <div className={this.props.style.row}>
                    <label htmlFor="sbc">Set backgr color</label>
                    <input type="text" onBlur={(e) => this.selectColor(e)} placeholder="Color code"/>
                </div>
            </div>
        )
    }
}

export default Background;
