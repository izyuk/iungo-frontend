import React, {Component} from 'react';

import Preview from './preview/preview';
import Options from './optionsSidebar/options';
import {getPortal, getPortalByUUID, getPublicFonts, getTemplate, getTermsAndConditionsParams} from "../../api/API";
import Loader from "../../loader";

import {GetBuilderParams} from "./optionsSidebar/getBuilderParams";
import {PublishPortalMethodHandler} from "./optionsSidebar/publishPortalMethodHandler";
import Notification from "../additional/notification";

import CaptivePortalContext from '../../context/project-context';


class CaptivePortal extends Component {

    static contextType = CaptivePortalContext;


    state = {
        publishedType: '',
        failed: false,
        notification: false,
        styledElements: '',
        stylesArray: '',
        mount: false
    };

    portalName = React.createRef();

    token = this.context.dataToExclude.token;


    findPortal = async (str) => {
        const uuid = this.props.match.params.uuid;
        const from = localStorage.getItem('from');
        if(uuid === 'new' && from === 'templates'){
            localStorage.removeItem('cpID', null);
        }
        let id = localStorage.getItem('cpID') || localStorage.getItem('templateID');
        if (!!!str) {
            str = localStorage.getItem('token');
        }
        if (!!id || (!!uuid && uuid !== 'new')) {
            let query = !!id ? (from === 'templates' ? getTemplate(str, id) : getPortal(str, id)) : getPortalByUUID(str, uuid);
            this.context.loaderHandler(true);
            await query.then(res => {
                const {data} = res;
                const deviceTypes = ['desktop', 'mobile'];
                deviceTypes.map(deviceType => {
                    // background
                    const bgProp = `${deviceType}Background`;
                    this.context.setBackground(data[bgProp] ? data[bgProp].externalUrl : '', data.style.background_and_logo[bgProp].color, data.style.background_and_logo[bgProp].backgroundType, deviceType);
                    this.context.setBackgroundID(data[bgProp] ? data[bgProp].id : '', deviceType);
                    const background = data.style.background_and_logo[bgProp];
                    this.context.setBackgroundRepeating(background.repeat, deviceType);
                    const position = background.position;
                    this.context.setBackgroundPosition({
                        option: position.option,
                        posX: position.posX,
                        posY: position.posY
                    }, position.inPercentDimension, deviceType);
                    const size = background.size;
                    this.context.setBackgroundSize({
                        option: size.option,
                        width: size.width,
                        height: size.height
                    }, size.inPercentDimension, deviceType);
                    // logo
                    const logoProp = `${deviceType}Logo`;
                    this.context.setLogo(
                        data[logoProp] !== null ? data[logoProp].externalUrl : '',
                        !!data.style.background_and_logo[logoProp].horizontalPosition ? data.style.background_and_logo[logoProp].horizontalPosition : this.context.style.background_and_logo[logoProp].horizontalPosition,
                        !!data.style.background_and_logo[logoProp].verticalPosition ? data.style.background_and_logo[logoProp].verticalPosition : this.context.style.background_and_logo[logoProp].verticalPosition,
                        deviceType,
                    );
                    this.context.setLogoID(data[logoProp] ? data[logoProp].id : '', deviceType);
                    // container
                    const container = data.style[`${deviceType}_container`];
                    this.context.setBackgroundStyle(container.background, deviceType);
                    this.context.setBorderStyle(container.border, deviceType);
                    this.context.setSizeStyle(container.size, deviceType);
                    this.context.setContainerVerticalPosition(container.position.vertical || this.context.style.desktop_container.position.vertical, deviceType);
                    // general
                    this.context.checkDeviceTypeDataChanged(deviceType, data);
                });
                this.context.setHeaderTopData(data.header, data.style.header.top);
                this.context.setHeaderDescriptionData(data.description, data.style.header.description);
                this.context.setLoginMethods({
                    facebook: data.facebookLogin,
                    google: data.googleLogin,
                    twitter: data.twitterLogin,
                    phone: data.phoneLogin,
                    button: data.acceptTermsLogin
                });
                this.context.setFooterData(data.footer, data.style.footer);
                this.context.addPortalName(data.name);
                this.context.redirectURLChanger(data.successRedirectUrl);
                this.context.setSuccessMessageData(data.successMessage, data.style.success_message);
                this.context.setButtonStyles({
                    acceptButtonText: data.acceptButtonText,
                    acceptButtonSize: data.style.accept_button_size,
                    acceptButtonColor: data.style.accept_button_color,
                    acceptButtonFont: data.style.accept_button_font,
                    acceptButtonBorder: data.style.accept_button_border
                });
                this.context.setTermsFromBE(data.termAndCondition);
                if (!!data.termAndCondition) {
                    this.context.setGDPRSettings({
                        color: data.style.gdpr_settings.color,
                        fontSize: data.style.gdpr_settings.fontSize,
                        setting: data.termAndCondition.name,
                        agreeWithTermsAndConditionsLabel: data.termAndCondition.agreeWithTermsAndConditionsLabel,
                        allowToUsePersonalInfoLabel: data.termAndCondition.allowToUsePersonalInfoLabel,
                        settingId: data.termAndCondition.id,
                    });
                    if (this.context.termAndConditionId) {
                        this.context.setGDPRSettingsStatus(true);
                    }
                }

                if(!!data.style.header.top.family) {
                    this.context.setFontData({
                        fontName: data.style.header.top.family,
                        fontId: ''
                    });
                } else {
                    // this.context.setFontData({
                    //     fontName: data[0].name,
                    //     fontId: ''
                    // });
                }

                if (from !== 'templates') {
                    if (data.externalCss.length > 0) {
                        const styledElements = document.querySelectorAll('.previewWrap [style]');
                        let stylesArray = [];
                        Object.keys(styledElements).map((item) => {
                            stylesArray.push(styledElements[item].getAttribute('style'));
                        });
                        Object.keys(styledElements).map((item) => {
                            styledElements[item].removeAttribute('style');
                        });
                        this.context.setExternalCssInfo(data.externalCss, true, styledElements, stylesArray);
                        const STYLE = document.getElementsByTagName('STYLE')[0];
                        if (!!STYLE) {
                            STYLE.parentNode.removeChild(STYLE);
                        }
                        const HEAD = document.getElementsByTagName('HEAD')[0];
                        let style = document.createElement('style');
                        style.type = 'text/css';
                        HEAD.appendChild(style);
                    }
                }
                this.context.addPortalName(data.name);
            })
            .catch(err => console.error(err));
            this.context.loaderHandler(false);
        } else {
            this.context.loaderHandler(true);
            this.context.resetGlobalState();
            this.context.loaderHandler(false);
        }
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.state.loader !== nextState.loader)
            || (this.state.publishedType !== nextState.publishedType)
            || (this.state.failed !== nextState.failed)
            || (this.state.styledElements !== nextState.styledElements)
            || (this.state.stylesArray !== nextState.stylesArray)
            || (this.state.mount !== nextState.mount)
            || (this.context !== nextContext);
    }

    nameEditor = (e) => {
        e.currentTarget.classList.add('active');
        e.currentTarget.removeAttribute('disabled');
    };

    sendData = async (e) => {
        if (e.keyCode === 13) {
            if (e.currentTarget.value.length > 0) {
                e.currentTarget.classList.remove('error');
                await this.context.addPortalName(e.currentTarget.value);
                const {dataToExclude, ...rest} = this.context;
                const portalDataToSend = GetBuilderParams(rest);
                this.context.loaderHandler(true);
                let data = await PublishPortalMethodHandler(portalDataToSend, localStorage.getItem('cpID'));
                if (data.id) {
                    localStorage.setItem('cpID', data.id)
                }
                this.context.loaderHandler(false);
                this.context.setNotification(data.publishedType, false, data.notification);
                await setTimeout(() => {
                    this.context.setNotification('', false, false);
                }, 4000);
            } else {
                e.currentTarget.classList.add('error');
            }
        }
    };

    setName = e => {
        e.currentTarget.classList.remove('error');
        this.context.addPortalName(e.currentTarget.value);
    };

    setGDPRToContext = async () => {
        const query = getTermsAndConditionsParams(!!this.token ? this.token : localStorage.getItem('token'));
        await query.then(res => {
            const {data} = res;
            this.context.setGDPRCollection(data);
        });
    };

    getPublicFonts = async () => {
        const query = getPublicFonts(!!this.token ? this.token : localStorage.getItem('token'));
        await query.then(res => {
            const {data} = res;
            this.context.setFontsCollection(data);
        });
    };

    async componentDidMount() {
        await this.getPublicFonts();
        await this.findPortal(this.token);
        await this.setGDPRToContext();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(this.context);
    }

    setPreviewType(deviceType) {
        this.context.setPreviewDeviceType(deviceType);
    }

    render() {
        const deviceType = this.context.previewDeviceType || 'desktop';

        // if (!this.context.dataToExclude.loader) {
            return (
                <div className="container">
                    <div className="wrap wrapFix">
                        <div className="container containerFix">
                            <div className="wrap wrapFix2">
                                <div className="info">
                                    <input id={'portalName'}
                                           type="text"
                                           placeholder={'Name'}
                                           disabled={false}
                                           onBlur={this.setName}
                                           onDoubleClick={this.nameEditor}
                                           onKeyDown={this.sendData}
                                           defaultValue={this.context.name}
                                           autoFocus={!localStorage.getItem('cpID') && !localStorage.getItem('templateID')}
                                           className={'active'} data-cy="captivePortalName"/>
                                    <span></span>
                                    <div className="toggles">
                                        <a href="javascript:void(0)" data-id="desktop"
                                           className={(deviceType === 'desktop') ? 'active' : ''} onClick={() => this.setPreviewType('desktop')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24">
                                                <path fill="#BFC6D3" fillRule="nonzero"
                                                      d="M17.25 6H6.75C6.3 6 6 6.3 6 6.75V14c0 .45.3 1 .75 1H11v2H9v1h6v-1h-2v-2h4.25c.45 0 .75-.55.75-1V6.75c0-.45-.3-.75-.75-.75zM16 8v5H8V8h8z"/>
                                            </svg>
                                            <span>Desktop</span>
                                        </a>
                                        <a href="javascript:void(0)" data-id="mobile" className={(deviceType === 'mobile') ? 'active' : ''}
                                           onClick={() => this.setPreviewType('mobile')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24">
                                                <path fill="#AFB7C8" fillRule="nonzero"
                                                      d="M15.5 6h-6C8.673 6 8 6.673 8 7.5v9c0 .827.673 1.5 1.5 1.5h6c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5zm-3 10.375a.625.625 0 1 1 0-1.25.625.625 0 0 1 0 1.25zM15 14h-5V8h5v6z"
                                                      opacity=".8"/>
                                            </svg>
                                            <span>Mobile</span>
                                        </a>
                                    </div>
                                </div>
                                <Preview />
                            </div>
                        </div>
                        <Options/>
                    </div>
                    {this.context.dataToExclude.notification && <Notification/>}
                    {this.context.dataToExclude.loader && <Loader/>}
                </div>
            )
        // } else {
        //     return <Loader/>
        // }

    }
}

export default CaptivePortal;
