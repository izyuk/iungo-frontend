import React, {Component} from 'react';
import CaptivePortalContext from "../../../../../../context/project-context";
import Slider from "rc-slider";
import {SketchPicker} from "react-color";
import Tooltip from 'rc-tooltip';

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


class GDPR extends Component {

    static contextType = CaptivePortalContext;

    state = {
        displayColorPicker: false,
        fontInputData: this.context.style.gdpr_settings.fontSize,
        color: {rgba: this.context.style.gdpr_settings.color.rgba, hex: this.context.style.gdpr_settings.color.hex},
        fontSize: this.context.style.gdpr_settings.fontSize,
        setting: this.context.style.gdpr_settings.setting
    };

    setting = React.createRef();

    onSliderChange = (value) => {
        const currentState = this.state;
        if (value < 8) {
            value = 8;
        } else if (value > 52) {
            value = 52
        } else if (value === '') {
            value = 8
        }
        this.setState({
            fontSize: parseInt(value),
            fontInputData: parseInt(value)
        });
        const {displayColorPicker, fontInputData, ...rest} = currentState;
        this.context.setGDPRSettings(rest);
    };

    fontInputHandler = (value) => {
        const currentState = this.state;
        currentState.fontInputData = parseInt(value);
        this.setState(currentState);
        const {displayColorPicker, fontInputData, ...rest} = currentState;
        this.context.setGDPRSettings(rest);
    };

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker});
    };

    handleClose = () => {
        this.setState({displayColorPicker: false});
    };

    settingHandler = (e) => {
        if(e){
            const currentState = this.state;
            currentState.setting = e.currentTarget.options[e.currentTarget.selectedIndex].value;
            this.setState(currentState);
            const span = e.currentTarget.nextSibling.children[0];
            span.innerText = e.currentTarget.options[e.currentTarget.selectedIndex].value;
            const {displayColorPicker, fontInputData, ...rest} = currentState;
            this.context.setGDPRSettings(rest);
        } else {
            const {style: {gdpr_settings: {setting}}} = this.context;
            this.setting.current.value = setting;
            let svg = this.setting.current.nextSibling.children[0];
            let span = document.createElement('span');
            span.innerText = this.setting.current.options[this.setting.current.selectedIndex].value;
            this.setting.current.nextSibling.insertBefore(span, svg);
        }
    };

    handleChange = (color) => {
        const currentState = this.state;
        currentState.color.rgba = color.rgb;
        currentState.color.hex = color.hex;
        this.setState(currentState);
        const {displayColorPicker, fontInputData, ...rest} = currentState;
        this.context.setGDPRSettings(rest);
    };

    componentDidMount() {
        this.settingHandler();
        this.context.setGDPRSettingsStatus(true);
    }

    componentWillUnmount() {
        this.context.setGDPRSettingsStatus(false);
        // const {displayColorPicker, fontInputData, text, color, redirectURL, ...rest} = this.state;
        // this.context.setSuccessMessageData(text, {color: color, ...rest});
        // this.context.redirectURLChanger(redirectURL);
    }

    render() {
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
        return (
            <div className="container">
                <div className="row">
                    <div className="logoLeft">
                    <span className="descr position">
                        Settings
                    </span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <div className="innerCol">
                                <div className="innerRow">
                                    <select ref={this.setting}
                                            data-cy={'gdprSettings'}
                                            onChange={this.settingHandler}>
                                        <option value="list">List</option>
                                        <option value="set-nothing">Set nothing</option>
                                    </select>
                                    <p className="select">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <path fill="#BFC5D2" fillRule="nonzero"
                                                  d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                        </svg>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="">Font size</span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <div style={style}>
                                <Slider min={8}
                                        max={52}
                                        defaultValue={parseInt(this.state.fontSize)}
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
                            <div className={'select medium'}>
                                <input className="medium" type={'number'} min={8} max={52} maxLength={2} size={2}
                                       onChange={(e) => this.fontInputHandler(e.target.value)}
                                       onBlur={(e) => this.onSliderChange(e.target.value)}
                                       defaultValue={this.state.fontSize}
                                       value={this.state.fontInputData}
                                       data-cy="gdprFontSize"/>
                                <span>
                                    px
                                </span>
                            </div>
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
                                        onClick={this.handleClick} data-cy="gdprTextColor"></button>
                                {
                                    this.state.displayColorPicker ?
                                        <div style={popover}>
                                            <div style={cover} onClick={this.handleClose}/>
                                            <SketchPicker color={this.state.color.rgba} onChange={this.handleChange}/>
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default GDPR;