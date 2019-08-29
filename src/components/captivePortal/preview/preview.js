import React, {Component} from 'react';

import Methods from './methods';
import CaptivePortalContext from "../../../context/project-context";


class Preview extends Component {
    static contextType = CaptivePortalContext;

    state = {};

    PreviewMain = React.createRef();
    ContainerMain = React.createRef();
    FooterText = React.createRef();
    agree = React.createRef();
    allow = React.createRef();

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

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.context !== nextContext);
    }

    render() {
        const {
            style: {
                header: {top, description},
                background_and_logo,
            },
            dataToExclude: {gdprSettingsStatus, gdprSettingsSetting, agreeWithTermsAndConditionsLabel, allowToUsePersonalInfoLabel},
            previewDeviceType,
        } = this.context;
        const logo = background_and_logo[`${previewDeviceType}Logo`] || background_and_logo.desktopLogo;
        return (
            <div className="previewWrap">
                <div className={(this.context.previewDeviceType === 'mobile') ? "previewMain mobile" : "previewMain"}
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
                                <div className="contentPlace" data-cy="successTextPreview">
                                    <p className="text">
                                        {this.context.successMessage && this.context.successMessage}
                                    </p>
                                </div>
                                : <div className="contentPlace">
                                    <div className="textPlace">
                                        <p className="head" data-cy="headerTopTextPreview">
                                            {this.context.header && this.context.header}
                                        </p>

                                        <p className="description" data-cy="headerDescriptionTextPreview">
                                            {this.context.description && this.context.description}
                                        </p>
                                    </div>
                                    {gdprSettingsStatus ?
                                        <div className="contentPlace">
                                            {gdprSettingsSetting !== 'No' &&
                                            <div data-cy="gdprPreview">
                                                {agreeWithTermsAndConditionsLabel &&
                                                <p className={'gdprLabel'}>
                                                    <input type="checkbox"/>
                                                    <span ref={this.agree}
                                                          dangerouslySetInnerHTML={{__html: agreeWithTermsAndConditionsLabel}}>
                                                    </span>
                                                </p>
                                                }
                                                {allowToUsePersonalInfoLabel &&
                                                <p className={'gdprLabel'}>
                                                    <input type="checkbox"/>
                                                    <span ref={this.allow}
                                                          dangerouslySetInnerHTML={{__html: allowToUsePersonalInfoLabel}}>
                                                    </span>
                                                </p>
                                                }
                                            </div>
                                            }
                                        </div> : ''}
                                    <Methods/>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="footer">
                        <div className="contentPlace">
                            <p className="text" ref={this.FooterText} data-cy="footerTextPreview">
                                {this.context.footer && this.context.footer}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Preview;
