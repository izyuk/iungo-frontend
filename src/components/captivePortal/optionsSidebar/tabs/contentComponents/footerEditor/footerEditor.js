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

class FooterEditor extends Component {
    static contextType = CaptivePortalContext;
    state = {
        displayColorPicker: false,
        fontInputData: this.context.style.footer.fontSize,
        color: {rgba: this.context.style.footer.color.rgba, hex: this.context.style.footer.color.hex},
        fontSize: this.context.style.footer.fontSize,
        textActions: this.context.style.footer.textActions,
        alignment: this.context.style.footer.alignment,
        family: this.context.style.footer.family
    };

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
        this.context.setFooterData(rest);
    };

    fontInputHandler = (value) => {
        const currentState = this.state;
        currentState.fontInputData = parseInt(value);
        this.setState(currentState);
        const {displayColorPicker, fontInputData, ...rest} = currentState;
        this.context.setFooterData(rest);
    };

    componentDidMount() {
        document.getElementById(this.context.style.footer.alignment).checked = true;
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
        const {displayColorPicker, fontInputData, ...rest} = currentState;
        this.context.setFooterData(rest);
    };

    textActionsHandler = (e) => {
        const name = e.currentTarget.getAttribute('data-type');
        const currentState = this.state;
        currentState.textActions[name] = !this.state.textActions[name];
        this.setState(currentState);
        const {displayColorPicker, fontInputData, ...rest} = currentState;
        this.context.setFooterData(rest);
    };

    textChanges = (e) => {
        const activeLocale = this.context.dataToExclude.activeLocale || null;
        this.context.setTranslations(activeLocale, { footer: e.currentTarget.value });
    };

    alignment = (e) => {
        const currentState = this.state;
        currentState.alignment = e.target.getAttribute('data-id');
        this.setState(currentState);
        const {displayColorPicker, fontInputData, ...rest} = currentState;
        this.context.setFooterData(rest);
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
        const language = this.context.dataToExclude.activeLocale || null;
        const translation = this.context.translations[language] || {};
        const isEditingOnPreview = (this.context.dataToExclude.activeSettingsPath === 'content.footer.footer');
        return (
            <div className="container active">
                <div className="row">
                    <div className="right">
                        <div className="innerRow">
                            <div className="textActions">
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.bold ? "active" : ''}
                                        data-cy="footerTopBold"
                                        type="button"
                                        data-type="bold">B
                                </button>
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.italic ? "active" : ''}
                                        data-cy="footerTopItalic"
                                        type="button"
                                        data-type="italic">i
                                </button>
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.underline ? "active" : ''}
                                        data-cy="footerTopUnderline"
                                        type="button"
                                        data-type="underline">U
                                </button>
                            </div>
                            <div className="innerCol toRow">
                                <label htmlFor="left">Left
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='left' data-id='left' type="radio"
                                               name='alignment' data-cy="footerTopLeft"/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                                <label htmlFor="center">Center
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='center' data-id='center' type="radio"
                                               name='alignment' data-cy="footerTopCenter"/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                                <label htmlFor="right">Right
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='right' data-id='right' type="radio"
                                               name='alignment' data-cy="footerTopRight"/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="innerRow">
                            <textarea onChange={this.textChanges} data-cy="footerText" onMouseUp={this.getText}
                                      value={translation.footer}
                                      className={isEditingOnPreview ? 'currentlyEditingField' : ''}>
                            </textarea>
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
                                            backgroundColor: Palette.getColor('BLUE').hex,
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
                                            backgroundColor: Palette.getColor('BLUE').hex,
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
                                       data-cy="footerFontSize"/>
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
                                        onClick={this.handleClick} data-cy="footerTextColor"></button>
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
            </div>
        )
    }
}

export default FooterEditor;
