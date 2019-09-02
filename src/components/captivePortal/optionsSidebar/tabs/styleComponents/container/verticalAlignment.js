import React, {Component} from 'react';
import CaptivePortalContext from "../../../../../../context/project-context";

class VerticalAlignment extends Component {
    static contextType = CaptivePortalContext;
    state = {
        verticalPosition: this.context.style.desktop_container.position.vertical
    };

    verticalAlignment = (e) => {
        const verticalPosition = e.target.getAttribute('datatype');
        this.context.setContainerVerticalPosition(verticalPosition);
        this.setState({ verticalPosition });
    };

    componentDidMount() {
        this.getContainerPositionSettings();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextContext.previewDeviceType !== this.context.previewDeviceType ||
            nextContext.name !== this.context.name ||
            nextContext.style !== this.context.style) {
            this.getContainerPositionSettings(nextContext);
        }
    }

    getContainerPositionSettings(nextContext) {
        const context = nextContext || this.context;
        const {style, previewDeviceType} = context;
        const vertical = (style[`${previewDeviceType}_container`] || style.desktop_container).position.vertical;
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
                            <label htmlFor="top" data-cy="containerVerticalAlignment_Top">Top
                                <div className="inputRadioWrap">
                                    <input onChange={this.verticalAlignment} id='top' datatype='top'
                                           type="radio"
                                           name='v-alignment'/>
                                    <span className="radio"> </span>
                                </div>
                            </label>
                            <label htmlFor="middle" data-cy="containerVerticalAlignment_Middle">Middle
                                <div className="inputRadioWrap">
                                    <input onChange={this.verticalAlignment} id='middle' datatype='middle'
                                           type="radio"
                                           name='v-alignment'/>
                                    <span className="radio"> </span>
                                </div>
                            </label>
                            <label htmlFor="bottom" data-cy="containerVerticalAlignment_Bottom">Bottom
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
