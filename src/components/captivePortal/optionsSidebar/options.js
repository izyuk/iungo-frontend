import React, {Component} from 'react';

import StyleTab from './tabs/styleTab';
import ContentTab from './tabs/contentTab';

import Publish from './publish';
import CaptivePortalContext from '../../../context/project-context';

class Options extends Component {

    static contextType = CaptivePortalContext;

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'style',
            selectedFile: null,
            colorHEX: '#f9f9fc',
            color: {
                r: '249',
                g: '249',
                b: '252',
                a: '1',
            }
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.context.stylesApplied !== nextContext.stylesApplied ||
                this.state.activeTab !== nextState.activeTab);
    }

    render() {
        const { activeTab } = this.state;
        const type = this.context.previewDeviceType;
        return (
            <div className="options">
                <div className="wrap">
                    <ul className="buttonsWrap">
                        <li className={(activeTab === 'style') ? 'active' : ''}
                            onClick={() => this.setState({ activeTab: 'style' })}
                            data-cy={'styleTab'}
                        >
                            {(type === 'desktop') ? 'Desktop' : 'Mobile'} style
                        </li>
                        <li className={(activeTab === 'content') ? 'active' : ''}
                            onClick={() => this.setState({ activeTab: 'content' })}
                            data-cy={'contentTab'}
                        >
                            Content
                        </li>
                    </ul>

                    {activeTab === 'style' ?
                        <StyleTab />
                        : (activeTab === 'content') ?
                            <ContentTab />
                            : false}
                    <Publish loaderHandler={this.props.loaderHandler}/>
                </div>
            </div>
        )
    }
}

export default Options;
