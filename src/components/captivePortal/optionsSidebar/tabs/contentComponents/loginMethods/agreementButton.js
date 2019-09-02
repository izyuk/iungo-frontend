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

class AgreementButton extends Component {

    static contextType = CaptivePortalContext;

    state = {
        fontInputData: this.context.style.accept_button_font.fontSize,
        acceptButtonText: this.context.acceptButtonText,
        acceptButtonColor: this.context.style.accept_button_color,
        acceptButtonFont: this.context.style.accept_button_font,
        acceptButtonSize: this.context.style.accept_button_size,
        acceptButtonBorder: this.context.style.accept_button_border,
        displayTextColorPicker: false,
        displayBackgroundColorPicker: false,
        displayBorderColorPicker: false,
        family: this.context.style.accept_button_font.family
    };

    onSliderChange = (value) => {
        if (value < 8) {
            value = 8;
        } else if (value > 52) {
            value = 52
        } else if (value === '') {
            value = 8
        }
        const currentState = this.state;
        currentState.acceptButtonFont.fontSize = parseInt(value);
        currentState.fontInputData = parseInt(value);
        this.setState(currentState);
        const {displayTextColorPicker, displayBackgroundColorPicker, displayBorderColorPicker, fontInputData, ...rest} = currentState
        this.context.setButtonStyles(rest);
    };

