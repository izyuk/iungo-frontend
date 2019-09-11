import React, {Component} from 'react';
import CaptivePortalContext from "~/context/project-context";

class ContainerSize extends Component {
    static contextType = CaptivePortalContext;
    state = {
        width: this.context.style.desktop_container.size.width,
        padding: this.context.style.desktop_container.size.padding
    };

    valueWidth = (e) => {
        const currentState = this.state;
        const val = parseFloat(e.target.value) || e.target.value;
        if (val > 1920) {
            e.target.value = 1920;
            currentState.width = 1920;
        } else if (val < 320) {
            e.target.value = 320;
            currentState.width = 320;
        } else {
            currentState.width = val;
        }
        this.setState(currentState);
        this.context.setSizeStyle(this.state);
    };

    valuePadding = (e) => {
        const currentState = this.state;
        if (e.target.value > 40) {
            e.target.value = 40;
            currentState.padding = 40;
        } else if (e.target.value < 0) {
            e.target.value = 0;
            currentState.padding = 0;
        } else {
            currentState.padding = e.target.value;
        }
        this.setState(currentState);
        this.context.setSizeStyle(this.state);
    };

    componentDidMount() {
        this.getContainerSizeSettings();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextContext.previewDeviceType !== this.context.previewDeviceType ||
            nextContext.name !== this.context.name ||
            nextContext.style !== this.context.style) {
            this.getContainerSizeSettings(nextContext);
        }
    }

    getContainerSizeSettings(nextContext){
        const context = nextContext || this.context;
        const {style, previewDeviceType} = context;
        const size = (style[`${previewDeviceType}_container`] || style.desktop_container).size;
        this.setState({ width: size.width , padding: size.padding });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="header">Size</span>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="">Width</span>
                    </div>
                    <div className="right">
                        <div className="inputSelect">
                            <input type="number" data-cy="containerWidth"
                                value={this.state.width}
                                onChange={(e) => this.setState({ width: e.target.value })}
                                onBlur={this.valueWidth}
                            />
                            <select name="" id="" disabled>
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="rem">rem</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="">Padding</span>
                    </div>
                    <div className="right">

                        <div className="inputSelect">
                            <input type="number" 
                                value={this.state.padding}
                                onChange={(e) => this.setState({ padding: e.target.value })}
                                onBlur={this.valuePadding}
                            />
                            <select name="" id="" disabled>
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="rem">rem</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContainerSize;
