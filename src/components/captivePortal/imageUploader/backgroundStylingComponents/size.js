import React, {Component} from 'react';
import CaptivePortalContext from "../../../../context/captive-portal-context";

export default class Size extends Component {


    static contextType = CaptivePortalContext;

    state = {
        option: this.context.style.background_and_logo.background.backgroundSize.option,
        width: this.context.style.background_and_logo.background.backgroundSize.width,
        height: this.context.style.background_and_logo.background.backgroundSize.height
    };

    widthInput = React.createRef();
    custom = React.createRef();

    backgroundSize = (e) => {
        if (e.currentTarget.getAttribute('datatype') === 'custom') {
            this.widthInput.current.focus();
        } else {
            const currentState = this.state;
            currentState.option = e.currentTarget.getAttribute('datatype');
            this.context.setBackgroundSize(currentState, false);
            this.setState(currentState);
        }
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state);
    }

    componentDidMount() {
        const {style: {background_and_logo: {background: {backgroundSize}}}} = this.context;
        if(backgroundSize.inPercentDimension){
            this.custom.current.checked = true;
        } else {
            document.getElementById(`${backgroundSize.option}`).checked = true;
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
                        <label htmlFor="cover">auto
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundSize} id='auto' datatype={'auto'}
                                       type="radio"
                                       name='size'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                        <label htmlFor="contain">cover
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
                        <label className={'inputs'} htmlFor="custom-number-size">enter your value
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundSize}
                                       ref={this.custom}
                                       id='custom-number-size'
                                       datatype={'custom'} type="radio"
                                       name='size'/>
                                <span className="radio"> </span>
                            </div>
                            <div className="inputRadioWrap">
                                <input onChange={this.changeWidth}
                                       ref={this.widthInput}
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