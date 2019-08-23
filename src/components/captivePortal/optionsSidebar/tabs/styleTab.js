import React, {Component} from 'react';
import Background from "./styleComponents/background";
import Logo from "./styleComponents/logo";
import Container from "./styleComponents/container/container";

import CaptivePortalContext from "../../../../context/project-context";

class StyleTab extends Component {
    static contextType = CaptivePortalContext;
    constructor(props){
        super(props);
        this.state={
            activeTab: 'background'
        };
    }

    render(){
        const { activeTab } = this.state;
        const type = this.context.previewDeviceType;
        return(
            <div className="dropdown">
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'background') ? 'active' : '')}
                        data-cy="backgroundDropDown"
                        onClick={() => this.setState({ activeTab: 'background' })}
                    >
                        <span>{(type === 'desktop') ? 'Desktop' : 'Mobile'} background</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {(activeTab === 'background') ? <Background type="background"/> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'logo') ? 'active' : '')}
                        data-cy="logoDropDown"
                        onClick={() => this.setState({ activeTab: 'logo' })}
                    >
                        <span>Logo</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {(activeTab === 'logo') ? <Logo type="logo"/> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'background') ? 'active' : '')}
                        data-cy="containerDropDown"
                        onClick={() => this.setState({ activeTab: 'container' })}
                    >
                        <span>Container</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {(activeTab === 'container') ? <Container /> : false}
                </div>
            </div>
        )
    }
}

export default StyleTab;
