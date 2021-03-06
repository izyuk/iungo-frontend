import React, {Component} from 'react';
import {SketchPicker} from "react-color";
import Palette from '~/static/styles/palette';
import Tooltip from 'rc-tooltip';
import Slider from "rc-slider";
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

class HeaderDescription extends Component {
    static contextType = CaptivePortalContext;
    state = {
        displayColorPicker: false,
        fontInputData: this.context.style.header.description.fontSize,
        color: {rgba:this.context.style.header.description.color.rgba, hex: this.context.style.header.description.color.hex},
        fontSize: this.context.style.header.description.fontSize,
        textActions: this.context.style.header.description.textActions,
        alignment: this.context.style.header.description.alignment,
        family: this.context.style.header.description.family
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
        const {displayColorPicker, fontInputData, color, ...rest} = this.state;
        this.context.setHeaderDescriptionData({color: color, ...rest});
    };

    fontInputHandler = (value) => {
        const currentState = this.state;
        currentState.fontInputData = value;
        this.setState(currentState);
        const {displayColorPicker, fontInputData, color, ...rest} = this.state;
        this.context.setHeaderDescriptionData({color: color, ...rest});
    };

    componentDidMount() {
        const {displayColorPicker, fontInputData, color, ...rest} = this.state;
        this.context.setHeaderDescriptionData({color: color, ...rest});
        document.getElementById(this.context.style.header.description.alignment).checked = true;
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
        const {displayColorPicker, fontInputData, ...rest} = this.state;
        this.context.setHeaderDescriptionData({color: this.state.color, ...rest});
    };

    textActionsHandler = (e) => {
        let name = e.currentTarget.getAttribute('data-type');
        let currentState = this.state;
        currentState.textActions[name] = !this.state.textActions[name];

        this.setState(currentState);
        const {displayColorPicker, fontInputData, color, ...rest} = this.state;
        this.context.setHeaderDescriptionData({color: color, ...rest});
    };

    textChanges = (e) => {
        const activeLocale = this.context.dataToExclude.activeLocale || null;
        this.context.setTranslations(activeLocale, { description: e.currentTarget.value });
    };

    alignment = (e) => {
        const currentState = this.state;
        currentState.alignment = e.target.getAttribute('data-id');
        this.setState(currentState);
        const {displayColorPicker, fontInputData, color, ...rest} = this.state;
        this.context.setHeaderDescriptionData({color: color, ...rest});
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
        const isEditingOnPreview = (this.context.dataToExclude.activeSettingsPath === 'content.header.description');
        return (
            <div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="header">Description</span>
                    </div>
                </div>
                <div className="row">
                    <div className="right">
                        <div className="innerRow">
                            <div className="textActions">
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.bold ? "active" : ''}
                                        data-cy="headerDescriptionBold"
                                        type="button"
                                        data-type="bold">B
                                </button>
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.italic ? "active" : ''}
                                        data-cy="headerDescriptionItalic"
                                        type="button"
                                        data-type="italic">i
                                </button>
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.underline ? "active" : ''}
                                        data-cy="headerDescriptionUnderline"
                                        type="button"
                                        data-type="underline">U
                                </button>
                            </div>
                            <div className="innerCol toRow">
                                <label htmlFor="left">Left
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='left' data-id='left' type="radio"
                                               name='alignment' data-cy="headerDescriptionLeft"/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                                <label htmlFor="center">Center
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='center' data-id='center' type="radio"
                                               name='alignment' data-cy="headerDescriptionCenter"/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                                <label htmlFor="right">Right
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='right' data-id='right' type="radio"
                                               name='alignment' data-cy="headerDescriptionRight"/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="innerRow">
                            <textarea onChange={this.textChanges} data-cy="headerDescriptionText"
                                      value={translation.description}
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
                                        value={this.state.fontSize}
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
                                       data-cy="headerDescriptionFontSize"/>
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
                                        onClick={this.handleClick} data-cy="headerDescriptionColor"></button>
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
            </div>
        )
    }
}

export default HeaderDescription;
