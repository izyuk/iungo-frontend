import React, {Component} from 'react';

import StyleTab from './tabs/styleTab';
import ContentTab from './tabs/contentTab';

import Publish from './publish';
import CaptivePortalContext from '~/context/project-context';

class Options extends Component {

    static contextType = CaptivePortalContext;

    constructor(props) {
        super(props);
        this.state = {
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

    onTabChange(path){
        this.context.setActiveSettingsPath(path);
    }
    isTabActive(tabName){
        const { dataToExclude: {activeSettingsPath} } = this.context;
        return (activeSettingsPath.indexOf(tabName) === 0);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.context.stylesApplied !== nextContext.stylesApplied ||
                this.state.activeTab !== nextState.activeTab);
    }

    render() {
        const { activeTab } = this.state;
        const type = this.context.dataToExclude.previewDeviceType;
        return (
            <div className="options">
                <div className="wrap">
                    <ul className="buttonsWrap">
                        <li className={this.isTabActive('style') ? 'active' : ''}
                            onClick={() => this.onTabChange('style.background')}
                            data-cy={'styleTab'}
                        >
                            {(type === 'desktop') ? 'Desktop' : 'Mobile'} style
                        </li>
                        <li className={this.isTabActive('content') ? 'active' : ''}
                            onClick={() => this.onTabChange('content.localization')}
                            data-cy={'contentTab'}
                        >
                            Content
                        </li>
                    </ul>

                    {this.isTabActive('style') && <StyleTab />}
                    {this.isTabActive('content') && <ContentTab />}
                    <Publish loaderHandler={this.props.loaderHandler}/>
                </div>
            </div>
        )
    }
}

export default Options;
