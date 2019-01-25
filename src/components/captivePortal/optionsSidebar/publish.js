import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createPortal, publishPortal, previewPortal, updatePortal} from "../../../api/API";
import Loader from "../../../loader";

class Publish extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getBuilderParams = this.getBuilderParams.bind(this);
    }

    componentDidMount() {
        // console.log(this.props.state);
    }

    publishPortalMethodHandler = async (id) => {
        this.props.loaderHandler();
        const portalDataToSend = this.getBuilderParams();
        const token = localStorage.getItem('token');
        const cpID = localStorage.getItem('cpID');
        const query = cpID ? (publishPortal(token, portalDataToSend, cpID), updatePortal(token, portalDataToSend, cpID)) : createPortal(token, portalDataToSend);
        await query.then(res => {
            console.log(res);
            this.props.loaderHandler();
        });
    };

    previewPortalMethodHandler = async () => {
        this.props.loaderHandler();
        const portalDataToSend = this.getBuilderParams();
        const token = localStorage.getItem('token');
        const query = previewPortal(token, portalDataToSend);
        await query.then(res => {
            console.log(res);
            const {data} = res;
            this.props.loaderHandler();
            window.open(data, '_blank');
        });
    };

    getBuilderParams() {

        const {
            name: {name},
            css: {path},
            header: {top, description},
            footer,
            background_and_logo: {background, logo},
            container_background,
            container_border,
            container_size,
            login_methods: {methods},
            imagesIDs
        } = this.props.tabName;

        alert(background.url);
        alert(logo.url);

        const portalDataToSend = {
            background: background.url,
            name: name && name,
            externalStylesUrl: path && path,
            logoId: imagesIDs.logoID,
            backgroundId: imagesIDs.backgroundID,
            header: top.text,
            description: description.text,
            footer: footer.text,
            style: {
                header: {
                    top: top.styles,
                    description: description.styles,
                },
                footer: footer.styles,
                background_and_logo: {
                    background: {
                        url: background.url,
                        color: background.color
                    },
                    logo: {
                        url: logo.url,
                        position: logo.position,
                    }
                },
                container_background: {
                    color: container_background.color,
                    opacity: container_background.opacity !== null ? container_background.opacity : 100,
                },
                container_border: {
                    color: container_border.color,
                    type: container_border.type,
                    thickness: container_border.thickness,
                    radius: container_border.radius,
                },
                container_size: {
                    width: container_size.width,
                    padding: container_size.padding
                }
            },
            googleLogin: methods.google,
            facebookLogin: methods.facebook,
            twitterLogin: methods.twitter
        };
        return portalDataToSend;
    }

    render() {
        return (
            <div className="buttonsRow">
                <button type="button" onClick={this.previewPortalMethodHandler} className="previewBtn">Preview
                </button>
                <button type="button" onClick={this.publishPortalMethodHandler} className="publishBtn">Publish
                </button>
                {/*<span>Please allow new windows opening</span>*/}
            </div>
        )
    }
}

export default connect(
    state => ({
        tabName: state
    })
)(Publish);
