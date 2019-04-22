import React, {Component} from 'react';
import {connect} from 'react-redux';



class CSS extends Component {

    state = {
        isUsed: false,
        styledElements: '',
        stylesArray: ''
    };

    input = React.createRef();
    // STYLE = document.getElementsByTagName('STYLE')[0];


    addStyles = (e) => {
        const STYLE = document.getElementsByTagName('STYLE')[0];
        if (!!STYLE) {
            STYLE.parentNode.removeChild(STYLE);
        }
        const HEAD = document.getElementsByTagName('HEAD')[0];
        let file = e.currentTarget.files[0];
        console.log(file.name);
        this.setState({
            isUsed: true
        });
        if (file) {
            let style = document.createElement('style');
            style.type = 'text/css';
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");

            reader.onload = (evt) => {
                style.innerHTML = evt.target.result;
                this.props.setCSS(evt.target.result);
                const styledElements = document.querySelectorAll('.previewWrap [style]');
                console.log(styledElements);
                let stylesArray = [];
                Object.keys(styledElements).map((item, i) => {
                    stylesArray.push(styledElements[item].getAttribute('style'));
                });
                this.setState({
                    styledElements: styledElements,
                    stylesArray: stylesArray
                });
                console.log(this.state);
                Object.keys(styledElements).map((item, i) => {
                    styledElements[item].removeAttribute('style');
                });
                console.log(this.state);
            };
            reader.onerror = (evt) => {
                style.innerText = "error reading file";
            };

            HEAD.appendChild(style);

        }
    };

    removeStyles = () => {
        this.props.clearExternalCss();
        this.props.findPortal(localStorage.getItem('token'));
        this.props.setCSS('');
        console.log(this.props.background_and_logo.css.path);
        this.input.current.value = '';
        const STYLE = document.getElementsByTagName('STYLE')[0];

        STYLE ? STYLE.parentNode.removeChild(STYLE) : true;
        this.setState({
            isUsed: false
        });
        if(this.state.stylesArray){
            const styles = this.state.stylesArray;
            const nodes = this.state.styledElements;
            Object.keys(nodes).map((item, i) => {
                nodes[item].setAttribute('style', styles[item])
            })
        }

    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.isUsed !== nextState.isUsed) return true;
        else if (this.state.styledElements !== nextState.styledElements) return true;
        else if (this.state.stylesArray !== nextState.stylesArray) return true;
        else return false
    }

    componentDidMount() {
        console.log(this.input.current.value);
        console.log(this.props.background_and_logo.css.path);
        console.log(this.props.background_and_logo.css.path.length);
        if(this.props.background_and_logo.css.path.length > 0){
            this.setState({
                isUsed: true
            })
        } else {
            this.setState({
                isUsed: false
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.input.current.value);
        console.log(this.props.background_and_logo.css.path.length);
        if(this.props.background_and_logo.css.path.length > 0){
            this.setState({
                isUsed: true
            })
        } else {
            this.setState({
                isUsed: false
            })
        }
    }

    render() {
        return (
            <div className="container">
                {this.state.isUsed &&
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
                                    <input ref={this.input} type="file" onChange={this.addStyles} accept="text/css"/>
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
