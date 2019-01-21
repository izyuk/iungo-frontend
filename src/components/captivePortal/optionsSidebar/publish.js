import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createPortal, publishPortal, previewPortal} from "../../../api/API";

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
        const portalDataToSend = this.getBuilderParams();
        const token = localStorage.getItem('token');
        const query = createPortal(token, portalDataToSend);
        await query.then(res => {
            console.log(res);
        });
    };

    previewPortalMethodHandler = async () => {
        const portalDataToSend = this.getBuilderParams();
        const token = localStorage.getItem('token');
        const query = previewPortal(token, portalDataToSend);
        await query.then(res => {
            console.log(res);
            const {data} = res;

            window.open(data, '_blank');
            // let a = document.createElement('a');
            // a.setAttribute('href', data);
            // a.setAttribute('target', '_blank');
            //
            // a.click();
        });
    };

    getBuilderParams() {

        let {
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

        let portalDataToSend = {
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
                    opacity: container_background.opacity,
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
        // this.publishPortalMethodHandler(portalDataToSend, 4);
    }

    render() {
        return (
            <div className="buttonsRow">
                <button type="button" onClick={this.previewPortalMethodHandler} className="previewBtn">Preview</button>
                <button type="button" onClick={this.publishPortalMethodHandler} className="publishBtn">Publish</button>
            </div>
        )
    }
}

export default connect(
    state => ({
        tabName: state
    })
)(Publish);