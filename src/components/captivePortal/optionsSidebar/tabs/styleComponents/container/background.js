import React, {Component} from 'react';
import {SketchPicker} from "react-color";
import Palette from '~/static/styles/palette';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import CaptivePortalContext from "~/context/project-context";

const style = {
    marginRight: 16,
    position: 'relative',
    borderRadius: 4,
    width: 74,
    height: 4,
};

const Handle = Slider.Handle;

const handle = (props) => {
    const {value, dragging, index, ...restProps} = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={false}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};


class ContentBackground extends Component {
    static contextType = CaptivePortalContext;
    state = {
        displayColorPicker: false,
        color: this.context.style.desktop_container.background.color,
        opacity: this.context.style.desktop_container.background.opacity
    };

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
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
        let {displayColorPicker, ...rest} = this.state;
        this.context.setBackgroundStyle(rest)
    };

    onSliderChange = (value) => {
        this.setState({ opacity: value });
        let {displayColorPicker, ...rest} = this.state;
        this.context.setBackgroundStyle(rest)
    };

    componentDidMount() {
        this.getBackgroundSettings();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextContext !== this.context) {
            this.getBackgroundSettings(nextContext);
        }
    }

    getBackgroundSettings(nextContext){
        const context = nextContext || this.context;
        const {style, dataToExclude:{previewDeviceType}} = context;
        const background = (style[`${previewDeviceType}_container`] || style.desktop_container).background;
        this.setState({ color: background.color , opacity: background.opacity });
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
                        <span className="header">Background</span>
                    </div>
                </div>


                <div className="row">
                    <div className="logoLeft">
                        <span className={this.props.style}>Color</span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <div className="colorWrap">
                                <input type="text" value={this.state.color.hex} disabled/>
                                <button ref={this.cpbButton}
                                        style={{backgroundColor: `rgba(${this.state.color.rgba.r}, ${this.state.color.rgba.g}, ${this.state.color.rgba.b}, ${this.state.color.rgba.a})`}}
                                        onClick={this.handleClick}
                                        data-cy="containerBackground"></button>
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
                        <span className={this.props.style}>Opacity</span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <div style={style}>
                                <Slider min={0}
                                        max={100}
                                        value={parseInt(this.state.opacity)}
                                        handle={handle}
                                        trackStyle={{
                                            backgroundColor: '#5585ED',
                                            height: 4,
                                            borderRadius: 4,
                                            position: 'absolute'
                                        }}
                                        railStyle={{
                                            backgroundColor: '#E7E9EF',
                                            height: 4,
                                            borderRadius: 4,
                                            position: 'absolute',
                                            width: '100%'
                                        }}
                                        handleStyle={{
                                            border: '2px solid #fff',
                                            height: 12,
                                            width: 12,
                                            borderRadius: 12,
                                            backgroundColor: '#5585ED',
                                            marginLeft: -6,
                                            position: 'absolute',
                                            top: -4
                                        }}
                                        onChange={this.onSliderChange}
                                />
                            </div>
                            <div>
                                <select className="medium" disabled
                                        onChange={this.select}>
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
                                <p className="select medium">
                                    {`${this.state.opacity}%`}
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
