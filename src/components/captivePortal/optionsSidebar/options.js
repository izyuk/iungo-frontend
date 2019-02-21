import React, {Component} from 'react';

import StyleTab from './tabs/styleTab';
import ContentTab from './tabs/contentTab';
import SettingsTab from './tabs/settingsTab';

import Publish from './publish';

class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            tab: 'Style',
            event: '',
            colorHEX: '#f9f9fc',
            color: {
                r: '249',
                g: '249',
                b: '252',
                a: '1',
            }
        };

        this.Style = React.createRef();
    }

    componentDidMount() {
        this.setState({
            event: this.Style.current
        });
    }

    componentDidUpdate() {
        this.state.event.closest(".buttonsWrap li").classList.add("active");
    }

    tabHandler = (e) => {
        this.setState({
            event: e.currentTarget
        });
        for (let i = 0; i < document.querySelectorAll(".buttonsWrap li").length; i++) {
            document.querySelectorAll(".buttonsWrap li")[i].classList.remove("active");
        }
        this.setState({
            tab: e.currentTarget.innerHTML
        });
    };

    render() {
        return (
            <div className="options">
                <div className="wrap">
                    <ul className="buttonsWrap">
                        <li className="active"
                            onClick={this.tabHandler}
                            ref={this.Style}>Style
                        </li>
                        <li onClick={this.tabHandler}>Content</li>
                        <li onClick={this.tabHandler}>Settings</li>
                    </ul>

                    {this.state.tab === 'Style' ?
                        <StyleTab tabHandler={this.tabHandler}
                                  handler={this.props.handler}
                                  alignment={this.props.alignment}
                                  containerHandler={this.props.containerHandler}/>
                        : (this.state.tab === 'Content') ?
                            <ContentTab
                                textData={this.props.textData}
                                methods={this.props.methods}
                                footerTextData={this.props.footerTextData}
                                successData={this.props.successData}/>
                            : (this.state.tab === 'Settings') ?
                                <SettingsTab/>
                                : ''}
                    <Publish loaderHandler={this.props.loaderHandler}/>
                </div>
            </div>
        )
    }
}

export default Options;
