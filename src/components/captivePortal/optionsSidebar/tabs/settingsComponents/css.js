import React, {Component} from 'react';
import CaptivePortalContext from "~/context/project-context";
import Icons from '~/static/images/icons';


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

        const elements = this.context.dataToExclude.styledElements;
        const styles = this.context.dataToExclude.stylesArray;

        Object.keys(elements).map((i) => {
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
        const data_to_store = this.context;
        data_to_store.dataToExclude.token = '';
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
                                    <Icons.UploadIcon fill="#FFF"/>
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
