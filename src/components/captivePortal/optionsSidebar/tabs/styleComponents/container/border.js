import React, {Component} from 'react';
import {SketchPicker} from "react-color";
import Palette from '~/static/styles/palette';
import CaptivePortalContext from "~/context/project-context";
import Icons from '~/static/images/icons';

class ContentBorder extends Component {
    static contextType = CaptivePortalContext;

    state = {
        displayColorPicker: false,
        color: this.context.style.desktop_container.border.color,
        type: this.context.style.desktop_container.border.type,
        thickness: this.context.style.desktop_container.border.thickness,
        radius: this.context.style.desktop_container.border.radius
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
        Palette.addUserColor(color.hex);
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

    componentDidMount() {
        this.getBorderSettings();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextContext.previewDeviceType !== this.context.previewDeviceType ||
            nextContext.name !== this.context.name ||
            nextContext.style !== this.context.style) {
            this.getBorderSettings(nextContext);
        }
    }

    getBorderSettings(nextContext) {
        const context = nextContext || this.context;
        const {style, previewDeviceType} = context;
        const { color, type, thickness, radius } = (style[`${previewDeviceType}_container`] || style.desktop_container).border;
        this.setState({ color, type, thickness, radius });
        let select = document.querySelectorAll('[data-component="ContentBorder"]');
        select[0].value = type;
        select[1].value = thickness;
        select[2].value = radius;
        for (let i = 0; i < select.length; i++) {
            let span = document.createElement('span');
            const children = select[i].nextSibling.children;
            if (children.length > 1) {
                span = children[0];
            } else {
                let svg = children[0];
                select[i].nextSibling.insertBefore(span, svg);
            }
            span.innerText = (select[i].options[select[i].selectedIndex] && select[i].options[select[i].selectedIndex].value) || '';
        }

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
                                <Icons.DropdownIcon/>
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
                                    <SketchPicker color={this.state.color.rgba}
                                                  onChange={this.handleChange}
                                                  presetColors={Palette.getUserColors()}
                                    />
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
                                <Icons.DropdownIcon/>
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
                                <Icons.DropdownIcon/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContentBorder;
