import React, {Component} from 'react';
import {connect} from 'react-redux';

class CSS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUsed: false
        };
        this.link = React.createRef();
    }

    addStyles = (e) => {
        const STYLE = document.getElementsByTagName('STYLE')[0];
        if (STYLE) STYLE.parentNode.removeChild(STYLE);
        const HEAD = document.getElementsByTagName('HEAD')[0];
        let file = e.currentTarget.files[0];
        console.log(file.name);
        this.setState({
            isUsed: true
        });
        if (file) {
            let style = document.createElement('style');
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");

            reader.onload = (evt) => {
                style.innerText = evt.target.result;
                this.props.setCSS(evt.target.result);
            };
            reader.onerror = (evt) => {
                style.innerText = "error reading file";
            };

            HEAD.appendChild(style);

        }
    };

    removeStyles = () => {
        const STYLE = document.getElementsByTagName('STYLE')[0];
        if (STYLE) STYLE.parentNode.removeChild(STYLE);
        this.setState({
            isUsed: false
        })
    };

    render() {
        return (
            <div className="container">
                {this.state.isUsed&&
                <div className="row">
                    <div className="right">
                        <span className="innerRow">
                            <span className={'styleFileName'}>
                                External CSS is used. &nbsp;&nbsp; <span onClick={this.removeStyles}>Remove</span>
                            </span>
                        </span>
                    </div>
                </div>
                }
                <div className="row">
                    <div className="right">
                        <span className="innerRow">Use your external CSS code</span>
                    </div>
                </div>
                <div className="row">
                    <div className="right">
                        <span className="innerRow">
                            <div className="urlForm">
                                <div className="upload">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="#FFF" fillRule="nonzero"
                                              d="M17 11.1V11c0-2.8-2.2-5-5-5-2.5 0-4.6 1.8-4.9 4.3-1.8.6-3.1 2.2-3.1 4.2C4 17 6 19 8.5 19H16c2.2 0 4-1.8 4-4 0-1.9-1.3-3.4-3-3.9zM13 14v3h-2v-3H8l4-4 4 4h-3z"/>
                                    </svg>
                                    <span>Upload</span>
                                    <input type="file" onChange={this.addStyles} accept="text/css"/>

                                </div>
                            </div>
                        </span>
                    </div>
                </div>

            </div>
        )
    }
}

export default connect(
    state => ({
        background_and_logo: state
    }),
    dispatch => ({
        setCSS: (path) => {
            dispatch({type: "SET_CSS", payload: path})
        }
    })
)(CSS);
