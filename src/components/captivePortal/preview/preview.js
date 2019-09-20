import React, {Component} from 'react';

import Methods from './methods';
import LanguagesModal from './languagesModal';
import CaptivePortalContext from "~/context/project-context";
import Icons from '~/static/images/icons';
import ContentEditable from 'react-contenteditable';


class Preview extends Component {
    static contextType = CaptivePortalContext;

    constructor(props){
        super(props);
        this.state = {
            showLanguagesModal: false
        };
        this.PreviewMain = React.createRef();
        this.ContainerMain = React.createRef();
        this.FooterText = React.createRef();
        this.agree = React.createRef();
        this.allow = React.createRef();
        this.beforeEditContent = this.beforeEditContent.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    componentDidMount() {
        const {style} = this.context;
        if (this.context.externalCss !== '') {
            const HEAD = document.getElementsByTagName('HEAD')[0];
            const style = document.getElementsByTagName('STYLE')[0] ? document.getElementsByTagName('STYLE')[0] : document.createElement('style');
            style.type = 'text/css';
            style.innerText = this.context.externalCss;

            HEAD.appendChild(style);

            const styledElements = document.querySelectorAll('.previewWrap [style]');
            let stylesArray = [];
            Object.keys(styledElements).map((item, i) => {
                stylesArray.push(styledElements[item].getAttribute('style'));
            });
            Object.keys(styledElements).map((item, i) => {
                styledElements[item].removeAttribute('style');
            });
            this.context.setExternalCssInfo(this.context.externalCss, true, styledElements, stylesArray);
        }


        const STYLE = document.getElementsByTagName('STYLE')[document.getElementsByTagName('STYLE').length - 1];
        if (!!STYLE) {
            STYLE.parentNode.removeChild(STYLE);
        }
        const BODY = document.getElementsByTagName('BODY')[0];
        let styleTag = document.createElement('style');
        styleTag.type = 'text/css';
        styleTag.innerHTML = this.context.previewCssGenerator();
        BODY.appendChild(styleTag);
    }

    getTheStyle = (element, styles) => {
        this.PreviewMain.current.classList;
    };

    componentDidUpdate() {
        const {style} = this.context;

        const STYLE = document.getElementsByTagName('STYLE')[document.getElementsByTagName('STYLE').length - 1];
        if (!!STYLE) {
            STYLE.parentNode.removeChild(STYLE);
        }
        const BODY = document.getElementsByTagName('BODY')[0];
        let styleTag = document.createElement('style');
        styleTag.type = 'text/css';
        styleTag.innerHTML = this.context.previewCssGenerator();
        BODY.appendChild(styleTag);
    }

    beforeEditContent(e){
        const name = e.currentTarget.getAttribute('name');
        const tabName = e.currentTarget.getAttribute('data-edit-tab');
        this.context.setActiveSettingsPath(`content.${tabName}.${name}`);
    }
    handleContentChange(e){
        const val = e.target.value || e.target.innerText || '';
        const tmp = document.createElement('div');
        tmp.innerHTML = val;
        const textVal = tmp.textContent || '';
        const name = e.currentTarget.getAttribute('name');
        const language = this.context.dataToExclude.activeLocale || null;
        if (textVal.length || e.type === 'blur') {
            this.context.setTranslations(language, { [name]: textVal });
        }
        if (e.type === 'blur') {
            const tabName = e.currentTarget.getAttribute('data-edit-tab');
            this.context.setActiveSettingsPath(`content.${tabName}`);
        }
    }

    render() {
        const { showLanguagesModal } = this.state;
        const {
            style: {
                header: {top, description},
                background_and_logo,
            },
            dataToExclude: {gdprSettingsStatus, gdprSettingsSetting, agreeWithTermsAndConditionsLabel, allowToUsePersonalInfoLabel, previewDeviceType},
        } = this.context;
        const logo = background_and_logo[`${previewDeviceType}Logo`] || background_and_logo.desktopLogo;

        const language = this.context.dataToExclude.activeLocale || null;
        const translation = this.context.translations[language] || {};
        const langShort = this.context.convertLocaleName(language);
        const LangIcon = Icons[`Flag${langShort}`];
        return (
            <div className="previewWrap">
                <div className={(previewDeviceType === 'mobile') ? "previewMain mobile" : "previewMain"}
                     ref={this.PreviewMain}>
                    <div className="previewContainer">
                        <div className="header">
                            <div className="previewLogoPlace">
                                {(logo && logo.url !== '') ?
                                    <img src={`${logo.url}`} alt=""/> : ''}
                            </div>
                        </div>
                        <div className="section"
                             ref={this.ContainerMain}>
                            {this.context.dataToExclude.successMessageStatus ?
                                <div className="contentPlace">
                                    {Boolean(translation.successMessageText) && <ContentEditable
                                        name="successMessageText"
                                        html={translation.successMessageText || ''}
                                        onChange={this.handleContentChange}
                                        onBlur={this.handleContentChange}
                                        onFocus={this.beforeEditContent}
                                        data-edit-tab="success_actions"
                                        className="text"
                                        tagName="p"
                                        data-cy="successTextPreview"
                                    />}
                                </div>
                                : <div className="contentPlace">
                                    <div className="textPlace">
                                        {Boolean(translation.name) && <ContentEditable
                                            name="name"
                                            html={translation.name || ''}
                                            onChange={this.handleContentChange}
                                            onBlur={this.handleContentChange}
                                            onFocus={this.beforeEditContent}
                                            data-edit-tab="header"
                                            className="head"
                                            tagName="p"
                                            data-cy="headerTopTextPreview"
                                        />}

                                        {Boolean(translation.description) && <ContentEditable
                                            name="description"
                                            html={translation.description || ''}
                                            onChange={this.handleContentChange}
                                            onBlur={this.handleContentChange}
                                            onFocus={this.beforeEditContent}
                                            data-edit-tab="header"
                                            className="description"
                                            tagName="p"
                                            data-cy="headerDescriptionTextPreview"
                                        />}
                                    </div>
                                    {gdprSettingsStatus ?
                                        <div className="contentPlace">
                                            {gdprSettingsSetting !== 'No' &&
                                            <div data-cy="gdprPreview">
                                                {allowToUsePersonalInfoLabel &&
                                                    <p className={'gdprLabel'}>
                                                        <input type="checkbox"/>
                                                        <span ref={this.allow}
                                                            dangerouslySetInnerHTML={{__html: allowToUsePersonalInfoLabel}}>
                                                        </span>
                                                    </p>
                                                }
                                                {agreeWithTermsAndConditionsLabel &&
                                                    <p className={'gdprLabel'}>
                                                        <input type="checkbox"/>
                                                        <span ref={this.agree}
                                                            dangerouslySetInnerHTML={{__html: agreeWithTermsAndConditionsLabel}}>
                                                        </span>
                                                    </p>
                                                }
                                            </div>
                                            }
                                        </div> : ''}
                                    <Methods/>
                                </div>
                            }
                            <div className="langaugeSwitcher"
                                 onClick={() => this.setState({ showLanguagesModal: true })}
                                 data-cy="langaugeSwitcherPreview"
                                 data-lang={language}
                            >
                                {LangIcon && <LangIcon/>}
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="contentPlace">
                            {Boolean(translation.footer) && <ContentEditable
                                name="footer"
                                html={translation.footer || ''}
                                onChange={this.handleContentChange}
                                onBlur={this.handleContentChange}
                                onFocus={this.beforeEditContent}
                                data-edit-tab="footer"
                                className="text"
                                tagName="p"
                                data-cy="footerTextPreview"
                            />}
                        </div>
                    </div>
                    {Boolean(showLanguagesModal) && <LanguagesModal onClose={() => this.setState({ showLanguagesModal: false })} />}
                </div>
            </div>
        )
    }
}

export default Preview;
