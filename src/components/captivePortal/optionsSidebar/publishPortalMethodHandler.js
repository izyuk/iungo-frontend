import {createPortal, publishPortal, updatePortal} from "../../../api/API";

export const PublishPortalMethodHandler = async (portalDataToSend, cpID) => {
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
