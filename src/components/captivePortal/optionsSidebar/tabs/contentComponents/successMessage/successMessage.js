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

class SuccessActions extends Component {
    storage = this.props;
    _isMounted = false;

    state = {
        displayColorPicker: false,
        fontInputData: this.storage.successMessage.styles.fontSize || 18,
        color: this.storage.successMessage.styles.color.rgba || {
            r: 85,
            g: 133,
            b: 237,
            a: 1,
        },
        colorHEX: this.storage.successMessage.styles.color.hex || '#5585ed',
        fontSize: this.storage.successMessage.styles.fontSize || 18,
        textActions: this.storage.successMessage.styles.textActions || {
            bold: false,
            italic: false,
            underline: false,
        },
        text: this.storage.successMessage.text || 'Success message',
        alignment: this.storage.successMessage.styles.alignment || 'center',
        redirectURL: this.storage.redirectURL.url || ''
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
    };

    fontInputHandler = (value) => {
        this.setState({
            fontInputData: parseInt(value)
        });
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.fontSize !== nextState.opacity) return true;
        else if (this.state.color !== nextState.color) return true;
        else if (this.state.displayColorPicker !== nextState.displayColorPicker) return true;
        else if (this.state.textActions !== nextState.textActions) return true;
        else if (this.state.text !== nextState.text) return true;
        else if (this.state.redirectURL !== nextState.redirectURL) return true;
        else return false;
    }

    componentDidMount() {
        this._isMounted = true;

        const {displayColorPicker, fontInputData, text, color, colorHEX, redirectURL, ...rest} = this.state;
        this.props.textData(text, {color: {rgba: color, hex: colorHEX}, ...rest});
        this.props.redirectURLChanger(redirectURL);
        this.props.successData({color: {rgba: color, hex: colorHEX}, redirectURL, status: this._isMounted, ...rest});
        document.getElementById((this.storage.successData.styles ? this.storage.successData.styles.alignment : 'center')).checked = true;
    }

    componentDidUpdate() {
        const {displayColorPicker, fontInputData, text, color, colorHEX, redirectURL, ...rest} = this.state;
        this.props.textData(text, {color: {rgba: color, hex: colorHEX}, ...rest});
        this.props.redirectURLChanger(redirectURL);
        this.props.successData({color: {rgba: color, hex: colorHEX}, redirectURL, status: this._isMounted, ...rest});
    }

    componentWillUnmount() {
        this._isMounted = false;
        const {displayColorPicker, fontInputData, text, color, colorHEX, redirectURL, ...rest} = this.state;
        this.props.textData(text, {color: {rgba: color, hex: colorHEX}, ...rest});
        this.props.redirectURLChanger(redirectURL);
        this.props.successData({color: {rgba: color, hex: colorHEX}, redirectURL, status: this._isMounted, ...rest});
    }

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker});
    };

    handleClose = () => {
        this.setState({displayColorPicker: false});
    };

    handleChange = (color) => {
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

    redirectURLChanges = (e) => {
        const url = e.currentTarget.value;
        if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
            this.setState({
                redirectURL: e.currentTarget.value
            })
        } else {
            e.currentTarget.value = 'http://'+e.currentTarget.value;
            this.setState({
                redirectURL: 'http://'+e.currentTarget.value
            });

        }
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
            <div className="container">
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
                                <input type="text" value={this.state.colorHEX} disabled/>
                                <button ref={this.cpbButton}
                                        style={{backgroundColor: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`}}
                                        onClick={this.handleClick} data-cy="successTextColor"></button>
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

export default connect(
    state => ({
        successMessage: state.successMessage,
        redirectURL: state.redirectURL
    }),
    dispatch => ({
        textData: (text, styles) => {
            dispatch({type: "SUCCESS_MESSAGE_DESCRIPTION", payload: {text, styles}});
        },
        redirectURLChanger: (url) => {
            dispatch({type: "REDIRECT_URL", payload: url});
        }
    })
)(SuccessActions);
