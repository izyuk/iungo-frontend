import React, {Component} from 'react';
import style from './options.less';

import StyleTab from './tabs/styleTab';
import ContentTab from './tabs/contentTab';

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
        this.tabHandler = this.tabHandler.bind(this);
    }

    componentDidMount() {
        this.setState({
            event: this.Style.current
        });
    }

    componentDidUpdate() {
        this.state.event.closest(`.${style.buttonsWrap} li`).classList.add(style.active);
    }

    tabHandler(e) {
        this.setState({
            event: e.currentTarget
        });
        for (let i = 0; i < document.querySelectorAll(`.${style.buttonsWrap} li`).length; i++) {
            document.querySelectorAll(`.${style.buttonsWrap} li`)[i].classList.remove(style.active);
        }
        this.setState({
            tab: e.currentTarget.innerHTML
        });
    }

    render() {
        return (
            <div className={style.options}>
                <div className={style.wrap}>
                    <ul className={style.buttonsWrap}>
                        <li className={style.active}
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
                        : (this.state.tab === 'Content' ?
                            <ContentTab
                                textData={this.props.textData}
                                methods={this.props.methods}/>
                            : '')}
                </div>
            </div>
        )
    }
}

export default Options;
