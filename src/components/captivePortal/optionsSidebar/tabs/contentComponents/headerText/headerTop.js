import React, {Component} from 'react';
import {SketchPicker} from "react-color";
import {connect} from "react-redux";
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

class HeaderTop extends Component {
    constructor(props) {
        super(props);
        let storage = this.props.header.top;
        this.state = {
            displayColorPicker: false,
            fontInputData: storage.styles.fontSize || 18,
            colorHEX: storage.styles.color.hex || '#5585ed',
            color: storage.styles.color.rgba || {
                r: 85,
                g: 133,
                b: 237,
                a: 1,
            },
            fontSize: storage.styles.fontSize || 18,
            textActions: storage.styles.textActions || {
                bold: false,
                italic: false,
                underline: false,
            },
            text: storage.text || 'Venue name',
            alignment: storage.styles.alignment || 'center'
        };

    }

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
    };

    fontInputHandler = (value) => {
        this.setState({
            fontInputData: parseInt(value)
        });
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.fontSize !== nextState.fontSize) {
            return true;
        } else if (this.state.colorHEX !== nextState.colorHEX) {
            return true;
        } else if (this.state.color !== nextState.color) {
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
        const {displayColorPicker, fontInputData, text, colorHEX, color, ...rest} = this.state;
        this.props.textData(text, {color:  {rgba: color, hex: colorHEX}, ...rest});
        this.props.handler({color:  {rgba: color, hex: colorHEX}, ...rest});
        const storage = this.props.header.top;
        document.getElementById((storage ? storage.styles.alignment : 'center')+'2').checked = true;
    }

    componentDidUpdate() {
        const {displayColorPicker, fontInputData, text, colorHEX, color, ...rest} = this.state;
        this.props.textData(text, {color:  {rgba: color, hex: colorHEX}, ...rest});
        this.props.handler({color:  {rgba: color, hex: colorHEX}, ...rest});
    }

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker});
    };

    handleClose = () => {
        this.setState({displayColorPicker: false});
    };

    handleChange = (color) => {
        this.setState({
            color: {
                r: color.rgb.r,
                g: color.rgb.g,
                b: color.rgb.b,
                a: color.rgb.a
            }
        });
        this.setState({colorHEX: color.hex});
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
            <div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="header">Top</span>
                    </div>
                </div>
                <div className="row">
                    <div className="right">
                        <div className="innerRow">
                            <div className="textActions">
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.bold ? "active" : ''}
                                        data-cy="headerTopBold"
                                        type="button"
                                        data-type="bold">B
                                </button>
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.italic ? "active" : ''}
                                        data-cy="headerTopItalic"
                                        type="button"
                                        data-type="italic">i
                                </button>
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.underline ? "active" : ''}
                                        data-cy="headerTopUnderline"
                                        type="button"
                                        data-type="underline">U
                                </button>
                            </div>
                            <div className="innerCol toRow">
                                <label htmlFor="left2">Left
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='left2' data-id='left' type="radio" name='alignment2' data-cy="headerTopLeft"/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                                <label htmlFor="center2">Center
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='center2' data-id='center' type="radio" name='alignment2' data-cy="headerTopCenter"/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                                <label htmlFor="right2">Right
                                    <div className="inputRadioWrap">
                                        <input onChange={this.alignment} id='right2' data-id='right' type="radio" name='alignment2' data-cy="headerTopRight"/>
                                        <span className="radio"></span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="innerRow">
                            <textarea onChange={this.textChanges} data-cy="headerTopText" defaultValue={this.state.text}></textarea>
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
                                       data-cy="headerTopFontSize"/>
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
                                <input type="text" value={this.state.colorHEX} disabled/>
                                <button ref={this.cpbButton}
                                        style={{backgroundColor: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`}}
                                        onClick={this.handleClick}
                                data-cy="headerTopColor"></button>
                                {this.state.displayColorPicker ? <div style={popover}>
                                    <div style={cover} onClick={this.handleClose}/>
                                    <SketchPicker color={this.state.color} onChange={this.handleChange}/>
                                </div> : null}
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
        header: state.header
    }),
    dispatch => ({
        textData: (text, styles) => {
            dispatch({type: "HEADER_TOP", payload: {text, styles}});
        }
    })
)(HeaderTop);
