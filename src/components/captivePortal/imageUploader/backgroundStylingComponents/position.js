import React, {Component} from 'react';
import CaptivePortalContext from "../../../../context/captive-portal-context";

export default class Position extends Component {


    static contextType = CaptivePortalContext;

    state = {
        option: this.context.style.background_and_logo.background.position.option,
        posX: this.context.style.background_and_logo.background.position.posX,
        posY: this.context.style.background_and_logo.background.position.posY,
    };

    posXInput = React.createRef();
    custom = React.createRef();

    backgroundPosition = (e) => {
        const currentState = this.state;
        if (e.currentTarget.getAttribute('datatype') === 'custom') {
            this.posXInput.current.focus();
        } else {
            currentState.option = e.currentTarget.getAttribute('datatype');
            this.context.setBackgroundPosition(currentState, false);
            this.setState(currentState);
        }
    };

    onFocusHandler = () => {
        const currentState = this.state;
        this.custom.current.checked = true;
        this.context.setBackgroundPosition(currentState, true);
    };

    changePosX = (e) => {
        const currentState = this.state;
        currentState.posX = e.currentTarget.value;
        currentState.option = `${e.currentTarget.value}% ${currentState.posY}%`;
        this.setState(currentState);
        this.context.setBackgroundPosition(currentState, true);
    };

    changePosY = (e) => {
        const currentState = this.state;
        currentState.posY = e.currentTarget.value;
        currentState.option = `${currentState.posX}% ${e.currentTarget.value}%`;
        this.setState(currentState);
        this.context.setBackgroundPosition(currentState, true);
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.state.option !== nextState.option)
    }

    componentDidMount() {
        const {style: {background_and_logo: {background: {position}}}} = this.context;
        if(position.inPercentDimension){
            this.custom.current.checked = true;
        } else {
            document.getElementById(`${position.option}`).checked = true;
        }
    }

    render() {
        return (
            <div className="row">
                <div className="logoLeft">
                    <span className="descr position">
                        Background position
                    </span>
                </div>
                <div className="right">
                    <div className="innerCol">
                        <label htmlFor="left-top">left top
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundPosition} id='left-top' datatype={'left top'}
                                       type="radio"
                                       name='background_position'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                        <label htmlFor="left-center">left center
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundPosition} id='left-center' datatype={'left center'}
                                       type="radio"
                                       name='background_position'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                        <label htmlFor="left-bottom">left bottom
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundPosition} id='left-bottom' datatype={'left bottom'}
                                       type="radio"
                                       name='background_position'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                        <label htmlFor="right-top">right top
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundPosition} id='right-top' datatype={'right top'}
                                       type="radio"
                                       name='background_position'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                        <label htmlFor="right-center">right center
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundPosition} id='right-center' datatype={'right center'}
                                       type="radio"
                                       name='background_position'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                        <label htmlFor="right-bottom">right bottom
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundPosition} id='right-bottom' datatype={'right bottom'}
                                       type="radio"
                                       name='background_position'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                        <label htmlFor="center-top">center top
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundPosition} id='center-top' datatype={'center top'}
                                       type="radio"
                                       name='background_position'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                        <label htmlFor="center-center">center center
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundPosition} id='center-center'
                                       datatype={'center center'} type="radio"
                                       name='background_position'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                        <label htmlFor="center-bottom">center bottom
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundPosition} id='center-bottom'
                                       datatype={'center bottom'} type="radio"
                                       name='background_position'/>
                                <span className="radio"> </span>
                            </div>
                        </label>

                        <label className={'inputs'} htmlFor="custom-number">
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundPosition}
                                       ref={this.custom}
                                       id='custom-number'
                                       datatype={'custom'} type="radio"
                                       name='background_position'/>
                                <span className="radio"> </span>
                                <p>enter your value</p>
                            </div>
                            <div className="inputRadioWrap">
                                <p className={'label'}>axis X</p>
                                <input onChange={this.changePosX}
                                       ref={this.posXInput}
                                       onFocus={this.onFocusHandler}
                                       id='custom-number-x'
                                       datatype={'custom-number-x'}
                                       name='background_position'
                                       type="number"
                                       placeholder={'By axis X'}
                                       step={'1'}
                                       defaultValue={this.state.posX}/>
                                &nbsp;%
                            </div>
                            <div className="inputRadioWrap">
                                <p className={'label'}>axis Y</p>
                                <input onChange={this.changePosY}
                                       onFocus={this.onFocusHandler}
                                       id='custom-number-y'
                                       datatype={'custom-number-y'}
                                       name='background_position'
                                       type="number"
                                       placeholder={'By axis Y'}
                                       step={'1'}
                                       defaultValue={this.state.posY}/>
                                &nbsp;%
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}