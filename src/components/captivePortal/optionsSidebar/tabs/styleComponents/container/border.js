import React, {Component} from 'react';
import {SketchPicker} from "react-color";
import {connect} from 'react-redux';

class ContentBorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            color: this.props.container_border.color || {
                rgba: {
                    r: 255,
                    g: 255,
                    b: 255,
                    a: 1,
                },
                hex: '#ffffff'
            },
            type: this.props.container_border.type || 'none',
            thickness: this.props.container_border.thickness || '1',
            radius: this.props.container_border.radius || '0'
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.select = this.select.bind(this);
    }

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker});
    };

    handleClose = () => {
        this.setState({displayColorPicker: false});
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
    };

    select = (e) => {
        let data = e.currentTarget.options[e.currentTarget.selectedIndex].value;
        let span = e.currentTarget.nextSibling.children[0];
        span.innerText = data;
        let state = e.currentTarget.getAttribute('data-select');
        this.setState({
            [state]: data
        });
        let {displayColorPicker, ...rest} = this.state;
        this.props.borderStyle(rest);
        this.props.handler(rest);
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.type !== nextState.type) {
            return true;
        } else if (this.state.thickness !== nextState.thickness) {
            return true;
        } else if (this.state.radius !== nextState.radius) {
            return true;
        } else if (this.state.color !== nextState.color) {

            return true;
        } /*else if (this.state.color !== nextState.color) {
            return true;
        }*/ else if (this.state.displayColorPicker !== nextState.displayColorPicker) {
            return true;
        } else {
            return false;
        }
    }

    componentDidMount() {
        let select = document.querySelectorAll('[data-component="ContentBorder"]');
        for (let i = 0; i < select.length; i++) {
            let svg = select[i].nextSibling.children[0];
            select[0].value = this.state.type;
            select[1].value = this.state.thickness;
            select[2].value = this.state.radius;
            let span = document.createElement('span');
            span.innerText = select[i].options[select[i].selectedIndex].value;
            select[i].nextSibling.insertBefore(span, svg);
        }
        const {displayColorPicker, ...rest} = this.state;
        this.props.borderStyle(rest);
        this.props.handler(rest);

    };

    componentDidUpdate() {
        const {displayColorPicker, ...rest} = this.state;
        this.props.borderStyle(rest);
        this.props.handler(rest);
    }

    render() {
        const popover = {
            position: 'absolute',
            zIndex: 2,
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
        return (
            <div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="header">Border</span>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="">Type</span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <select data-component="ContentBorder"
                                    data-select="type"
                                    onChange={this.select}>
                                <option value="none">None</option>
                                <option value="solid">Solid</option>
                                <option value="dotted">Dotted</option>
                                <option value="dashed">Dashed</option>
                            </select>
                            <p className="select">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#BFC5D2" fillRule="nonzero"
                                          d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                </svg>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="">Color</span>
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
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="">Thickness</span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <select className="tin"
                                    data-component="ContentBorder"
                                    data-select="thickness"
                                    onChange={this.select}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <p className="select tin">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#BFC5D2" fillRule="nonzero"
                                          d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                </svg>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="">Border Radius</span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <select className="tin"
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
                            <p className="select tin">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#BFC5D2" fillRule="nonzero"
                                          d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
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
        container_border: state.container_border
    }),
    dispatch => ({
        borderStyle: (data) => {
            dispatch({type: "container_border", payload: data});
        }
    })
)(ContentBorder);
