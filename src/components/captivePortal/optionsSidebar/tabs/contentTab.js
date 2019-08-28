import React, {Component} from 'react';
import HeaderText from './contentComponents/headerText/headertText';
import LoginMethods from './contentComponents/loginMethods/loginMethods';
import GDPR from './contentComponents/GDPR/gdprSettings';
import FontSettings from './contentComponents/fontSettings/fontSettings';
import SuccessActions from './contentComponents/successMessage/successMessage';
import FooterEditor from './contentComponents/footerEditor/footerEditor'

class ContentTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'header'
        };
    }

    render() {
        const { activeTab } = this.state;
        return (
            <div className="dropdown">
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'font_settings') ? 'active' : '')}
                        data-cy="dropDownFontSettings"
                        onClick={() => this.setState({ activeTab: 'font_settings' })}
                    >
                        <span>Font Settings</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero"
                                  d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {(activeTab === 'font_settings') ? <FontSettings /> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'header') ? 'active' : '')}
                        data-cy="dropDownHeader"
                        onClick={() => this.setState({ activeTab: 'header' })}
                    >
                        <span>Header</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero"
                                  d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {(activeTab === 'header') ? <HeaderText /> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'gdpr') ? 'active' : '')}
                         data-cy="dropDownGDPR"
                         onClick={() => this.setState({ activeTab: 'gdpr' })}
                    >
                        <span>GDPR</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero"
                                  d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {(activeTab === 'gdpr') ? <GDPR/> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'login_methods') ? 'active' : '')}
                         data-cy="dropDownLoginMethods"
                         onClick={() => this.setState({ activeTab: 'login_methods' })}
                    >
                        <span>Login Methods</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero"
                                  d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {(activeTab === 'login_methods') ? <LoginMethods handler={this.props.handler}
                        methods={this.props.methods}
                        acceptButton={this.props.acceptButton}
                    /> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'footer') ? 'active' : '')}
                        data-cy="dropDownFooter"
                        onClick={() => this.setState({ activeTab: 'footer' })}
                    >
                        <span>Footer</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero"
                                  d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {(activeTab === 'footer') ? <FooterEditor /> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'success_actions') ? 'active' : '')}
                        data-cy="dropDownSuccessActions"
                        onClick={() => this.setState({ activeTab: 'success_actions' })}
                    >
                        <span>Success Actions</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero"
                                  d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {(activeTab === 'success_actions') ? <SuccessActions /> : false}
                </div>
            </div>
        )
    }
}

export default ContentTab;
