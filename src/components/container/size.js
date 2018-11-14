import React, {Component} from 'react';
import {connect} from 'react-redux';

class ContainerSize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '720',
            padding: '10'
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
        } else if (e.target.value <= 720) {
            e.target.value = 720;
            this.setState({
                width: 720
            })
        } else {
            this.setState({
                width: e.target.value
            });
        }

        console.log(this.state.width);
    }

    valuePadding(e) {
        if (e.target.value >= 20) {
            e.target.value = 20;
            this.setState({
                padding: 20
            });
        } else if (e.target.value <= 0) {
            e.target.value = 0;
            this.setState({
                padding: 0
            });
        } else {
            this.setState({
                padding: e.target.value
            });
        }

        console.log(this.state.padding);
    }

    render() {
        return (
            <div>
                <div className={this.props.style.row}>
                    <div className={this.props.style.logoLeft}>
                        <span className={this.props.style.header}>Size</span>
                    </div>
                </div>
                <div className={this.props.style.row}>
                    <div className={this.props.style.logoLeft}>
                        <span className={this.props.style}>Width</span>
                    </div>
                    <div className={this.props.style.right}>
                        <div className={this.props.style.inputSelect}>
                            <input type="number" onBlur={this.valueWidth} defaultValue={this.state.width}/>
                            <select name="" id="">
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="rem">rem</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#BFC5D2" fillRule="nonzero"
                                      d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={this.props.style.row}>
                    <div className={this.props.style.logoLeft}>
                        <span className={this.props.style}>Padding</span>
                    </div>
                    <div className={this.props.style.right}>

                        <div className={this.props.style.inputSelect}>
                            <input type="number" onBlur={this.valuePadding} defaultValue={this.state.padding}/>
                            <select name="" id="">
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="rem">rem</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#BFC5D2" fillRule="nonzero"
                                      d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        content_size: state
    }),
    dispatch => ({
        sizeStyle: (data) => {
            dispatch({type: "CONTENT_SIZE", payload: data});
        }
    })
)(ContainerSize);
