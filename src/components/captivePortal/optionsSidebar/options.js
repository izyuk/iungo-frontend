import React, {Component} from 'react';

import StyleTab from './tabs/styleTab';
import ContentTab from './tabs/contentTab';

import Publish from './publish';
import CaptivePortalContext from '../../../context/captive-portal-context';

class Options extends Component {

    static contextType = CaptivePortalContext;

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

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.context.stylesApplied !== nextContext.stylesApplied) return true;
        if(this.state.tab !== nextState.tab) return true;
        else return false
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
                            data-cy={'styleTab'}
                            ref={this.Style}>Style
                        </li>
                        <li onClick={this.tabHandler}
                            data-cy={'contentTab'}>Content</li>
                    </ul>

                    {this.state.tab === 'Style' ?
                        <StyleTab />
                        : (this.state.tab === 'Content') ?
                            <ContentTab />
                            : false}
                    <Publish loaderHandler={this.props.loaderHandler}/>
                </div>
            </div>
        )
    }
}

export default Options;
