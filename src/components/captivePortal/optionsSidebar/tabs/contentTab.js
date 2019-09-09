import React, {Component} from 'react';
import HeaderText from './contentComponents/headerText/headertText';
import LoginMethods from './contentComponents/loginMethods/loginMethods';
import GDPR from './contentComponents/GDPR/gdprSettings';
import FontSettings from './contentComponents/fontSettings/fontSettings';
import SuccessActions from './contentComponents/successMessage/successMessage';
import LocalozationSettings from './contentComponents/localization/localizationSettings';
import FooterEditor from './contentComponents/footerEditor/footerEditor';
import CaptivePortalContext from '~/context/project-context';
import Icons from '~/static/images/icons';

class ContentTab extends Component {
    static contextType = CaptivePortalContext;

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'localization'
        };
    }

    render() {
        const { activeTab } = this.state;
        return (
            <div className="dropdown">
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'localization') ? 'active' : '')}
                        data-cy="dropDownSuccessActions"
                        onClick={() => this.setState({ activeTab: 'localization' })}
                    >
                        <span>Localization</span>
                        <Icons.DropdownSvg/>
                    </div>
                    {(activeTab === 'localization') ? <LocalozationSettings /> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'font_settings') ? 'active' : '')}
                        data-cy="dropDownFontSettings"
                        onClick={() => this.setState({ activeTab: 'font_settings' })}
                    >
                        <span>Font Settings</span>
                        <Icons.DropdownSvg/>
                    </div>
                    {(activeTab === 'font_settings') ? <FontSettings /> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'header') ? 'active' : '')}
                        data-cy="dropDownHeader"
                        onClick={() => this.setState({ activeTab: 'header' })}
                    >
                        <span>Header</span>
                        <Icons.DropdownSvg/>
                    </div>
                    {(activeTab === 'header') ? <HeaderText /> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'gdpr') ? 'active' : '')}
                         data-cy="dropDownGDPR"
                         onClick={() => this.setState({ activeTab: 'gdpr' })}
                    >
                        <span>GDPR</span>
                        <Icons.DropdownSvg/>
                    </div>
                    {(activeTab === 'gdpr') ? <GDPR/> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'login_methods') ? 'active' : '')}
                         data-cy="dropDownLoginMethods"
                         onClick={() => this.setState({ activeTab: 'login_methods' })}
                    >
                        <span>Login Methods</span>
                        <Icons.DropdownSvg/>
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
                        <Icons.DropdownSvg/>
                    </div>
                    {(activeTab === 'footer') ? <FooterEditor /> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + ((activeTab === 'success_actions') ? 'active' : '')}
                        data-cy="dropDownSuccessActions"
                        onClick={() => this.setState({ activeTab: 'success_actions' })}
                    >
                        <span>Success Actions</span>
                        <Icons.DropdownSvg/>
                    </div>
                    {(activeTab === 'success_actions') ? <SuccessActions /> : false}
                </div>
            </div>
        )
    }
}

export default ContentTab;
