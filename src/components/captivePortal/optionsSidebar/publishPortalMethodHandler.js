import {createPortal, updatePortal} from "../../../api/API";

export const PublishPortalMethodHandler = async (portalDataToSend, cpID) => {
    const token = localStorage.getItem('token');
    let collectData = {};
    if (cpID) {
        const query = updatePortal(token, portalDataToSend, cpID);
        await query.then(res => {
            collectData.notification = true;
            collectData.publishedType = 'updated and published';
        })
    }
    else {
        await createPortal(token, portalDataToSend)
            .then(res => {
                if (res.status !== 400 || res.status !== 500) {
                    // updatePortal(token, portalDataToSend, res.data.id);
                    collectData.id = res.data.id;
                    collectData.notification = true;
                    collectData.publishedType = 'created and published';
                } else {
                    collectData.notification = true;
                    collectData.failed = true;
                    collectData.publishedType = `Error: ${res.data.errors[0].field} input ${res.data.errors[0].message}`;
                }
            })
    }

    return collectData;

};
