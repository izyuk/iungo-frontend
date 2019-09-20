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
        this.state = {};
    }

    onTabChange(tabName){
        this.context.setActiveSettingsPath(`content.${tabName}`);
    }
    isTabActive(tabName){
        const { dataToExclude: {activeSettingsPath} } = this.context;
        return activeSettingsPath.includes(tabName);
    }

    render() {
        return (
            <div className="dropdown">
                <div className="wrap">
                    <div className={'head ' + (this.isTabActive('localization') ? 'active' : '')}
                        data-cy="dropDownLocalizationSettings"
                        onClick={() => this.onTabChange('localization')}
                    >
                        <span>Language Settings</span>
                        <Icons.DropdownIcon/>
                    </div>
                    {this.isTabActive('localization') ? <LocalozationSettings /> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + (this.isTabActive('font_settings') ? 'active' : '')}
                        data-cy="dropDownFontSettings"
                        onClick={() => this.onTabChange('font_settings')}
                    >
                        <span>Font Settings</span>
                        <Icons.DropdownIcon/>
                    </div>
                    {this.isTabActive('font_settings') ? <FontSettings /> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + (this.isTabActive('header') ? 'active' : '')}
                        data-cy="dropDownHeader"
                        onClick={() => this.onTabChange('header')}
                    >
                        <span>Header</span>
                        <Icons.DropdownIcon/>
                    </div>
                    {this.isTabActive('header') ? <HeaderText /> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + (this.isTabActive('gdpr') ? 'active' : '')}
                         data-cy="dropDownGDPR"
                         onClick={() => this.onTabChange('gdpr')}
                    >
                        <span>GDPR</span>
                        <Icons.DropdownIcon/>
                    </div>
                    {this.isTabActive('gdpr') ? <GDPR/> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + (this.isTabActive('login_methods') ? 'active' : '')}
                         data-cy="dropDownLoginMethods"
                         onClick={() => this.onTabChange('login_methods')}
                    >
                        <span>Login Methods</span>
                        <Icons.DropdownIcon/>
                    </div>
                    {this.isTabActive('login_methods') ? <LoginMethods handler={this.props.handler}
                        methods={this.props.methods}
                        acceptButton={this.props.acceptButton}
                    /> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + (this.isTabActive('footer') ? 'active' : '')}
                        data-cy="dropDownFooter"
                        onClick={() => this.onTabChange('footer')}
                    >
                        <span>Footer</span>
                        <Icons.DropdownIcon/>
                    </div>
                    {this.isTabActive('footer') ? <FooterEditor /> : false}
                </div>
                <div className="wrap">
                    <div className={'head ' + (this.isTabActive('success_actions') ? 'active' : '')}
                        data-cy="dropDownSuccessActions"
                        onClick={() => this.onTabChange('success_actions')}
                    >
                        <span>Success Actions</span>
                        <Icons.DropdownIcon/>
                    </div>
                    {this.isTabActive('success_actions') ? <SuccessActions /> : false}
                </div>
            </div>
        )
    }
}

export default ContentTab;
