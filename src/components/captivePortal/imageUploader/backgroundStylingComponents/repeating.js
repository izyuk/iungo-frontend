import React, {Component} from 'react';
import CaptivePortalContext from "../../../../context/captive-portal-context";

export default class Repeating extends Component {


    static contextType = CaptivePortalContext;

    state = {
        repeat: 'initial'
    };

    backgroundRepeating = (e) => {
        const currentState = this.state;
        currentState.repeat = e.currentTarget.getAttribute('datatype');
        this.context.setBackgroundRepeating(e.currentTarget.getAttribute('datatype'));
        this.setState(currentState);
    };

    componentDidMount() {
        const {style: {background_and_logo: {background: {repeat}}}} = this.context;

        document.getElementById(`${repeat}`).checked = true;
    }

    render() {
        return (
            <div className="row">
                <div className="logoLeft">
                    <span className="descr position">
                        Background repeat
                    </span>
                </div>
                <div className="right">
                    <div className="innerCol">
                        <label htmlFor="repeat">repeat (axis X & Y)
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundRepeating} id='repeat' datatype={'repeat'}
                                       type="radio"
                                       name='background_repeating'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                        <label htmlFor="repeat-x">repeat-x
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundRepeating} id='repeat-x' datatype={'repeat-x'}
                                       type="radio"
                                       name='background_repeating'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                        <label htmlFor="repeat-y">repeat-y
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundRepeating} id='repeat-y' datatype={'repeat-y'}
                                       type="radio"
                                       name='background_repeating'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                        <label htmlFor="no-repeat">no-repeat
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundRepeating} id='no-repeat' datatype={'no-repeat'}
                                       type="radio"
                                       name='background_repeating'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}