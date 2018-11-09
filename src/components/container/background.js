import React, {Component} from 'react';
import {SketchPicker} from "react-color";

class ContentBackground extends Component {
    constructor(props){
        super(props);
        this.state={
            colorHEX: '#f9f9fc',
            color: {
                r: '249',
                g: '249',
                b: '252',
                a: '1',
            }
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.select = this.select.bind(this);
        this.slider = this.slider.bind(this);
        this.drag = this.drag.bind(this);
    }

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    };

    handleClose = () => {
        this.setState({displayColorPicker: false});

    };

    handleChange = (color) => {
        this.setState({color: color.rgb});
    };

    componentDidMount(){
        let select = document.querySelectorAll('[ data-component="ContentBackground"]');
        for (let i = 0; i < select.length; i++){
            let svg = select[i].nextSibling.children[0];
            let span = document.createElement('span');
            span.innerText = select[i].options[select[i].selectedIndex].value;
            select[i].nextSibling.insertBefore(span, svg);
        }
    }

    select = (e) => {
        let data = e.currentTarget.options[e.currentTarget.selectedIndex].value;
        let span =  e.currentTarget.nextSibling.children[0];
        span.innerText = data;
    };

    slider = (e) => {
        // e.target.parentElement.addEventListener("dragover", function(e){
        //     // e = e || window.event;
        //     var dragX = e., dragY = e.pageY;
        //
        //     console.log("X: "+dragX+" Y: "+dragY);
        // }, false);
        // let childPos = e.target.offsetLeft;
        // console.log(e.target.offsetLeft);
        // let childOffset = {
        //     left: childPos
        // };

        e.target.addEventListener('onmousemove', this.drag, false);

    };

    drag = (e) => {
        console.log(e.pageX);
    };

    render(){
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
        return(
            <div>
                <div className={this.props.style.row}>
                    <div className={this.props.style.logoLeft}>
                        <span className={this.props.style.header}>Background</span>
                    </div>
                </div>


                <div className={this.props.style.row}>
                    <div className={this.props.style.logoLeft}>
                        <span className={this.props.style}>Color</span>
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
                </div>

                <div className={this.props.style.row}>
                    <div className={this.props.style.logoLeft}>
                        <span className={this.props.style}>Opacity</span>
                    </div>
                    <div className={this.props.style.right}>
                        <div className={this.props.style.innerRow}>
                            <div className={this.props.style.slider} onMouseEnter={this.slider} onClick={this.slider}>
                                <span className={this.props.style.dot} onDrag={this.slider}></span>
                            </div>
                            <div>
                                <select className={this.props.style.medium} data-component="ContentBackground" onChange={this.select}>
                                    <option value="10%">10%</option>
                                    <option value="20%">20%</option>
                                    <option value="30%">30%</option>
                                    <option value="40%">40%</option>
                                    <option value="50%">50%</option>
                                    <option value="60%">60%</option>
                                    <option value="70%">70%</option>
                                    <option value="80%">80%</option>
                                    <option value="90%">90%</option>
                                    <option value="100%">100%</option>
                                </select>
                                <p className={[this.props.style.select, this.props.style.medium].join(' ')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                    </svg>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContentBackground;
