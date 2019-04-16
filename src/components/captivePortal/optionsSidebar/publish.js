import React, {Component} from 'react';
import {connect} from 'react-redux';
import { previewPortal } from "../../../api/API";
import { PublishPortalMethodHandler } from './publishPortalMethodHandler';
import { GetBuilderParams } from './getBuilderParams';
import Notification from "../../additional/notification";

class Publish extends Component {
    state = {
        id: localStorage.getItem('cpID'),
        notification: false,
        publishedType: '',
        failed: false
    };

    callPublishMethod = async () => {
        document.getElementById('portalName').classList.add('error');
        this.props.addPortalName('');
        if(this.props.tabName.name.name.length > 0){
            this.props.loaderHandler();
            const portalDataToSend = GetBuilderParams(this.props.tabName);
            const data = await PublishPortalMethodHandler(portalDataToSend, this.state.id === null ? localStorage.getItem('cpID') : this.state.id);
            this.setState(data);
            if(data.id){
                localStorage.setItem('cpID', data.id);
            }
            this.props.loaderHandler();
            setTimeout(() => {
                this.setState({notification: false, failed: false});
            }, 2000)
        }
    };

    previewPortalMethodHandler = async () => {
        this.props.loaderHandler();
        const portalDataToSend = GetBuilderParams(this.props.tabName);
        const token = localStorage.getItem('token');
        const query = previewPortal(token, portalDataToSend);
        await query.then(res => {
            const {data} = res;
            this.props.loaderHandler();
            window.open(data, '_blank');
        });
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
                    <button type="button" onClick={this.previewPortalMethodHandler} className="previewBtn">Preview
                    </button>
                    <span>Please allow new windows opening</span>
                </p>
                <button type="button" onClick={this.callPublishMethod} className="publishBtn">Publish
                </button>
                {this.state.notification &&
                <Notification type={this.state.failed ? 'fail' : 'info'}
                              text={this.state.publishedType}/>}
            </div>
        )
    }
}

export default connect(
    state => ({
        tabName: state
    }),
    dispatch => ({
        addPortalName: (name) => {
            dispatch({type: "PORTAL_NAME", payload: name})
        },
    })
)(Publish);
