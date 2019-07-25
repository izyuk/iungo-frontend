import {createNewTemplate, createPortal, updatePortal} from "../../../api/API";

export const PublishPortalMethodHandler = async (event, portalDataToSend, cpID) => {
    const token = localStorage.getItem('token');
    let collectData = {};
    const from = localStorage.getItem('from');
    if(event.target.name !== 'create-template'){
        if ((cpID && from === 'cp-list') || (cpID && from === 'templates')) {
            const query = updatePortal(token, portalDataToSend, cpID);
            await query.then(res => {
                collectData.notification = true;
                collectData.publishedType = 'updated and published';
            })
        } else {
            await createPortal(token, portalDataToSend)
                .then(res => {
                    collectData.id = res.data.id;
                    collectData.notification = true;
                    collectData.publishedType = 'created and published';
                })
                .catch(err => {
                    collectData.notification = true;
                    collectData.failed = true;
                    collectData.publishedType = `Error: ${err.status}`;
                })
        }
    }
        else {
            if(cpID) {
                const merged = {...portalDataToSend, ...{portalId: cpID}};
                console.log(merged);
                const query = createNewTemplate(token, merged);
                await query.then(res => {
                    collectData.notification = true;
                    collectData.publishedType = 'template created';
                })
            }
        }

    return collectData;

};
