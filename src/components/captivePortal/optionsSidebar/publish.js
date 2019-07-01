import React, {Component} from 'react';
import {connect} from 'react-redux';
import {previewPortal} from "../../../api/API";
import {PublishPortalMethodHandler} from './publishPortalMethodHandler';
import {GetBuilderParams} from './getBuilderParams';
import Notification from "../../additional/notification";
import CaptivePortalContext from "../../../context/project-context";

class Publish extends Component {

    static contextType = CaptivePortalContext;

    state = {
        id: localStorage.getItem('cpID'),
        notification: false,
        publishedType: '',
        failed: false
    };

    callPublishMethod = async () => {
        console.log(this.context);
        if(this.context.name.length > 0){
            const {
                addPortalName,
                setBackground,
                setLogo,
                setBorderStyle,
                setBackgroundStyle,
                setSizeStyle,
                setHeaderTopData,
                setHeaderDescriptionData,
                setLoginMethods,
                setFooterData,
                setLogoID,
                setBackgroundID,
                setCSS,
                redirectURLChanger,
                setButtonStyles,
                setSuccessMessageData,
                setExternalCssInfo,
                loaderHandler,
                setSuccessMessageStatus,
                setNotification,
                resetGlobalState,
                setToken,
                removeLogo,
                setBackgroundAttachment,
                setBackgroundPosition,
                setBackgroundRepeating,
                setGDPRSettingsStatus,
                setGDPRSettings,
                setGDPRCollection,
                setBackgroundSize,
                previewCssGenerator,
                dataToExclude,
                urlPathHandler,
                profileHandler,
                ...rest
            } = this.context;
            this.context.loaderHandler(true);
            const portalDataToSend = GetBuilderParams(rest);
            console.log('GDPR DATA TO SEND: ', portalDataToSend.style.gdpr_settings);
            const data = await PublishPortalMethodHandler(portalDataToSend, this.state.id === null ? localStorage.getItem('cpID') : this.state.id);
            this.setState(data);
            if(data.id){
                localStorage.setItem('cpID', data.id);
            }
            this.context.loaderHandler(false);
            this.context.setNotification(data.publishedType, false, data.notification);
            setTimeout(() => {
                this.context.setNotification('', false, false);
            }, 2000)
        } else {
            this.context.addPortalName('');
            document.getElementById('portalName').classList.add('error');
        }
    };

    previewPortalMethodHandler = async () => {
        const {
            addPortalName,
            setBackground,
            setLogo,
            setBorderStyle,
            setBackgroundStyle,
            setSizeStyle,
            setHeaderTopData,
            setHeaderDescriptionData,
            setLoginMethods,
            setFooterData,
            setLogoID,
            setBackgroundID,
            setCSS,
            redirectURLChanger,
            setButtonStyles,
            setSuccessMessageData,
            setExternalCssInfo,
            loaderHandler,
            setSuccessMessageStatus,
            setNotification,
            resetGlobalState,
            setToken,
            removeLogo,
            setBackgroundAttachment,
            setBackgroundPosition,
            setBackgroundRepeating,
            setGDPRSettingsStatus,
            setGDPRSettings,
            setGDPRCollection,
            setBackgroundSize,
            previewCssGenerator,
            dataToExclude,
            urlPathHandler,
            profileHandler,
            ...rest
        } = this.context;
        await this.props.collectData(rest);


        this.context.loaderHandler(true);
        // const {dataToExclude, ...rest} = this.context;
        const portalDataToSend = GetBuilderParams(rest);
        const token = localStorage.getItem('token');
        const query = previewPortal(token, portalDataToSend);
        await query.then(res => {
            const {data} = res;
            this.context.loaderHandler(false);
            window.open(data, '_blank');
        });
        console.log(this.props.allData);
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.id !== nextState.id) return true;
        else if (this.state.notification !== nextState.notification) return true;
        else if (this.state.publishedType !== nextState.publishedType) return true;
        else return false;
    }

    render() {
        return (
            <div className="buttonsRow">
                <p>
                    <button type="button" onClick={this.previewPortalMethodHandler} data-cy="previewBtn" className="previewBtn">Preview
                    </button>
                    <span>Please allow new windows opening</span>
                </p>
                <button type="button" onClick={this.callPublishMethod} className="publishBtn">Save
                </button>
                {this.context.dataToExclude.notification && <Notification/>}
            </div>
        )
    }
}

export default connect(
    state => ({
        allData: state
    }),
    dispatch => ({
        collectData: (data) => {
            dispatch({type: "COLLECT_DATA", payload: data})
        },
    })
)(Publish);
