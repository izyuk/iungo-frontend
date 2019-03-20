import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SketchPicker} from "react-color";
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

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
    constructor(props) {
        super(props);

        let storage = this.props.loginAgreeButton;
        this.state = {
            acceptButtonText: storage.acceptButtonText || 'Default text',
            acceptButtonColor: storage.acceptButtonColor || {
                hex: '#ffffff',
                rgba: {r: 255, g: 255, b: 255, a: 1}
            },
            acceptButtonFont: storage.acceptButtonFont || {
                alignment: 'center',
                color: {
                    hex: '#5585ed',
                    rgba: {r: 85, g: 133, b: 237, a: 1}
                },
                fontSize: 18,
                textActions: {
                    bold: false,
                    italic: false,
                    underline: false
                }
            },
            acceptButtonSize: storage.acceptButtonSize || {
                width: 145,
                padding: 10
            },
            acceptButtonBorder: storage.acceptButtonBorder || {
                color: {
                    hex: '#5585ed',
                    rgba: {r: 85, g: 133, b: 237, a: 1}
                },
                radius: 5,
                type: "solid",
                thickness: 1
            },
            displayTextColorPicker: false,
            displayBackgroundColorPicker: false,
            displayBorderColorPicker: false,
        };
    }

    onSliderChange = (value) => {
        let acceptButtonFont = {...this.state.acceptButtonFont};
        acceptButtonFont.fontSize = value;
        this.setState({acceptButtonFont});
    };

    shouldComponentUpdate(nextProps, nextState) {
        // if (this.state.fontSize !== nextState.opacity) {
        //     return true;
        // }

        /*else if (this.state.color.hex !== nextState.color.hex) {
            return true;
        }*/

        if (this.state !== nextState) {
            return true;
        } else
            return false;
    }

    componentDidMount() {
        let select = document.querySelectorAll('[data-component="ContentBorder"]');
        for (let i = 0; i < select.length; i++) {
            let svg = select[i].nextSibling.children[0];
            select[0].value = this.state.acceptButtonBorder.type;
            select[1].value = this.state.acceptButtonBorder.thickness;
            select[2].value = this.state.acceptButtonBorder.radius;
            let span = document.createElement('span');
            span.innerText = select[i].options[select[i].selectedIndex].value;
            select[i].nextSibling.insertBefore(span, svg);
        }
        const {displayTextColorPicker, displayBackgroundColorPicker, displayBorderColorPicker, ...rest} = this.state;
        this.props.acceptButton(rest);
    }

    componentDidUpdate() {
        const {displayTextColorPicker, displayBackgroundColorPicker, displayBorderColorPicker, ...rest} = this.state;
        this.props.acceptButton(rest);
        this.props.buttonInfo(rest);
        console.log(rest);
    }

    handleTextColorClick = () => {
        this.setState({displayTextColorPicker: !this.state.displayTextColorPicker});
    };

    handleTextColorClose = () => {
        this.setState({displayTextColorPicker: false});
    };

    handleTextColorChange = (color) => {
        let acceptButtonFont = {...this.state.acceptButtonFont};
        acceptButtonFont.color.rgba = color.rgb;
        acceptButtonFont.color.hex = color.hex;
        this.setState({acceptButtonFont})
    };

    handleBackgroundColorClick = () => {
        this.setState({displayBackgroundColorPicker: !this.state.displayBackgroundColorPicker});
    };

    handleBackgroundColorClose = () => {
        this.setState({displayBackgroundColorPicker: false});
    };

    handleBackgroundColorChange = (color) => {
        let acceptButtonColor = {...this.state.acceptButtonColor};
        acceptButtonColor.rgba = color.rgb;
        acceptButtonColor.hex = color.hex;
        this.setState({acceptButtonColor})
    };

    handleBorderColorClick = () => {
        this.setState({displayBorderColorPicker: !this.state.displayBorderColorPicker});
    };

    handleBorderColorClose = () => {
        this.setState({displayBorderColorPicker: false});
    };

    handleBorderColorChange = (color) => {
        let acceptButtonBorder = {...this.state.acceptButtonBorder};
        acceptButtonBorder.color.rgba = color.rgb;
        acceptButtonBorder.color.hex = color.hex;
        this.setState({acceptButtonBorder})
    };

    select = (e) => {
        let data = e.currentTarget.options[e.currentTarget.selectedIndex].value;
        let span = e.currentTarget.nextSibling.children[0];
        span.innerText = data;
        let state = e.currentTarget.getAttribute('data-select');
        let acceptButtonBorder = {...this.state.acceptButtonBorder};
        acceptButtonBorder[state] = state !== 'type' ? parseInt(data) : data;
        console.log(acceptButtonBorder);
        this.setState({acceptButtonBorder});
    };

    textActionsHandler = (e) => {
        let acceptButtonFont = {...this.state.acceptButtonFont};
        let name = e.currentTarget.getAttribute('data-type');
        acceptButtonFont.textActions[name] = !acceptButtonFont.textActions[name];

        this.setState({acceptButtonFont});
    };

    emptyFieldCheck = (e) => {
        if(e.currentTarget.value === ''){
            this.setState({acceptButtonText: 'Default name'});
            e.currentTarget.value = 'Default name'
        }
    };

    textChanges = (e) => {
        this.setState({acceptButtonText: e.currentTarget.value})
    };

    alignment = (e) => {
        let acceptButtonFont = {...this.state.acceptButtonFont};
        acceptButtonFont.alignment = e.target.getAttribute('data-id');
        this.setState({acceptButtonFont});
    };

    valueWidth = (e) => {
        let acceptButtonSize = {...this.state.acceptButtonSize};
        if (e.target.value >= 500) {
            e.target.value = 500;
            acceptButtonSize.width = 500;
            this.setState({acceptButtonSize});
        } else if (e.target.value <= 120) {
            e.target.value = 120;
            acceptButtonSize.width = 120;
            this.setState({acceptButtonSize})
        } else {
            acceptButtonSize.width = parseInt(e.target.value);
            this.setState({acceptButtonSize});
        }
    };

    valuePadding = (e) => {
        let acceptButtonSize = {...this.state.acceptButtonSize};
        if (e.target.value >= 40) {
            e.target.value = 40;
            acceptButtonSize.padding = 40;
            this.setState({acceptButtonSize});
        } else if (e.target.value <= 0) {
            e.target.value = 0;
            acceptButtonSize.padding = 0;
            this.setState({acceptButtonSize});
        } else {
            acceptButtonSize.padding = parseInt(e.target.value);
            this.setState({acceptButtonSize});
        }
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
                    {/*<button type={'button'} style={{*/}
                        {/*width: acceptButtonSize.width,*/}
                        {/*padding: acceptButtonSize.padding,*/}
                        {/*color: `rgba(${ acceptButtonFont.color.rgba.r }, ${ acceptButtonFont.color.rgba.g }, ${ acceptButtonFont.color.rgba.b }, ${ acceptButtonFont.color.rgba.a })`,*/}
                        {/*backgroundColor: `rgba(${ acceptButtonColor.rgba.r }, ${ acceptButtonColor.rgba.g }, ${ acceptButtonColor.rgba.b }, ${ acceptButtonColor.rgba.a })`,*/}
                        {/*border: `${acceptButtonBorder.width}px ${acceptButtonBorder.type} rgba(${acceptButtonBorder.color.rgba.r}, ${acceptButtonBorder.color.rgba.g}, ${acceptButtonBorder.color.rgba.b}, ${acceptButtonBorder.color.rgba.a})`,*/}
                        {/*borderRadius: acceptButtonBorder.radius,*/}
                        {/*fontSize: acceptButtonFont.fontSize,*/}
                        {/*textAlign: acceptButtonFont.alignment,*/}
                        {/*fontWeight: acceptButtonFont.textActions.bold ? ' bold' : 100,*/}
                        {/*fontStyle: acceptButtonFont.textActions.italic ? 'italic' : 'unset',*/}
                        {/*textDecoration: acceptButtonFont.textActions.underline ? 'underline' : 'unset'*/}
                    {/*}}>*/}
                        {/*{acceptButtonText}*/}
                    {/*</button>*/}
                </div>
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
                                        type="button"
                                        data-type="bold">B
                                </button>
                                <button onClick={this.textActionsHandler}
                                        className={acceptButtonFont.textActions.italic ? "active" : ''}
                                        type="button"
                                        data-type="italic">i
                                </button>
                                <button onClick={this.textActionsHandler}
                                        className={acceptButtonFont.textActions.underline ? "active" : ''}
                                        type="button"
                                        data-type="underline">U
                                </button>
                            </div>
                            <div className="innerCol toRow">
                                <label htmlFor="left">
                                    <span>Left</span>
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='left' data-id='left' type="radio"
                                               name='alignment'/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                                <label htmlFor="center">
                                    <span>Center</span>
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='center' data-id='center' type="radio"
                                               name='alignment'/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                                <label htmlFor="right">
                                    <span>Right</span>
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='right' data-id='right' type="radio"
                                               name='alignment'/>
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
                                      defaultValue={acceptButtonText} />
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
                                    {`${acceptButtonFont.fontSize}px`}
                                </p>
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
                                        style={{backgroundColor: `rgba(${ acceptButtonFont.color.rgba.r }, ${ acceptButtonFont.color.rgba.g }, ${ acceptButtonFont.color.rgba.b }, ${ acceptButtonFont.color.rgba.a })`}}
                                        onClick={this.handleTextColorClick}>
                                </button>
                                {
                                    this.state.displayTextColorPicker ?
                                        <div style={popover}>
                                            <div style={cover} onClick={this.handleTextColorClose}/>
                                            <SketchPicker color={acceptButtonFont.color.rgba} onChange={this.handleTextColorChange}/>
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
                                        style={{backgroundColor: `rgba(${ acceptButtonColor.rgba.r }, ${ acceptButtonColor.rgba.g }, ${ acceptButtonColor.rgba.b }, ${ acceptButtonColor.rgba.a })`}}
                                        onClick={this.handleBackgroundColorClick}>
                                </button>
                                {
                                    this.state.displayBackgroundColorPicker ?
                                        <div style={popover}>
                                            <div style={cover} onClick={this.handleBackgroundColorClose}/>
                                            <SketchPicker color={acceptButtonColor.rgba} onChange={this.handleBackgroundColorChange}/>
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
                                <input type="text" value={acceptButtonBorder.color.hex} disabled/>
                                <button ref={this.cpbButton}
                                        style={{backgroundColor: `rgba(${ acceptButtonBorder.color.rgba.r }, ${ acceptButtonBorder.color.rgba.g }, ${ acceptButtonBorder.color.rgba.b }, ${ acceptButtonBorder.color.rgba.a })`}}
                                        onClick={this.handleBorderColorClick}>
                                </button>
                                {
                                    this.state.displayBorderColorPicker ?
                                        <div style={popover}>
                                            <div style={cover} onClick={this.handleBorderColorClose}/>
                                            <SketchPicker color={acceptButtonBorder.color.rgba} onChange={this.handleBorderColorChange}/>
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
                            <input type="number" onBlur={this.valueWidth} defaultValue={acceptButtonSize.width}/>
                            <select name="" id="" disabled>
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="rem">rem</option>
                            </select>
                            {/*<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">*/}
                            {/*<path fill="#BFC5D2" fillRule="nonzero"*/}
                            {/*d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>*/}
                            {/*</svg>*/}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="">Padding</span>
                    </div>
                    <div className="right">

                        <div className="inputSelect">
                            <input type="number" onBlur={this.valuePadding} defaultValue={acceptButtonSize.padding}/>
                            <select name="" id="" disabled>
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="rem">rem</option>
                            </select>
                            {/*<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">*/}
                            {/*<path fill="#BFC5D2" fillRule="nonzero"*/}
                            {/*d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>*/}
                            {/*</svg>*/}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default connect(
    state => ({
        loginAgreeButton: state.loginAgreeButton
    }),
    dispatch => ({
        buttonInfo: (data) => {
            dispatch({type: 'LOGIN_AGREE_BUTTON', payload: data})
        }
    })
)
(AgreementButton);
