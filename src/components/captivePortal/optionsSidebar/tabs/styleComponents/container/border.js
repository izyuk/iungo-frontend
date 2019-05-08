import React, {Component} from 'react';
import {SketchPicker} from "react-color";
import CaptivePortalContext from "../../../../../../context/captive-portal-context";

class ContentBorder extends Component {
    static contextType = CaptivePortalContext;

    state = {
        displayColorPicker: false,
        color: this.context.style.container_border.color,
        type: this.context.style.container_border.type,
        thickness: this.context.style.container_border.thickness,
        radius: this.context.style.container_border.radius
    };

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker});
    };

    handleClose = () => {
        this.setState({displayColorPicker: false});
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
        this.setState(currentState);
        const {displayColorPicker, ...rest} = this.state;
        this.context.setBorderStyle(rest);
    };

    select = (e) => {
        const data = e.currentTarget.options[e.currentTarget.selectedIndex].value;
        const span = e.currentTarget.nextSibling.children[0];
        span.innerText = data;
        const dataSelect = e.currentTarget.getAttribute('data-select');
        const currentState = this.state;
        currentState[dataSelect] = dataSelect !== 'type' ? parseInt(data) : data;
        this.setState(currentState);
        const {displayColorPicker, ...rest} = this.state;
        this.context.setBorderStyle(rest);
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.state.type !== nextState.type) ||
            (this.state.thickness !== nextState.thickness) ||
            (this.state.radius !== nextState.radius) ||
            (this.state.color !== nextState.color) ||
            (this.state.displayColorPicker !== nextState.displayColorPicker) ||
            (this.context !== nextContext);

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
        this.context.setBorderStyle(rest);
        console.log(this.context.style.container_border.color);
    };

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
                                        style={{backgroundColor: `rgba(${this.state.color.rgba.r}, ${this.state.color.rgba.g}, ${this.state.color.rgba.b}, ${this.state.color.rgba.a})`}}
                                        onClick={this.handleClick} data-cy="borderColor"></button>
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
                                    data-cy="thickness"
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
                                    data-cy="radius"
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

export default ContentBorder;
