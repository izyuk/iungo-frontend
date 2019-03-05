import React, {Component} from 'react';
import {connect} from 'react-redux';

class ContainerSize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.container_size.width || 720,
            padding: this.props.container_size.padding || 10
        };
        this.valueWidth = this.valueWidth.bind(this);
        this.valuePadding = this.valuePadding.bind(this);
    }

    valueWidth(e) {
        if (e.target.value >= 1920) {
            e.target.value = 1920;
            this.setState({
                width: 1920
            });
        } else if (e.target.value <= 320) {
            e.target.value = 320;
            this.setState({
                width: 320
            })
        } else {
            this.setState({
                width: parseInt(e.target.value)
            });
        }
    }

    valuePadding(e) {
        if (e.target.value >= 40) {
            e.target.value = 40;
            this.setState({
                padding: 40
            });
        } else if (e.target.value <= 0) {
            e.target.value = 0;
            this.setState({
                padding: 0
            });
        } else {
            this.setState({
                padding: parseInt(e.target.value)
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.width !== nextState.width) {
            return true;
        } else if (this.state.padding !== nextState.padding) {
            return true;
        } else
            return false;
    }

    componentDidMount() {
        this.props.sizeStyle(this.state);
        this.props.handler(this.state);
    }

    componentDidUpdate(){
        this.props.sizeStyle(this.state);
        this.props.handler(this.state);
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
                        <span className="">width</span>
                    </div>
                    <div className="right">
                        <div className="inputSelect">
                            <input type="number" onBlur={this.valueWidth} defaultValue={this.state.width}/>
                            <select name="" id="" disabled>
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="rem">rem</option>
                            </select>
                            {/*<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">*/}
                                {/*<path fill="#BFC5D2" fillRule="nonzero"*/}
                                      {/*d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>*/}
                            {/*</svg>*/}
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
                            {/*<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">*/}
                            {/*<path fill="#BFC5D2" fillRule="nonzero"*/}
                            {/*d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>*/}
                            {/*</svg>*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        container_size: state.container_size
    }),
    dispatch => ({
        sizeStyle: (data) => {
            dispatch({type: "container_size", payload: data});
        }
    })
)(ContainerSize);
