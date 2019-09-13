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
        this.state = {
            activeTab: 'background'
        };
    }

    render(){
        const { activeTab } = this.state;
        return(
            <div className="dropdown">
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'background') ? 'active' : '')}
                        data-cy="backgroundDropDown"
                        onClick={() => this.setState({ activeTab: 'background' })}
                    >
                        <span>Background</span>
                        <Icons.DropdownIcon/>
                    </div>
                    {(activeTab === 'background') ? <Background type="background"/> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'logo') ? 'active' : '')}
                        data-cy="logoDropDown"
                        onClick={() => this.setState({ activeTab: 'logo' })}
                    >
                        <span>Logo</span>
                        <Icons.DropdownIcon/>
                    </div>
                    {(activeTab === 'logo') ? <Logo type="logo"/> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'background') ? 'active' : '')}
                        data-cy="containerDropDown"
                        onClick={() => this.setState({ activeTab: 'container' })}
                    >
                        <span>Container</span>
                        <Icons.DropdownIcon/>
                    </div>
                    {(activeTab === 'container') ? <Container /> : false}
                </div>
            </div>
        )
    }
}

export default StyleTab;
