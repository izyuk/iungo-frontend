import React, {Component} from 'react';
import CaptivePortalContext from "~/context/project-context";

export default class Attachment extends Component {


    static contextType = CaptivePortalContext;

    state = {
        position: 'scroll',
    };

    backgroundAttachment = (e) => {
        const currentState = this.state;
        currentState.position = e.currentTarget.getAttribute('datatype');
        this.context.setBackgroundAttachment(e.currentTarget.getAttribute('datatype'));
        this.setState(currentState);
    };

    render() {
        return (
            <div className="row">
                <div className="logoLeft">
                    <span className="descr position">
                        Background attachment
                    </span>
                </div>
                <div className="right">
                    <div className="innerCol">
                        <label htmlFor="scroll">scroll
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundAttachment} id='scroll' datatype={'scroll'}
                                       type="radio"
                                       name='background_repeating'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                        <label htmlFor="fixed">fixed
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundAttachment} id='fixed' datatype={'fixed'}
                                       type="radio"
                                       name='background_repeating'/>
                                <span className="radio"> </span>
                            </div>
                        </label>
                        <label htmlFor="local">local
                            <div className="inputRadioWrap">
                                <input onChange={this.backgroundAttachment} id='local' datatype={'local'}
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