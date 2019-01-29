import React, {Component} from 'react';
import {SketchPicker} from "react-color";
import connect from "react-redux/es/connect/connect";
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

class FooterEditor extends Component {
    constructor(props) {
        super(props);
        let storage = this.props.footer.styles;

        this.state = {
            displayColorPicker: false,
            color: storage.color.rgba || {
                r: 85,
                g: 133,
                b: 237,
                a: 1,
            },
            colorHEX: storage.color.hex || '#5585ed',
            fontSize: storage.fontSize || 18,
            textActions: storage.textActions || {
                bold: false,
                italic: false,
                underline: false,
            },
            text: storage.text || 'Footer content',
            alignment: storage.alignment ||'center',
        };
    }

    onSliderChange = (value) => {
        this.setState({
            fontSize: value
        });
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.fontSize !== nextState.opacity) {
            return true;
        } /*else if (this.state.color.hex !== nextState.color.hex) {
            return true;
        }*/ else if (this.state.color !== nextState.color) {
            return true;
        } else if (this.state.displayColorPicker !== nextState.displayColorPicker) {
            return true;
        } else if (this.state.textActions !== nextState.textActions) {
            return true;
        } else if (this.state.text !== nextState.text) {
            return true;
        } else
            return false;
    }

    componentDidMount() {
        let {displayColorPicker, text, color, colorHEX, ...rest} = this.state;
        this.props.textData(text, {color: {rgba: color, hex: colorHEX}, ...rest});
        this.props.footerTextData({color: {rgba: color, hex: colorHEX}, ...rest});
        let storage = this.props.footer.styles;
        document.getElementById((storage ? storage.alignment : 'center')).checked = true;
    }

    componentDidUpdate() {
        let {displayColorPicker, text, color, colorHEX, ...rest} = this.state;

        this.props.textData(text, {color: {rgba: color, hex: colorHEX}, ...rest});
        this.props.footerTextData({color: {rgba: color, hex: colorHEX}, ...rest});
    }

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker});
    };

    handleClose = () => {
        this.setState({displayColorPicker: false});
    };

    handleChange = (color) => {
        const setColor = this.state.color.rgba;
        const hex = this.state.color.hex;
        this.setState({
            color: color.rgb
        });
        this.setState({
            colorHEX: color.hex
        })
    };

    textActionsHandler = (e) => {
        let name = e.currentTarget.getAttribute('data-type');
        let currentState = this.state;
        currentState.textActions[name] = !this.state.textActions[name];

        this.setState(currentState);
    };

    textChanges = (e) => {
        this.setState({
            text: e.currentTarget.value
        })
    };

    alignment = (e) => {
        this.setState({
            alignment: e.target.getAttribute('data-id')
        });
    };

    // getText = (e) => {
    //
    // };

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
                    <div className="right">
                        <div className="innerRow">
                            <div className="textActions">
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.bold ? "active" : ''}
                                        type="button"
                                        data-type="bold">B
                                </button>
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.italic ? "active" : ''}
                                        type="button"
                                        data-type="italic">i
                                </button>
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.underline ? "active" : ''}
                                        type="button"
                                        data-type="underline">U
                                </button>
                            </div>
                            <div className="innerCol toRow">
                                <label htmlFor="left">Left
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='left' data-id='left' type="radio"
                                               name='alignment'/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                                <label htmlFor="center">Center
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='center' data-id='center' type="radio"
                                               name='alignment'/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                                <label htmlFor="right">Right
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='right' data-id='right' type="radio"
                                               name='alignment'/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="innerRow">
                            <textarea onChange={this.textChanges} onMouseUp={this.getText}
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
                                    {`${this.state.fontSize}px`}
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
                                <input type="text" value={this.state.colorHEX} disabled/>
                                <button ref={this.cpbButton}
                                        style={{backgroundColor: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`}}
                                        onClick={this.handleClick}></button>
                                {
                                    this.state.displayColorPicker ?
                                        <div style={popover}>
                                            <div style={cover} onClick={this.handleClose}/>
                                            <SketchPicker color={this.state.color} onChange={this.handleChange}/>
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

export default connect(
    state => ({
        footer: state.footer
        // footer: stated
    }),
    dispatch => ({
        textData: (text, styles) => {
            dispatch({type: "FOOTER_DESCRIPTION", payload: {text, styles}});
        }
    })
)(FooterEditor);
