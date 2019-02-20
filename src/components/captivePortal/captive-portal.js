import React, {Component} from 'react';
import {connect} from 'react-redux';

import Preview from './preview/preview';
import Options from './optionsSidebar/options';
import {upload_file} from "../../reducers/background_and_logo";
import {getPortal, createPortal} from "../../api/API";
import Loader from "../../loader";


class CaptivePortal extends Component {
    // constructor(props) {
    //     super(props);
    state = {
        mobile: false,
        backgrName: '',
        logoName: '',
        type: '',
        backgroundType: 'COLOR',
        alignment: 'center',
        container: '' || {
            border: this.props.background_and_logo.container_border,
            background: this.props.background_and_logo.container_background,
            size: this.props.background_and_logo.container_size
        },
        headerText: (this.props.background_and_logo.header_top_text_data && this.props.background_and_logo.header_description_text_data) ? {
            top: this.props.background_and_logo.header_top_text_data,
            descr: this.props.background_and_logo.header_description_text_data
        } : '',
        methods: {
            facebook: true,
            google: true,
            twitter: true
        },
        footerContent: this.props.background_and_logo.footer_description || '',
        loader: true,
        portalName: 'Captive Portal Builder'
    };

    portalName = React.createRef();
    // }

    eventHandler = (name, type, backgroundType) => {
        if (type === 'background') {
            this.setState({
                backgrName: name
            })
        }
        if (type === 'logo') {
            this.setState({
                logoName: name
            })
        }
        this.setState({
            type: type,
            backgroundType: backgroundType
        })
    };

    loaderHandler = () => {
        this.setState({
            loader: !this.state.loader
        });
    };


    findPortal = async (data) => {

        const id = this.props.settedId ? this.props.settedId : localStorage.getItem('cpID');
        if (id !== null) {
            let query = getPortal(data, id);

            this.props.loaderHandler();
            await query.then(res => {
                const {data} = res;
                console.log(data);
                this.props.setBackground(data.background !== null ? data.background.externalUrl : '', data.style.background_and_logo.background.color, data.style.background_and_logo.background.backgroundType);
                this.props.setLogo(data.logo !== null ? data.logo.externalUrl : '', data.style.background_and_logo.logo.position);
                this.props.setBorderStyle(data.style.container_border);
                this.props.setBackgroundStyle(data.style.container_background);
                this.props.setSizeStyle(data.style.container_size);
                this.props.setHedaerTopData(data.header, data.style.header.top);
                this.props.setHedaerDescriptionData(data.description, data.style.header.description);
                this.props.setLoginMethods({
                    facebook: data.facebookLogin,
                    google: data.googleLogin,
                    twitter: data.twitterLogin
                });
                this.props.setFooterData(data.footer, data.style.footer);
                this.props.setLogoID(data.logo === null ? '' : data.logo.id);
                this.props.setBackgroundID(data.background === null ? '' : data.background.id);
                this.props.addPortalName(data.name);
                this.props.setCSS(data.externalCss);
                if (data.externalCss) {
                    const STYLE = document.getElementsByTagName('STYLE')[0];
                    if (STYLE) STYLE.parentNode.removeChild(STYLE);
                    const HEAD = document.getElementsByTagName('HEAD')[0];
                    let style = document.createElement('style');
                    style.innerText = data.externalCss;

                    HEAD.appendChild(style);
                }
                this.setState({
                    type: 'background',
                    backgroundType: data.style.background_and_logo.background.backgroundType,
                    backgrName: data.background !== null ? data.background.externalUrl : data.style.background_and_logo.background.color,
                    logoName: data.logo !== null ? data.logo.externalUrl : '',
                    alignment: data.style.background_and_logo.logo.position,
                    container: {
                        border: data.style.container_border,
                        background: data.style.container_background,
                        size: data.style.container_size
                    },
                    headerText: {
                        top: data.header,
                        descr: data.description
                    },
                    methods: {
                        facebook: data.facebookLogin, google: data.googleLogin, twitter: data.twitterLogin
                    },
                    footerContent: data.footer,
                    loader: false,
                    portalName: data.name
                });
                console.log(this.portalName);
                this.portalName.current.value = data.name;
                this.props.loaderHandler();
            });
        }

        else {
            this.setState({
                loader: false
            });
        }

    };


    containerHandler = (data) => {
        this.setState({
            container: data
        })
    };

    alignment = (position = 'center') => {
        this.setState({
            alignment: position
        })
    };


