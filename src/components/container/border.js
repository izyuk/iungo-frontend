import React, {Component} from 'react';
import {SketchPicker} from "react-color";
import {connect} from 'react-redux';

class ContentBorder extends Component {
    constructor(props){
        super(props);
        this.state={
            displayColorPicker: false,
            colorHEX: '#ffffff' || this.props.content_border.colorHEX,
            color: {
                r: '255',
                g: '255',
                b: '255',
                a: '1',
            } || this.props.content_border.color ,
            type: 'none' || this.props.content_border.type,
            thickness: '1' || this.props.content_border.thickness,
            radius: '0' || this.props.content_border.radius
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.select = this.select.bind(this);
    }

    handleClick = () => {
        console.log('click');
        this.setState({displayColorPicker: !this.state.displayColorPicker});
        console.log('click');
    };

    handleClose = () => {
        this.setState({displayColorPicker: false});
    };

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
    };

    select = (e) => {
        let data = e.currentTarget.options[e.currentTarget.selectedIndex].value;
        let span =  e.currentTarget.nextSibling.children[0];
        span.innerText = data;
        let state = e.currentTarget.getAttribute('data-select');
        this.setState({
            [state]: data
        });
        let {displayColorPicker, ...rest} = this.state;
        this.props.borderStyle(rest);
        this.props.handler(rest);
    };

    shouldComponentUpdate(nextProps, nextState){
        if(this.state.type !== nextState.type){
            return true;
        } else if (this.state.thickness !== nextState.thickness){
            return true;
        } else if (this.state.radius !== nextState.radius){
            return true;
        } else if (this.state.colorHEX !== nextState.colorHEX){
            return true;
        } else if (this.state.color !== nextState.color){
            return true;
        } else if (this.state.displayColorPicker !== nextState.displayColorPicker){
            return true;
        } else {
            return false;
        }
    }

    componentDidMount(){
        console.log(this.props.content_border);
        let select = document.querySelectorAll('[data-component="ContentBorder"]');
        for (let i = 0; i < select.length; i++){
            let svg = select[i].nextSibling.children[0];
            select[0].value = this.state.type;
            select[1].value = this.state.thickness;
            select[2].value = this.state.radius;
            let span = document.createElement('span');
            span.innerText = select[i].options[select[i].selectedIndex].value;
            select[i].nextSibling.insertBefore(span, svg);
        }
        this.props.handler(this.state);

    };

    componentDidUpdate(){
        this.props.handler(this.state);
        console.log(this.props.content_border);
    }

    render(){
        const popover = {
            position: 'absolute',
            zIndex: '2',
            top: 32,
            right: 0
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
                        <span className={this.props.style.header}>Border</span>
                    </div>
                </div>
                <div className={this.props.style.row}>
                    <div className={this.props.style.logoLeft}>
                        <span className={this.props.style}>Type</span>
                    </div>
                    <div className={this.props.style.right}>
                        <div className={this.props.style.innerRow}>
                            <select data-component="ContentBorder"
                                    data-select="type"
                                    onChange={this.select}>
                                <option value="none">None</option>
                                <option value="solid">Solid</option>
                                <option value="dotted">Dotted</option>
                                <option value="dashed">Dashed</option>
                            </select>
                            <p className={this.props.style.select}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                </svg>
                            </p>
                        </div>
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
                        <span className={this.props.style}>Thickness</span>
                    </div>
                    <div className={this.props.style.right}>
                        <div className={this.props.style.innerRow}>
                            <select className={this.props.style.tin}
                                    data-component="ContentBorder"
                                    data-select="thickness"
                                    onChange={this.select}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <p className={[this.props.style.select, this.props.style.tin].join(' ')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                </svg>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={this.props.style.row}>
                    <div className={this.props.style.logoLeft}>
                        <span className={this.props.style}>Border Radius</span>
                    </div>
                    <div className={this.props.style.right}>
                        <div className={this.props.style.innerRow}>
                            <select className={this.props.style.tin}
                                    data-component="ContentBorder"
                                    data-select="radius"
                                    onChange={this.select}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <p className={[this.props.style.select, this.props.style.tin].join(' ')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                </svg>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// export default ContentBorder;
export default connect(
    state => ({
        content_border: state.content_border
    }),
    dispatch => ({
        borderStyle: (data) => {
            dispatch({type: "CONTENT_BORDER", payload: data});
        }
    })
)(ContentBorder);
