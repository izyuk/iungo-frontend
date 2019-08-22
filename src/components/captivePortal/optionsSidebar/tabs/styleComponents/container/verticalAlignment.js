import React, {Component} from 'react';
import CaptivePortalContext from "../../../../../../context/project-context";

class VerticalAlignment extends Component {
    static contextType = CaptivePortalContext;
    state = {
        verticalPosition: this.context.style.container_position.vertical
    };

    verticalAlignment = (e) => {
        const verticalPosition = e.target.getAttribute('datatype');
        this.context.setContainerVerticalPosition(verticalPosition);
        this.setState({ verticalPosition });
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.state.verticalPosition !== nextState.verticalPosition);
    }

    componentDidMount() {
        const {vertical} = this.context.style.container_position;
        this.setState({ verticalPosition: vertical });
        document.querySelector(`[datatype='${vertical}']`).checked = true;
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="header">Position</span>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="descr position">
                            Vertical
                        </span>
                    </div>
                    <div className="right">
                        <div className="innerCol">
                            <label htmlFor="top">Top
                                <div className="inputRadioWrap">
                                    <input onChange={this.verticalAlignment} id='top' datatype='top'
                                           type="radio"
                                           name='v-alignment'/>
                                    <span className="radio"> </span>
                                </div>
                            </label>
                            <label htmlFor="middle">Middle
                                <div className="inputRadioWrap">
                                    <input onChange={this.verticalAlignment} id='middle' datatype='middle'
                                           type="radio"
                                           name='v-alignment'/>
                                    <span className="radio"> </span>
                                </div>
                            </label>
                            <label htmlFor="bottom">Bottom
                                <div className="inputRadioWrap">
                                    <input onChange={this.verticalAlignment} id='bottom' datatype='bottom'
                                           type="radio"
                                           name='v-alignment'/>
                                    <span className="radio"> </span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VerticalAlignment;