    fontInputHandler = (value) => {
        const currentState = this.state;
        currentState.fontInputData = parseInt(value);
        this.setState(currentState);
        const {displayTextColorPicker, displayBackgroundColorPicker, displayBorderColorPicker, fontInputData, ...rest} = currentState;
        this.context.setButtonStyles(rest);
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state !== nextState) {
            return true;
        } else if (this.state.fontInputData !== nextState.fontInputData) {
            return true;
        } else
            return false;
    }

    componentDidMount() {
        const select = document.querySelectorAll('[data-component="ContentBorder"]');
        for (let i = 0; i < select.length; i++) {
            let svg = select[i].nextSibling.children[0];
            select[0].value = this.state.acceptButtonBorder.type;
            select[1].value = this.state.acceptButtonBorder.thickness;
            select[2].value = this.state.acceptButtonBorder.radius;
            let span = document.createElement('span');
            span.innerText = select[i].options[select[i].selectedIndex].value;
            select[i].nextSibling.insertBefore(span, svg);
        }
        document.getElementById(this.context.style.accept_button_font.alignment).checked = true;
    }

    handleTextColorClick = () => {
        this.setState({displayTextColorPicker: !this.state.displayTextColorPicker});
    };

    handleTextColorClose = () => {
        this.setState({displayTextColorPicker: false});
    };

    handleTextColorChange = (color) => {
        const currentState = this.state;
        currentState.acceptButtonFont.color.rgba = color.rgb;
        currentState.acceptButtonFont.color.hex = color.hex;
        Palette.addUserColor(color.hex);
        this.setState(currentState);
        const {displayTextColorPicker, displayBackgroundColorPicker, displayBorderColorPicker, fontInputData, ...rest} = currentState;
        this.context.setButtonStyles(rest);
    };

    handleBackgroundColorClick = () => {
        this.setState({displayBackgroundColorPicker: !this.state.displayBackgroundColorPicker});
    };

    handleBackgroundColorClose = () => {
        this.setState({displayBackgroundColorPicker: false});
    };

    handleBackgroundColorChange = (color) => {
        const currentState = this.state;
        currentState.acceptButtonColor.rgba = color.rgb;
        currentState.acceptButtonColor.hex = color.hex;
        Palette.addUserColor(color.hex);
        this.setState(currentState);
        const {displayTextColorPicker, displayBackgroundColorPicker, displayBorderColorPicker, fontInputData, ...rest} = currentState;
        this.context.setButtonStyles(rest);
    };

    handleBorderColorClick = () => {
        this.setState({displayBorderColorPicker: !this.state.displayBorderColorPicker});
    };

    handleBorderColorClose = () => {
        this.setState({displayBorderColorPicker: false});
    };

    handleBorderColorChange = (color) => {
        const currentState = this.state;
        currentState.acceptButtonBorder.color.rgba = color.rgb;
        currentState.acceptButtonBorder.color.hex = color.hex;
        Palette.addUserColor(color.hex);
        this.setState(currentState);
        const {displayTextColorPicker, displayBackgroundColorPicker, displayBorderColorPicker, fontInputData, ...rest} = currentState;
        this.context.setButtonStyles(rest);
    };

    select = (e) => {
        const data = e.currentTarget.options[e.currentTarget.selectedIndex].value;
        const span = e.currentTarget.nextSibling.children[0];
        span.innerText = data;
        const state = e.currentTarget.getAttribute('data-select');
        const currentState = this.state;
        currentState.acceptButtonBorder[state] = state !== 'type' ? parseInt(data) : data;
        this.setState(currentState);
        const {displayTextColorPicker, displayBackgroundColorPicker, displayBorderColorPicker, fontInputData, ...rest} = currentState;
        this.context.setButtonStyles(rest);
    };

    textActionsHandler = (e) => {
        const currentState = this.state;
        const name = e.currentTarget.getAttribute('data-type');
        currentState.acceptButtonFont.textActions[name] = !currentState.acceptButtonFont.textActions[name];
        this.setState(currentState);
        const {displayTextColorPicker, displayBackgroundColorPicker, displayBorderColorPicker, fontInputData, ...rest} = currentState;
        this.context.setButtonStyles(rest);
    };

    emptyFieldCheck = (e) => {
        if (e.currentTarget.value === '') {
            this.setState({acceptButtonText: 'Connect'});
            e.currentTarget.value = 'Connect'
        }
    };

    textChanges = (e) => {
        const currentState = this.state;
        currentState.acceptButtonText = e.currentTarget.value;
        this.setState(currentState);
        const {displayTextColorPicker, displayBackgroundColorPicker, displayBorderColorPicker, fontInputData, ...rest} = currentState;
        this.context.setButtonStyles(rest);
    };

    alignment = (e) => {
        const currentState = this.state;
        currentState.acceptButtonFont.alignment = e.target.getAttribute('data-id');
        this.setState(currentState);
        const {displayTextColorPicker, displayBackgroundColorPicker, displayBorderColorPicker, fontInputData, ...rest} = currentState;
        this.context.setButtonStyles(rest);
    };

    valueWidth = (e) => {
        const currentState = this.state;
        if (e.target.value >= 500) {
            e.target.value = 500;
            currentState.acceptButtonSize.width = 500;
        } else if (e.target.value <= 120) {
            e.target.value = 120;
            currentState.acceptButtonSize.width = 120;
        } else {
            currentState.acceptButtonSize.width = parseInt(e.target.value);
        }
        this.setState(currentState);
        const {displayTextColorPicker, displayBackgroundColorPicker, displayBorderColorPicker, fontInputData, ...rest} = currentState;
        this.context.setButtonStyles(rest);
    };

    valuePadding = (e) => {
        const currentState = this.state;
        if (e.target.value >= 40) {
            e.target.value = 40;
            currentState.acceptButtonSize.padding = 40;
        } else if (e.target.value <= 0) {
            e.target.value = 0;
            currentState.acceptButtonSize.padding = 0;
        } else {
            currentState.acceptButtonSize.padding = parseInt(e.target.value);
        }
        this.setState(currentState);
        const {displayTextColorPicker, displayBackgroundColorPicker, displayBorderColorPicker, fontInputData, ...rest} = currentState;
        this.context.setButtonStyles(rest);
    };

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
        const {
            acceptButtonText,
            acceptButtonColor,
            acceptButtonFont,
            acceptButtonSize,
            acceptButtonBorder
        } = this.state;
        return (
            <div className={'agreement'}>
                <div className="row">
                    <div className="logoLeft">
                        <span className="header">Font</span>
                    </div>
                </div>
                <div className="row">
                    <div className="right">
                        <div className="innerRow">
                            <div className="textActions">
                                <button onClick={this.textActionsHandler}
                                        className={acceptButtonFont.textActions.bold ? "active" : ''}
                                        data-cy="connectButtonBold"
                                        type="button"
                                        data-type="bold">B
                                </button>
                                <button onClick={this.textActionsHandler}
                                        className={acceptButtonFont.textActions.italic ? "active" : ''}
                                        data-cy="connectButtonItalic"
                                        type="button"
                                        data-type="italic">i
                                </button>
                                <button onClick={this.textActionsHandler}
                                        className={acceptButtonFont.textActions.underline ? "active" : ''}
                                        data-cy="connectButtonUnderline"
                                        type="button"
                                        data-type="underline">U
                                </button>
                            </div>
                            <div className="innerCol toRow">
                                <label htmlFor="left">
                                    <span>Left</span>
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='left' data-id='left' type="radio"
                                               name='alignment' data-cy="connectButtonLeft"/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                                <label htmlFor="center">
                                    <span>Center</span>
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='center' data-id='center' type="radio"
                                               name='alignment' data-cy="connectButtonCenter"/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                                <label htmlFor="right">
                                    <span>Right</span>
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='right' data-id='right' type="radio"
                                               name='alignment' data-cy="connectButtonRight"/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="innerRow">
                            <input type={'text'}
                                   style={{maxWidth: '100%'}}
                                   onChange={this.textChanges}
                                   onBlur={this.emptyFieldCheck}
                                   defaultValue={acceptButtonText}
                                   data-cy="connectButtonText"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="">Size</span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <div style={style}>
                                <Slider min={8}
                                        max={52}
                                        defaultValue={parseInt(acceptButtonFont.fontSize)}
                                        value={parseInt(acceptButtonFont.fontSize)}
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
                                <input className="medium" type={'number'} min={8} max={52}
                                       onChange={(e) => this.fontInputHandler(e.target.value)}
                                       onBlur={(e) => this.onSliderChange(e.target.value)}
                                       defaultValue={acceptButtonFont.fontSize}
                                       value={this.state.fontInputData}
                                       data-cy="connectButtonFontSize"/>
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
                                <input type="text" value={acceptButtonFont.color.hex} disabled/>
                                <button ref={this.cpbButton}
                                        style={{backgroundColor: `rgba(${acceptButtonFont.color.rgba.r}, ${acceptButtonFont.color.rgba.g}, ${acceptButtonFont.color.rgba.b}, ${acceptButtonFont.color.rgba.a})`}}
                                        onClick={this.handleTextColorClick}
                                        data-cy="connectButtonTextColor">
                                </button>
                                {
                                    this.state.displayTextColorPicker ?
                                        <div style={popover}>
                                            <div style={cover} onClick={this.handleTextColorClose}/>
                                            <SketchPicker color={acceptButtonFont.color.rgba}
                                                          onChange={this.handleTextColorChange}
                                                          presetColors={Palette.getUserColors()}
                                            />
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="header">Background</span>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="">Color</span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <div className="colorWrap">
                                <input type="text" value={acceptButtonColor.hex} disabled/>
                                <button ref={this.cpbButton}
                                        style={{backgroundColor: `rgba(${acceptButtonColor.rgba.r}, ${acceptButtonColor.rgba.g}, ${acceptButtonColor.rgba.b}, ${acceptButtonColor.rgba.a})`}}
                                        onClick={this.handleBackgroundColorClick}
                                        data-cy="connectButtonBackgroundColor">
                                </button>
                                {
                                    this.state.displayBackgroundColorPicker ?
                                        <div style={popover}>
                                            <div style={cover} onClick={this.handleBackgroundColorClose}/>
                                            <SketchPicker color={acceptButtonColor.rgba}
                                                          onChange={this.handleBackgroundColorChange}
                                                          presetColors={Palette.getUserColors()}
                                            />
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
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
                                    onChange={this.select}
                                    data-cy="connectButtonBorderType">
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
                                <input type="text" value={acceptButtonBorder.color.hex} disabled/>
                                <button ref={this.cpbButton}
                                        style={{backgroundColor: `rgba(${acceptButtonBorder.color.rgba.r}, ${acceptButtonBorder.color.rgba.g}, ${acceptButtonBorder.color.rgba.b}, ${acceptButtonBorder.color.rgba.a})`}}
                                        onClick={this.handleBorderColorClick} data-cy="connectButtonBorderColor">
                                </button>
                                {
                                    this.state.displayBorderColorPicker ?
                                        <div style={popover}>
                                            <div style={cover} onClick={this.handleBorderColorClose}/>
                                            <SketchPicker color={acceptButtonBorder.color.rgba}
                                                          onChange={this.handleBorderColorChange}
                                                          presetColors={Palette.getUserColors()}
                                            />
                                        </div>
                                        : null
                                }
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
                                    onChange={this.select}
                                    data-cy="connectButtonBorderThickness">
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
                                    onChange={this.select}
                                    data-cy="connectButtonBorderRadius">
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
                <div className="row">
                    <div className="logoLeft">
                        <span className="header">Size</span>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="">Width</span>
                    </div>
                    <div className="right">
                        <div className="inputSelect">
                            <input type="number" onBlur={this.valueWidth} data-cy="connectButtonWidth"
                                   defaultValue={acceptButtonSize.width}/>
                            <select name="" id="" disabled>
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="rem">rem</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="">Padding</span>
                    </div>
                    <div className="right">

                        <div className="inputSelect">
                            <input type="number" onBlur={this.valuePadding} data-cy="connectButtonPadding"
                                   defaultValue={acceptButtonSize.padding}/>
                            <select name="" id="" disabled>
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="rem">rem</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default AgreementButton;
