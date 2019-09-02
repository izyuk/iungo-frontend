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

class SuccessActions extends Component {

    static contextType = CaptivePortalContext;

    state = {
        displayColorPicker: false,
        fontInputData: this.context.style.success_message.fontSize,
        color: {rgba: this.context.style.success_message.color.rgba, hex: this.context.style.success_message.color.hex},
        fontSize: this.context.style.success_message.fontSize,
        textActions: this.context.style.success_message.textActions,
        text: this.context.successMessage,
        alignment: this.context.style.success_message.alignment,
        redirectURL: this.context.successRedirectUrl,
        family: this.context.style.success_message.family
    };

    onSliderChange = (value) => {
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
        const {displayColorPicker, fontInputData, text, color, redirectURL, ...rest} = this.state;
        this.context.setSuccessMessageData(text, {color: color, ...rest});
    };

    fontInputHandler = (value) => {
        const currentState = this.state;
        currentState.fontInputData = parseInt(value);
        this.setState(currentState);
        const {displayColorPicker, fontInputData, text, color, redirectURL, ...rest} = currentState;
        this.context.setSuccessMessageData(text, {color: color, ...rest});
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.fontSize !== nextState.opacity) return true;
        else if (this.state.color !== nextState.color) return true;
        else if (this.state.displayColorPicker !== nextState.displayColorPicker) return true;
        else if (this.state.textActions !== nextState.textActions) return true;
        else if (this.state.text !== nextState.text) return true;
        else if (this.state.redirectURL !== nextState.redirectURL) return true;
        else if (this.state.alignment !== nextState.alignment) return true;
        else return false;
    }

    componentDidMount() {
        this.context.setSuccessMessageStatus(true);
        document.getElementById(this.context.style.success_message.alignment).checked = true;
    }

    componentWillUnmount() {
        this.context.setSuccessMessageStatus(false);
        const {displayColorPicker, fontInputData, text, color, redirectURL, ...rest} = this.state;
        this.context.setSuccessMessageData(text, {color: color, ...rest});
        this.context.redirectURLChanger(redirectURL);
    }

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker});
    };

    handleClose = () => {
        this.setState({displayColorPicker: false});
    };

    handleChange = (color) => {
        const currentState = this.state;
        currentState.color.rgba = color.rgb;
        currentState.color.hex = color.hex;
        Palette.addUserColor(color.hex);
        this.setState(currentState);
        const {displayColorPicker, fontInputData, text, redirectURL, ...rest} = currentState;
        this.context.setSuccessMessageData(text, {color: this.state.color, ...rest});
    };

    textActionsHandler = (e) => {
        const name = e.currentTarget.getAttribute('data-type');
        const currentState = this.state;
        currentState.textActions[name] = !this.state.textActions[name];
        this.setState(currentState);
        const {displayColorPicker, fontInputData, text, color, redirectURL, ...rest} = currentState;
        this.context.setSuccessMessageData(text, {color: color, ...rest});
    };

    textChanges = (e) => {
        const currentState = this.state;
        currentState.text = e.currentTarget.value;
        this.setState(currentState);
        const {displayColorPicker, fontInputData, text, color, redirectURL, ...rest} = currentState;
        this.context.setSuccessMessageData(text, {color: color, ...rest});
    };

    redirectURLChanges = (e) => {
        const url = e.currentTarget.value;
        const currentState = this.state;
        if(url.length > 0){
            if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) {
                currentState.redirectURL = url;
                this.setState(currentState)
            } else {
                e.currentTarget.value = 'http://'+e.currentTarget.value;
                currentState.redirectURL = e.currentTarget.value;
                this.setState(currentState);

            }
        } else {
            currentState.redirectURL = e.currentTarget.value;
            this.setState(currentState);
        }
        const {displayColorPicker, fontInputData, text, color, redirectURL, ...rest} = currentState;
        this.context.setSuccessMessageData(text, {color: color, ...rest});
    };

    alignment = (e) => {
        const currentState = this.state;
        currentState.alignment = e.target.getAttribute('data-id');
        this.setState(currentState);
        const {displayColorPicker, fontInputData, text, color, redirectURL, ...rest} = currentState;
        this.context.setSuccessMessageData(text, {color: color, ...rest});
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
        return (
            <div className="container active">
                <div className="row">
                    <div className="right">
                        <div className="innerRow">
                            <div className="textActions">
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.bold ? "active" : ''}
                                        data-cy="successTextBold"
                                        type="button"
                                        data-type="bold">B
                                </button>
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.italic ? "active" : ''}
                                        data-cy="successTextItalic"
                                        type="button"
                                        data-type="italic">i
                                </button>
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.underline ? "active" : ''}
                                        data-cy="successTextUnderline"
                                        type="button"
                                        data-type="underline">U
                                </button>
                            </div>
                            <div className="innerCol toRow">
                                <label htmlFor="left">Left
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='left' data-id='left' type="radio"
                                               name='alignment' data-cy="successTextLeft"/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                                <label htmlFor="center">Center
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='center' data-id='center' type="radio"
                                               name='alignment' data-cy="successTextCenter"/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                                <label htmlFor="right">Right
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='right' data-id='right' type="radio"
                                               name='alignment' data-cy="successTextRight"/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="innerRow">
                            <textarea onChange={this.textChanges} data-cy="successText" onMouseUp={this.getText}
                                      defaultValue={this.state.text}></textarea>
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
                                       data-cy="successTextFontSize"/>
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
                                        style={{backgroundColor: `rgba(${ this.state.color.rgba.r }, ${ this.state.color.rgba.g }, ${ this.state.color.rgba.b }, ${ this.state.color.rgba.a })`}}
                                        onClick={this.handleClick} data-cy="successTextColor"></button>
                                {
                                    this.state.displayColorPicker ?
                                        <div style={popover}>
                                            <div style={cover} onClick={this.handleClose}/>
                                            <SketchPicker color={this.state.color.rgba}
                                                          onChange={this.handleChange}
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
                    <div className="right">
                        <div className="innerRow">
                                <textarea onBlur={this.redirectURLChanges} data-cy="successPageRedirect"
                                          defaultValue={this.state.redirectURL}
                                          placeholder="Enter your redirect URL"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SuccessActions;
