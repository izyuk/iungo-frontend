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
        setting: this.context.dataToExclude.gdprSettingsSetting,
        agreeWithTermsAndConditionsLabel: this.context.dataToExclude.agreeWithTermsAndConditionsLabel,
        allowToUsePersonalInfoLabel: this.context.dataToExclude.allowToUsePersonalInfoLabel,
        settingId: this.context.termAndConditionId,
        settingsCollection: this.context.dataToExclude.gdprList
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
        const {displayColorPicker, fontInputData, settingsCollection, ...rest} = currentState;
        this.context.setGDPRSettings(rest);
    };

    fontInputHandler = (value) => {
        const currentState = this.state;
        currentState.fontInputData = parseInt(value);
        this.setState(currentState);
        const {displayColorPicker, fontInputData, settingsCollection, ...rest} = currentState;
        this.context.setGDPRSettings(rest);
    };

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker});
    };

    handleClose = () => {
        this.setState({displayColorPicker: false});
    };

    settingHandler = (e) => {
        if (e) {
            const currentState = this.state;
            currentState.setting = e.currentTarget.options[e.currentTarget.selectedIndex].value;
            console.log(e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute('dataid'));
            const dataid = e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute('dataid');
            const gdprContent = currentState.settingsCollection.reduce((obj, item) => {
                if (item.id === parseInt(dataid)) {
                    obj['agreeWithTermsAndConditionsLabel'] = item.agreeWithTermsAndConditionsLabel;
                    obj['allowToUsePersonalInfoLabel'] = item.allowToUsePersonalInfoLabel;
                    obj['settingId'] = item.id;
                }
                return obj;
            }, {});
            currentState.agreeWithTermsAndConditionsLabel = gdprContent.agreeWithTermsAndConditionsLabel;
            currentState.allowToUsePersonalInfoLabel = gdprContent.allowToUsePersonalInfoLabel;
            currentState.settingId = gdprContent.settingId;
            this.setState(currentState);
            const span = e.currentTarget.nextSibling.children[0];
            span.innerText = e.currentTarget.options[e.currentTarget.selectedIndex].value;
            const {displayColorPicker, fontInputData, settingsCollection, ...rest} = currentState;
            this.context.setGDPRSettings(rest);
            this.context.setGDPRSettingsStatus(true);
        } else {
            const currentState = this.state;
            const gdprFromBE = this.context.dataToExclude.gdprFromBE;
            console.log(currentState.setting);
            console.log('gdprFromBE: ', gdprFromBE);
            if (!!gdprFromBE && (gdprFromBE.name === 'GDPR default')) {
                this.setting.current.value = 'Yes';
                currentState.agreeWithTermsAndConditionsLabel = gdprFromBE.agreeWithTermsAndConditionsLabel;
                currentState.allowToUsePersonalInfoLabel = gdprFromBE.allowToUsePersonalInfoLabel;
                currentState.settingId = gdprFromBE.id;
                currentState.setting = 'Yes';
            } else {
                currentState.setting = 'No';
            }
            const svg = this.setting.current.nextSibling.children[0];
            const span = document.createElement('span');
            span.innerText = this.setting.current.options[this.setting.current.selectedIndex].value;
            this.setting.current.nextSibling.insertBefore(span, svg);

            const {displayColorPicker, fontInputData, settingsCollection, ...rest} = currentState;
            this.context.setGDPRSettings(rest);
        }
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.state.settingsCollection !== nextState.settingsCollection) ||
            (this.state.displayColorPicker !== nextState.displayColorPicker);
    }

    handleChange = (color) => {
        const currentState = this.state;
        currentState.color.rgba = color.rgb;
        currentState.color.hex = color.hex;
        this.setState(currentState);
        const {displayColorPicker, fontInputData, settingsCollection, ...rest} = currentState;
        this.context.setGDPRSettings(rest);
    };

    async componentDidMount() {
        this.settingHandler();
        if (this.context.termAndConditionId) {
            this.context.setGDPRSettingsStatus(true);
        }
    }

    componentWillUnmount() {
        const currentState = this.state;
        const {displayColorPicker, fontInputData, settingsCollection, ...rest} = currentState;
        this.context.setGDPRSettings(rest);
        if (this.context.dataToExclude.gdprSettingsSetting === 'No') {
            this.context.setGDPRSettingsStatus(false);
        }
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
        const {settingsCollection} = this.state;
        if (settingsCollection) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="logoLeft">
                    <span className="descr position">
                        Enable
                    </span>
                        </div>
                        <div className="right">
                            <div className="innerRow">
                                <div className="innerCol">
                                    <div className="innerRow">
                                        <select ref={this.setting}
                                                data-cy={'gdprSettings'}
                                                onChange={this.settingHandler}>
                                            <option dataid="" value="No">No</option>
                                            {
                                                settingsCollection &&
                                                settingsCollection.map((item, i) => {
                                                    return (<option key={i} dataid={item.id}
                                                                    value='Yes'>Yes</option>)
                                                })
                                            }

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
                                            onClick={this.handleClick} data-cy="gdprTextColor">
                                    </button>
                                    {
                                        this.state.displayColorPicker ?
                                            <div style={popover}>
                                                <div style={cover} onClick={this.handleClose}/>
                                                <SketchPicker color={this.state.color.rgba}
                                                              onChange={this.handleChange}/>
                                            </div>
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <p style={{
                        width: '100%',
                        textAlign: 'center',
                        color: '#ff90ad',
                        backgroundColor: 'rgba(255,144,173,.5)',
                        border: '2px solid #ff90ad',
                        borderRadius: '5px',
                        margin: '5px'
                    }}>
                        Before you will be able to manage GDPR settings, please fill profile page with your information
                    </p>
                </div>
            )
        }

    }
}

export default GDPR;