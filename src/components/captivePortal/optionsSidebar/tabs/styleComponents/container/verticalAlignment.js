import React, {Component} from 'react';
import CaptivePortalContext from "../../../../../../context/project-context";

class VerticalAlignment extends Component {
    static contextType = CaptivePortalContext;
    state = {
        verticalPosition: this.context.style.container_position.vertical
    };

    verticalAlignment = (e) => {
        switch (e.target.getAttribute('datatype')) {
            case "margin: 0 auto auto auto":
                this.context.setContainerVerticalPosition('top');
                break;
            case "margin: auto":
                this.context.setContainerVerticalPosition('middle');
                break;
            case "margin: auto auto 0 auto":
                this.context.setContainerVerticalPosition('bottom');
                break;
        }

        this.setState({
            verticalPosition: e.target.getAttribute('datatype')
        })
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.state.verticalPosition !== nextState.verticalPosition);
    }

    componentDidMount() {
        const {vertical} = this.context.style.container_position;
        this.setState({
            verticalPosition: vertical
        });
        switch (vertical) {
            case "top":
                document.querySelector(`[datatype='margin: 0 auto auto auto']`).checked = true;
                break;
            case "middle":
                document.querySelector(`[datatype='margin: auto']`).checked = true;
                break;
            case "bottom":
                document.querySelector(`[datatype='margin: auto auto 0 auto']`).checked = true;
                break;
        }
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
                                    <input onChange={this.verticalAlignment} id='top' datatype={'margin: 0 auto auto auto'}
                                           type="radio"
                                           name='v-alignment'/>
                                    <span className="radio"> </span>
                                </div>
                            </label>
                            <label htmlFor="middle">Middle
                                <div className="inputRadioWrap">
                                    <input onChange={this.verticalAlignment} id='middle' datatype={'margin: auto'}
                                           type="radio"
                                           name='v-alignment'/>
                                    <span className="radio"> </span>
                                </div>
                            </label>
                            <label htmlFor="bottom">Bottom
                                <div className="inputRadioWrap">
                                    <input onChange={this.verticalAlignment} id='bottom' datatype={'margin: auto auto 0 auto'}
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
