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
        // console.log(this.context);
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

        // console.log(this.PreviewMain.current.classList);


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
        // console.log(this.PreviewMain.current.classList);

        const STYLE = document.getElementsByTagName('STYLE')[document.getElementsByTagName('STYLE').length - 1];
        if (!!STYLE) {
            STYLE.parentNode.removeChild(STYLE);
        }
        const BODY = document.getElementsByTagName('BODY')[0];
        let styleTag = document.createElement('style');
        styleTag.type = 'text/css';
        styleTag.innerHTML = this.context.previewCssGenerator();
        BODY.appendChild(styleTag);
        console.log(this.context.termAndConditionId);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.state.mobile !== nextProps.state.mobile) return true;
        else if (this.context !== nextContext) return true;
        else return false;
    }

    render() {
        const {
            style: {
                header: {top, description},
                footer,
                container_background,
                container_border,
                container_size,
                background_and_logo: {background},
                success_message
            },
            dataToExclude: {gdprSettingsStatus, gdprSettingsSetting, agreeWithTermsAndConditionsLabel, allowToUsePersonalInfoLabel}
        } = this.context;

        return (
            <div className="previewWrap">
                <div className={this.props.state.mobile ? "previewMain mobile" : "previewMain"}
                     ref={this.PreviewMain}>
                    <div className="previewContainer">
                        <div className="header">
                            <div className="previewLogoPlace">
                                {this.context.style.background_and_logo.logo.url !== '' ?
                                    <img src={`${this.context.style.background_and_logo.logo.url}`} alt=""/> : ''}
                            </div>
                        </div>
                        <div className="section"
                             ref={this.ContainerMain}>
                            {this.context.dataToExclude.successMessageStatus ?
                                <div className="contentPlace">
                                    <p className="text">
                                        {this.context.successMessage && this.context.successMessage}
                                    </p>
                                </div>
                                : <div className="contentPlace">
                                    <div className="textPlace">
                                        <p className="head">
                                            {this.context.header && this.context.header}
                                        </p>

                                        <p className="description">
                                            {this.context.description && this.context.description}
                                        </p>
                                    </div>
                                    {gdprSettingsStatus ?
                                        <div className="contentPlace">
                                            {gdprSettingsSetting !== 'set nothing' &&
                                            <div>
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
                            <p className="text" ref={this.FooterText}>
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
