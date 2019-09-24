import React, {Component} from 'react';
import Background from "./styleComponents/background";
import Logo from "./styleComponents/logo";
import Container from "./styleComponents/container/container";
import Icons from '~/static/images/icons';

import CaptivePortalContext from "~/context/project-context";

class StyleTab extends Component {
    static contextType = CaptivePortalContext;
    constructor(props){
        super(props);
        this.state = {};
    }

    onTabChange(tabName){
        this.context.setActiveSettingsPath(`style.${tabName}`);
    }
    isTabActive(tabName){
        const { dataToExclude: {activeSettingsPath} } = this.context;
        return activeSettingsPath.includes(tabName);
    }

    render(){
        return(
            <div className="dropdown">
                <div className="wrap">
                    <div className={'head ' + (this.isTabActive('background') ? 'active' : '')}
                        data-cy="backgroundDropDown"
                        onClick={() => this.onTabChange('background')}
                    >
                        <span>Background</span>
                        <Icons.DropdownIcon/>
                    </div>
                    {this.isTabActive('background') ? <Background type="background"/> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + (this.isTabActive('logo') ? 'active' : '')}
                        data-cy="logoDropDown"
                        onClick={() => this.onTabChange('logo')}
                    >
                        <span>Logo</span>
                        <Icons.DropdownIcon/>
                    </div>
                    {this.isTabActive('logo') ? <Logo type="logo"/> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + (this.isTabActive('background') ? 'active' : '')}
                        data-cy="containerDropDown"
                        onClick={() => this.onTabChange('container')}
                    >
                        <span>Container</span>
                        <Icons.DropdownIcon/>
                    </div>
                    {this.isTabActive('container') ? <Container /> : false}
                </div>
            </div>
        )
    }
}

export default StyleTab;
