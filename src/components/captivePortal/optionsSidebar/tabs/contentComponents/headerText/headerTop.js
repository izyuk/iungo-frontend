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

class HeaderTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            colorHEX: this.props.header_top_text_data.colorHEX || '#ffffff',
            color: this.props.header_top_text_data.color || {
                r: '255',
                g: '255',
                b: '255',
                a: '1',
            },
            fontSize: this.props.header_top_text_data.fontSize || '18',
            // dimension: this.props.header_top_text_data.dimension || 'px',
            textActions: {
                bold: false,
                italic: false,
                underline: false,
            }
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
        this.textActionsHandler = this.textActionsHandler.bind(this);
    }

    onSliderChange(value) {
        this.setState({
            fontSize: value
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.fontSize !== nextState.opacity) {
            return true;
        } else if (this.state.colorHEX !== nextState.colorHEX) {
            return true;
        } else if (this.state.color !== nextState.color) {
            return true;
        } else if (this.state.displayColorPicker !== nextState.displayColorPicker) {
            return true;
        } else
            return false;
    }

    componentDidMount() {
        // let select = document.querySelectorAll('[ data-component="ContentBackground"]');
        // for (let i = 0; i < select.length; i++) {
        //     let svg = select[i].nextSibling.children[0];
        //     let span = document.createElement('span');
        //     span.innerText = select[i].options[select[i].selectedIndex].value;
        //     select[i].nextSibling.insertBefore(span, svg);
        // }
        // let {displayColorPicker, ...rest} = this.state;
        // console.log('background STATE', this.state);
        // console.log('background STORAGE', this.props.content_background);
        // this.props.backgroundStyle(rest);
        // this.props.handler(rest);
    }

    componentDidUpdate() {
        // let {displayColorPicker, ...rest} = this.state;
        // this.props.backgroundStyle(rest);
        // this.props.handler(rest);
        // console.log('background STORAGE UPDATED', this.props.content_background);
        // console.log('background STATE UPDATED', this.state);
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

    textActionsHandler(e) {
        console.log(e.currentTarget);
        console.log(e.currentTarget.getAttribute('data-type'));
        let name = e.currentTarget.getAttribute('data-type');
        let currentState = this.state.textActions[name];
        this.setState({
            currentState: !currentState
        });
        console.log(this.state.textActions);
        console.log(this.state.textActions[name]);
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
            <div>
                <div className={this.props.style.row}>
                    <div className={this.props.style.logoLeft}>
                        <span className={this.props.style.header}>Top</span>
                    </div>
                </div>
                <div className={this.props.style.row}>
                    <div className={this.props.style.right}>
                        <div className={this.props.style.innerRow}>
                            <div className={this.props.style.textActions}>
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.bold ? this.props.style.active : ''}
                                        type="button"
                                        data-type="bold">B
                                </button>
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.italic ? this.props.style.active : ''}
                                        type="button"
                                        data-type="italic">i
                                </button>
                                <button onClick={this.textActionsHandler}
                                        className={this.state.textActions.underline ? this.props.style.active : ''}
                                        type="button"
                                        data-type="underline">U
                                </button>
                            </div>
                        </div>
                        <div className={this.props.style.innerRow}>
                            <textarea></textarea>
                        </div>
                    </div>
                </div>
                <div className={this.props.style.row}>
                    <div className={this.props.style.logoLeft}>
                        <span className={this.props.style}>Font size</span>
                    </div>
                    <div className={this.props.style.right}>
                        <div className={this.props.style.innerRow}>
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
                                <select className={this.props.style.medium} disabled
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
                                <p className={[this.props.style.select, this.props.style.medium].join(' ')}>
                                    {/*<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">*/}
                                    {/*<path fill="#BFC5D2" fillRule="nonzero"*/}
                                    {/*d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>*/}
                                    {/*</svg>*/}
                                    {`${this.state.fontSize}px`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.props.style.row}>
                    <div className={this.props.style.logoLeft}>
                        <span className={this.props.style}>Color</span>
                    </div>
                    <div className={this.props.style.right}>
                        <div className={this.props.style.innerRow}>
                            <div className={this.props.style.colorWrap}>
                                <input type="text" value={this.state.colorHEX} disabled/>
                                <button ref={this.cpbButton}
                                        style={{backgroundColor: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`}}
                                        onClick={this.handleClick}></button>
                                {this.state.displayColorPicker ? <div style={popover}>
                                    <div style={cover} onClick={this.handleClose}/>
                                    <SketchPicker color={this.state.color} onChange={this.handleChange}/>
                                </div> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.props.style.row}>
                    <div className={this.props.style.logoLeft}>
                        <span className={[this.props.style.descr, this.props.style.position].join(' ')}>
                            Alignment
                        </span>
                    </div>
                    <div className={this.props.style.right}>
                        <div className={this.props.style.innerCol}>
                            <label htmlFor="left">Left
                                <div className={this.props.style.inputRadioWrap}>
                                    <input onChange={this.alignment} id='left' type="radio" name='alignment'/>
                                    <span className={this.props.style.radio}></span>
                                </div>
                            </label>
                            <label htmlFor="center">Center
                                <div className={this.props.style.inputRadioWrap}>
                                    <input onChange={this.alignment} id='center' type="radio" name='alignment'/>
                                    <span className={this.props.style.radio}></span>
                                </div>
                            </label>
                            <label htmlFor="right">Right
                                <div className={this.props.style.inputRadioWrap}>
                                    <input onChange={this.alignment} id='right' type="radio" name='alignment'/>
                                    <span className={this.props.style.radio}></span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// export default HeaderTop;
export default connect(
    state => ({
        header_top_text_data: state.header_top_text_data
    }),
    dispatch => ({
        textColor: (data) => {
            dispatch({type: "HEADER_TOP_TEXT_COLOR", payload: data});
        }
    })
)(HeaderTop);
