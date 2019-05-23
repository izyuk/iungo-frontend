import React, {Component} from 'react';
import CaptivePortalContext from "../../../../../context/captive-portal-context";


class CSS extends Component {
    static contextType = CaptivePortalContext;
    state = {
        isUsed: false,
        styledElements: '',
        stylesArray: ''
    };

    input = React.createRef();

    addStyles = (e) => {
        const STYLE = document.getElementsByTagName('STYLE')[0];
        if (!!STYLE) {
            STYLE.parentNode.removeChild(STYLE);
        }
        const HEAD = document.getElementsByTagName('HEAD')[0];
        let file = e.currentTarget.files[0];
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
                const styledElements = document.querySelectorAll('.previewWrap [style]');
                let stylesArray = [];
                Object.keys(styledElements).map((item, i) => {
                    stylesArray.push(styledElements[item].getAttribute('style'));
                });
                Object.keys(styledElements).map((item, i) => {
                    styledElements[item].removeAttribute('style');
                });
                this.context.setExternalCssInfo(evt.target.result, true, styledElements, stylesArray);
                this.setState({
                    styledElements: styledElements,
                    stylesArray: stylesArray
                });
                this.context.stylesApplied = true;

            };
            reader.onerror = (evt) => {
                style.innerText = "error reading file";
            };
            HEAD.appendChild(style);

        }
    };

    removeStyles = async () => {

        console.log(this.context.dataToExclude.styledElements);
        console.log(this.context.dataToExclude.stylesArray);

        const elements = this.context.dataToExclude.styledElements;
        const styles = this.context.dataToExclude.stylesArray;

        Object.keys(elements).map((i) => {
            console.log(elements[i]);
            elements[i].setAttribute('style', styles[i]);
        });

        await this.context.setExternalCssInfo('', false, this.state.styledElements, this.state.stylesArray);
        // this.props.findPortal(localStorage.getItem('token'));
        this.input.current.value = '';
        const STYLE = document.getElementsByTagName('STYLE')[0];
        STYLE ? STYLE.parentNode.removeChild(STYLE) : true;

    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.isUsed !== nextState.isUsed) return true;
        else if (this.state.styledElements !== nextState.styledElements) return true;
        else if (this.state.stylesArray !== nextState.stylesArray) return true;
        else return false
    }

    componentDidMount() {
        console.log('CONTEXT:\n', this.context);
        // console.log(JSON.stringify(this.context));
        const data_to_store = this.context;
        data_to_store.dataToExclude.token = '';
        // localStorage.setItem('context_state', JSON.stringify(data_to_store));
        // console.log(localStorage.getItem('context_state'));
    }

    render() {
        return (
            <div className="container">
                {this.context.dataToExclude.stylesApplied &&
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

export default CSS;
