import React, {Component} from 'react';
import CaptivePortalContext from "../../../../../../context/project-context";

class ContainerSize extends Component {
    static contextType = CaptivePortalContext;
    state = {
        width: this.context.style.container_size.width,
        padding: this.context.style.container_size.padding
    };

    valueWidth = (e) => {
        const currentState = this.state;
        if (e.target.value > 1920) {
            e.target.value = 1920;
            currentState.width = 1920;
        } else if (e.target.value < 320) {
            e.target.value = 320;
            currentState.width = 320;
        } else {
            currentState.width = e.target.value
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

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.state.width !== nextState.width) ||
            (this.state.padding !== nextState.padding) ||
            (this.context !== nextContext);
    }

    componentDidMount() {
        this.context.setSizeStyle(this.state);
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
                            <input type="number" data-cy="containerWidth" onBlur={this.valueWidth}
                                   defaultValue={this.state.width}/>
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
                            <input type="number" onBlur={this.valuePadding} defaultValue={this.state.padding}/>
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
