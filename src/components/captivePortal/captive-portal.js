import React, {Component} from 'react';

import Preview from './preview/preview';
import Options from './optionsSidebar/options';
import {getPortal, getTermsAndConditionsParama} from "../../api/API";
import Loader from "../../loader";

import {GetBuilderParams} from "./optionsSidebar/getBuilderParams";
import {PublishPortalMethodHandler} from "./optionsSidebar/publishPortalMethodHandler";
import Notification from "../additional/notification";

import CaptivePortalContext from '../../context/project-context';


class CaptivePortal extends Component {

    static contextType = CaptivePortalContext;


    state = {
        mobile: false,
        publishedType: '',
        failed: false,
        notification: false,
        styledElements: '',
        stylesArray: '',
        mount: false
    };

    portalName = React.createRef();

    findPortal = async (data) => {
        const id = localStorage.getItem('cpID');
        console.log(id);
        console.log('TOKEN findPortal on CP DID MOUNT: ',data);
        if (id !== null) {
            let query = getPortal(data, id);
            this.context.loaderHandler(true);
            await query.then(res => {
                const {data} = res;
                console.log(data);
                this.context.setBackground(data.background !== null ? data.background.externalUrl : '', data.style.background_and_logo.background.color, data.style.background_and_logo.background.backgroundType);
                this.context.setLogo(data.logo !== null ? data.logo.externalUrl : '', data.style.background_and_logo.logo.position);
                this.context.setBorderStyle(data.style.container_border);
                this.context.setBackgroundStyle(data.style.container_background);
                this.context.setSizeStyle(data.style.container_size);
                this.context.setHeaderTopData(data.header, data.style.header.top);
                this.context.setHeaderDescriptionData(data.description, data.style.header.description);
                this.context.setLoginMethods({
                    facebook: data.facebookLogin,
                    google: data.googleLogin,
                    twitter: data.twitterLogin,
                    button: data.acceptTermsLogin
                });
                this.context.setFooterData(data.footer, data.style.footer);
                this.context.setLogoID(data.logo === null ? '' : data.logo.id);
                this.context.setBackgroundID(data.background === null ? '' : data.background.id);
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
                this.context.addPortalName(data.name);
                this.context.setBackgroundRepeating(data.style.background_and_logo.background.repeat);
                const position = data.style.background_and_logo.background.position;
                this.context.setBackgroundPosition({option: position.option, posX: position.posX, posY: position.posY}, position.inPercentDimension);
                const size = data.style.background_and_logo.background.size;
                this.context.setBackgroundSize({option: size.option, width: size.width, height: size.height}, size.inPercentDimension);
                if (data.externalCss.length > 0) {
                    const styledElements = document.querySelectorAll('.previewWrap [style]');
                    let stylesArray = [];
                    Object.keys(styledElements).map((item) => {
                        stylesArray.push(styledElements[item].getAttribute('style'));
                    });
                    Object.keys(styledElements).map((item) => {
                        styledElements[item].removeAttribute('style');
                    });
                    // console.log(styledElements);
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
            });
            this.context.loaderHandler(false);
        } else {
            this.context.loaderHandler(true);
            this.context.resetGlobalState();
            this.context.loaderHandler(false);
        }
        // console.log(this.context);
    };


    trigger = (data) => {
        document.querySelectorAll('[data-id]')[0].classList.remove('active');
        document.querySelectorAll('[data-id]')[1].classList.remove('active');

        if (data.target.nodeName === 'A') {
            data.target.classList.add('active');
        } else if (data.target.closest('a').getAttribute('data-id')) {
            data.target.closest('a').classList.add('active');
        }

        if (data.target.getAttribute('data-id') === 'mobile' || data.target.closest('a').getAttribute('data-id') === 'mobile') {
            this.setState({
                mobile: true
            });
        } else {
            this.setState({
                mobile: false
            });
        }
    };


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.state.mobile !== nextState.mobile)
            || (this.state.loader !== nextState.loader)
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
        const query = getTermsAndConditionsParama(localStorage.getItem('token'));
        await query.then(res => {
            const {data} = res;
            const settingsCollection = data.map(item => item);
            console.log(settingsCollection);
            console.log(this.context);
            this.context.setGDPRCollection(settingsCollection);
        });
    };

    componentDidMount() {
        this.context.setToken(localStorage.getItem('token'));
        this.findPortal(localStorage.getItem('token'));
        this.setGDPRToContext();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.context);
        // console.log('CP ON UPDATE', this.context);
    }

    render() {
        if (!this.context.dataToExclude.loader) {
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
                                           autoFocus={!localStorage.getItem('cpID') ? true : false}
                                           className={'active'} data-cy="captivePortalName"/>
                                    <span></span>
                                    <div className="toggles">
                                        <a href="javascript:void(0)" data-id="desktop"
                                           className="active" onClick={(data) => this.trigger(data)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24">
                                                <path fill="#BFC6D3" fillRule="nonzero"
                                                      d="M17.25 6H6.75C6.3 6 6 6.3 6 6.75V14c0 .45.3 1 .75 1H11v2H9v1h6v-1h-2v-2h4.25c.45 0 .75-.55.75-1V6.75c0-.45-.3-.75-.75-.75zM16 8v5H8V8h8z"/>
                                            </svg>
                                            <span>Desktop</span>
                                        </a>
                                        <a href="javascript:void(0)" data-id="mobile"
                                           onClick={(data) => this.trigger(data)}>
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
                                <Preview
                                    state={this.state}
                                />

                            </div>
                        </div>
                        <Options/>
                    </div>
                    {this.context.dataToExclude.notification && <Notification/>}
                    {this.context.dataToExclude.loader && <Loader/>}
                </div>
            )
        } else {
            return <Loader/>
        }

    }
}

export default CaptivePortal;
