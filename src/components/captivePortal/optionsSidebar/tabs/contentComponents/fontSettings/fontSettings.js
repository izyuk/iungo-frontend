import React, {Component} from "react";
import CaptivePortalContext from "../../../../../../context/project-context";
import {getFontById} from "../../../../../../api/API";

class FontSettings extends Component {

    static contextType = CaptivePortalContext;

    state = {
        fontName: this.context.style.header.top.family,
        fontsList: this.context.dataToExclude.fontsList,
        fontIds: this.context.dataToExclude.fontIds,
        base64EncodedValue: ''
    };

    setting = React.createRef();
    token = this.context.dataToExclude.token;

    async componentDidMount() {
        await this.settingHandler();
    }

    getFontById = async (id) => {
        const query = getFontById(!!this.token ? this.token : localStorage.getItem('token'), id);
        await query.then(res => {
            const {data} = res;
            const currentState = this.state;
            currentState.base64EncodedValue = data.base64EncodedValue;
            this.setState(currentState);
            this.context.setFontBase64(data.base64EncodedValue);
        });
    };

    settingHandler = async (e) => {
        if (e) {
            const currentState = this.state;
            currentState.setting = e.currentTarget.options[e.currentTarget.selectedIndex].value;
            console.log(e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute('dataid'));
            const dataid = e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute('dataid');
            const fontColection = currentState.fontsList.reduce((obj, item) => {
                if (item.id === parseInt(dataid)) {
                    obj['base64EncodedValue'] = '';
                    obj['fontName'] = item.name;
                    obj['fontIds'] = !item.webSafe ? [item.id] : [];
                    if (!item.webSafe) {
                        this.getFontById(item.id);
                    }
                }
                return obj;
            }, {});
            currentState.fontName = fontColection.fontName;
            currentState.fontIds = fontColection.fontIds;
            this.setState(currentState);
            const span = e.currentTarget.nextSibling.children[0];
            span.innerText = e.currentTarget.options[e.currentTarget.selectedIndex].value;
            const {fontsList, ...rest} = currentState;
            this.context.setFontData({...rest});
        } else {
            const currentState = this.state;
            this.setting.current.value = currentState.fontName;
            const svg = this.setting.current.nextSibling.children[0];
            const span = document.createElement('span');
            // currentState.fontName = this.setting.current.options[this.setting.current.selectedIndex].value;
            // this.setState(currentState);
            const {fontsList, ...rest} = currentState;
            this.context.setFontData({...rest});
            span.innerText = currentState.fontName;
            this.setting.current.nextSibling.insertBefore(span, svg);
        }
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.state.fontName !== nextState.fontName) ||
            (this.state.fontsList !== nextState.fontsList) ||
            (this.state.fontIds !== nextState.fontIds) ||
            (this.state.base64EncodedValue !== nextState.base64EncodedValue);
    }

    render() {
        const {fontsList} = this.state;
        return (
            <div className={'container active'}>
                <div className="row">
                    <div className="logoLeft">
                    <span className="descr position">
                        Font name
                    </span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <div className="innerCol">
                                <div className="innerRow">
                                    <select ref={this.setting}
                                            data-cy={'fontName'}
                                            onChange={this.settingHandler}>
                                        {
                                            fontsList &&
                                            fontsList.map((item, i) => {
                                                return (<option key={i} dataid={item.id}
                                                                value={item.name}>{item.name}</option>)
                                            })
                                        }
                                    </select>
                                    <p className="select">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <path fill="#BFC5D2" fillRule="nonzero"
                                                  d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                        </svg>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FontSettings;