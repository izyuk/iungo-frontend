import React, {Component} from 'react';
import CaptivePortalContext from "../../../../context/captive-portal-context";

export default class Size extends Component {


    static contextType = CaptivePortalContext;

    state = {
        option: this.context.style.background_and_logo.background.size.option,
        width: this.context.style.background_and_logo.background.size.width,
        height: this.context.style.background_and_logo.background.size.height
    };

    widthInput = React.createRef();
    custom = React.createRef();

    backgroundSize = (e) => {
        const currentState = this.state;
        if (e.currentTarget.getAttribute('datatype') === 'custom') {
            this.widthInput.current.focus();
        } else {
            currentState.option = e.currentTarget.getAttribute('datatype');
            this.context.setBackgroundSize(currentState, false);
            this.setState(currentState);
        }
    };

    onFocusHandler = () => {
        const currentState = this.state;
        this.custom.current.checked = true;
        this.context.setBackgroundSize(currentState, true);
    };

    changeWidth = (e) => {
        const currentState = this.state;
        currentState.width = e.currentTarget.value;
        currentState.option = `${e.currentTarget.value}% ${currentState.height}%`;
        this.setState(currentState);
        this.context.setBackgroundSize(currentState, true);
    };

    changeHeight = (e) => {
        const currentState = this.state;
        currentState.height = e.currentTarget.value;
        currentState.option = `${currentState.width}% ${e.currentTarget.value}%`;
        this.setState(currentState);
        this.context.setBackgroundSize(currentState, true);
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.state.option !== nextState.option)
    }

    componentDidMount() {
        const {style: {background_and_logo: {background: {size}}}} = this.context;
        if(size.inPercentDimension){
            this.custom.current.checked = true;
        } else {
            document.getElementById(`${size.option}`).checked = true;
        }
    }

    render() {
        return (
            <div className="row">
                <div className="logoLeft">
                    <span className="descr position">
                        Background size
                    </span>
                </div>
                <div className="right">
                    <div className="innerCol">
                        <label htmlFor="auto">auto
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundSize} id='auto' datatype={'auto'}
                                       type="radio"
                                       name='size'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                        <label htmlFor="cover">cover
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundSize} id='cover' datatype={'cover'}
                                       type="radio"
                                       name='size'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                        <label htmlFor="contain">contain
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundSize} id='contain' datatype={'contain'}
                                       type="radio"
                                       name='size'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                        <label className={'inputs'} htmlFor="custom-number-size">
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundSize}
                                       ref={this.custom}
                                       id='custom-number-size'
                                       datatype={'custom'} type="radio"
                                       name='size'/>
                                <span className="radio"> </span>
                                <p>enter your value</p>
                            </div>
                            <div className="inputRadioWrap">
                                <input onChange={this.changeWidth}
                                       ref={this.widthInput}
                                       onFocus={this.onFocusHandler}
                                       id='custom-number-width'
                                       datatype={'custom-number-width'}
                                       name='size'
                                       type="number"
                                       placeholder={'Width'}
                                       step={'1'}
                                       defaultValue={this.state.width}/>
                                &nbsp;%
                            </div>
                            <div className="inputRadioWrap">
                                <input onChange={this.changeHeight}
                                       onFocus={this.onFocusHandler}
                                       id='custom-number-height'
                                       datatype={'custom-number-height'}
                                       name='size'
                                       type="number"
                                       placeholder={'Height'}
                                       step={'1'}
                                       defaultValue={this.state.height}/>
                                &nbsp;%
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}