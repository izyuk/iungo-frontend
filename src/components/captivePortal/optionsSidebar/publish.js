import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createPortal, publishPortal, previewPortal, updatePortal} from "../../../api/API";
import Loader from "../../../loader";
import Notification from "../../additional/notification";

class Publish extends Component {
    // constructor(props) {
    //     super(props);
    /*this.*/
    state = {
        id: localStorage.getItem('cpID'),
        notification: false,
        publishedType: '',
        failed: false
    };
    // this.getBuilderParams = this.getBuilderParams.bind(this);
    // }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    publishPortalMethodHandler = async (id) => {
        this.props.loaderHandler();
        const portalDataToSend = this.getBuilderParams();
        console.log(portalDataToSend);
        const token = localStorage.getItem('token');
        const cpID = this.state.id;
        if (cpID) {
            const query = (publishPortal(token, portalDataToSend, cpID), updatePortal(token, portalDataToSend, cpID));
            await query.then(res => {
                this.props.loaderHandler();
                this.setState({
                    notification: true,
                    publishedType: 'updated and published'
                })
            })
        }
        else {
            await createPortal(token, portalDataToSend)
                .then(res => {
                    if (res.status !== 400) {
                        this.setState({
                            id: res.data.id,
                            notification: true,
                            publishedType: 'created and published'
                        });

                        this.props.loaderHandler();

                        publishPortal(token, portalDataToSend, res.data.id);
                    } else {
                        this.setState({
                            notification: true,
                            failed: true,
                            publishedType: `Error: ${res.data.errors[0].field} input ${res.data.errors[0].message}`
                        });
                        this.props.loaderHandler();
                        document.onclick = () => {
                            console.log('here');
                            console.log(document);
                            this.setState({notification: false, failed: false});
                        }
                    }
                })
        }

        setTimeout(() => {
            this.setState({notification: false, failed: false});
        }, 2000)

    };

    previewPortalMethodHandler = async () => {
        this.props.loaderHandler();
        const portalDataToSend = this.getBuilderParams();
        const token = localStorage.getItem('token');
        const query = previewPortal(token, portalDataToSend);
        await query.then(res => {
            const {data} = res;
            this.props.loaderHandler();
            window.open(data, '_blank');
        });
    };

    getBuilderParams = () => {

        const {
            name: {name},
            css: {path},
            header: {top, description},
            footer,
            successMessage,
            background_and_logo: {background, logo},
            container_background,
            container_border,
            container_size,
            login_methods: {methods},
            imagesIDs
        } = this.props.tabName;
        const portalDataToSend = {
            background: background.type === 'COLOR' ? null : background.url,
            name: name && name,
            externalCss: path && path,
            logoId: imagesIDs.logoID,
            backgroundId: background.type === 'COLOR' ? null : imagesIDs.backgroundID,
            header: top.text,
            description: description.text,
            footer: footer.text,
            successMessage: successMessage.text,
            style: {
                header: {
                    top: top.styles,
                    description: description.styles,
                },
                footer: footer.styles,
                success_message: successMessage.styles,
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
                <button type="button" onClick={this.publishPortalMethodHandler} className="publishBtn">Publish
                </button>
                {this.state.notification &&
                <Notification type={this.state.failed ? 'fail' : 'info'}
                              text={!this.state.failed ? `Your Captive Portal was ${this.state.publishedType}` : this.state.publishedType}/>}
            </div>
        )
    }
}

export default connect(
    state => ({
        tabName: state
    })
)(Publish);