    trigger = (data) => {
        document.querySelectorAll('[data-id]')[0].classList.remove('active');
        document.querySelectorAll('[data-id]')[1].classList.remove('active');

        if (data.target.nodeName === 'A') {
            data.target.classList.add('active');
        }
        else if (data.target.closest('a').getAttribute('data-id')) {
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

    contentData = (data) => {
        this.setState({
            headerText: data
        })
    };

    loginMethods = (data) => {
        this.setState({
            methods: data
        })
    };

    footerTextData = (data) => {

        this.setState({
            footerContent: data
        })
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.backgrName !== nextState.backgrName) return true;
        else if (this.state.logoName !== nextState.logoName) return true;
        else if (this.state.type !== nextState.type) return true;
        else if (this.state.backgroundType !== nextState.backgroundType) return true;
        else if (this.state.alignment !== nextState.alignment) return true;
        else if (this.state.mobile !== nextState.mobile) return true;
        else if (this.state.container !== nextState.container) return true;
        else if (this.state.headerText !== nextState.headerText) return true;
        else if (this.state.methods !== nextState.methods) return true;
        else if (this.state.footerContent !== nextState.footerContent) return true;
        else if (this.props.tabName !== nextProps.tabName) return true;
        else if (this.state.portalName !== nextProps.portalName) return true;
        else return true;
    }

    componentDidMount() {
        this.props.token.token ? this.findPortal(this.props.token.token) : this.findPortal(localStorage.getItem('token'));

        // let currentDay = function (sp) {
        //     let today = new Date();
        //     let dd = today.getDate();
        //     let mm = today.getMonth() + 1;
        //     let yyyy = today.getFullYear();
        //     let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        //
        //     if (dd < 10) dd = '0' + dd;
        //     if (mm < 10) mm = '0' + mm;
        //     return (mm + sp + dd + sp + yyyy + sp + time);
        // };

        // this.props.addPortalName(`CaptivePortal - ${currentDay('/')}`);

    }

    componentDidUpdate() {

    }

    nameEditor = (e) => {
        e.currentTarget.classList.add('active');
        e.currentTarget.removeAttribute('disabled');
    };

    setName = (e) => {

        if (e.currentTarget.value.length > 3) {
            e.currentTarget.classList.remove('active');
            e.currentTarget.classList.remove('error');
            e.currentTarget.setAttribute('disabled', true);
            this.setState({
                portalName: e.currentTarget.value
            });
            this.props.addPortalName(e.currentTarget.value);
        } else {
            e.currentTarget.classList.add('error');
        }
    };

    render() {
        if (this.state.loader) {
            return (
                <div className="container">
                    <Loader/>
                </div>
            )
        }
        else {
            return (
                <div className="container">
                    <div className="wrap wrapFix">
                        <div className="container containerFix">
                            <div className="wrap wrapFix2">
                                <div className="info">
                                    {/*<h3>Captive Portal Builder</h3>*/}
                                    <input ref={this.portalName}
                                           type="text"
                                           placeholder={'Name'}
                                           disabled={false}
                                           onDoubleClick={this.nameEditor}
                                           onBlur={this.setName}
                                           className={'active'}/>
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
                                <Preview state={this.state}
                                         header={this.props.background_and_logo.header}
                                         footerTextData={this.props.background_and_logo.footer}
                                />

                            </div>
                        </div>
                        <Options alignment={this.alignment}
                                 handler={this.eventHandler}
                                 containerHandler={this.containerHandler}
                                 textData={this.contentData}
                                 methods={this.loginMethods}
                                 footerTextData={this.footerTextData}
                                 loaderHandler={this.props.loaderHandler}/>
                    </div>
                </div>
            )
        }

    }
}

export default connect(
    state => ({
        background_and_logo: state,
        token: state.token,
        name: state.name,
        tabName: state
    }),
    dispatch => ({
        addPortalName: (name) => {
            dispatch({type: "PORTAL_NAME", payload: name})
        },
        setBackground: (path, color, type) => {
            dispatch({type: "UPLOAD_BACKGROUND", payload: {path, color, type}});
        },
        setLogo: (path, position) => {
            dispatch({type: "UPLOAD_LOGO", payload: {path, position}});
        },
        setBorderStyle: (data) => {
            dispatch({type: "container_border", payload: data});
        },
        setBackgroundStyle: (data) => {
            dispatch({type: "container_background", payload: data});
        },
        setSizeStyle: (data) => {
            dispatch({type: "container_size", payload: data});
        },
        setHedaerTopData: (text, styles) => {
            dispatch({type: "HEADER_TOP", payload: {text, styles}});
        },
        setHedaerDescriptionData: (text, styles) => {
            dispatch({type: "HEADER_DESCRIPTION", payload: {text, styles}});
        },
        setLoginMethods: (data) => {
            dispatch({type: "LOGIN_METHODS", payload: data});
        },
        setFooterData: (text, styles) => {
            dispatch({type: "FOOTER_DESCRIPTION", payload: {text, styles}});
        },
        setLogoID: (id) => {
            dispatch({type: "SET_logoID", payload: id});
        },
        setBackgroundID: (id) => {
            dispatch({type: "SET_backgroundID", payload: id});
        },
        setCSS: (str) => {
            dispatch({type: 'SET_CSS', payload: str})
        }
    })
)(CaptivePortal);
// export default CaptivePortal;
