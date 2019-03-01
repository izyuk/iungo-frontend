// import sha1 from 'sha1';
import axios from 'axios';

const AUTH_API = 'https://marketing-auth.iungo.network';
const BACKEND_API = 'https://marketing-backend.iungo.network';
const ANALYTICS_API = 'https://marketing-analytics.iungo.network';


function authChecker(response){
    if (response.status === 401){
        window.location = '/';
    } else return response
}

// const Api = {
export const userLogin = (login, password) => {
    let myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    });
    return axios({
        method: 'post',
        headers: myHeaders,
        url: `${AUTH_API}/login`,
        mode: 'no-cors',
        data: {"username": login, "password": password}
    })
        .then(res => res)
        .catch(err => err.response);

};
export const userRegister = (login, password) => {
    let myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });

    return axios({
        method: 'post',
        headers: myHeaders,
        url: `${AUTH_API}/user`,
        mode: 'no-cors',
        data: {"username": login, "password": password}
    })
        .then(res => res)
        .catch(err => err.response);

};
export const getAllPortals = (string) => {
    return axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/portal`,
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};
export const getPortal = (string, id) => {
    return axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/portal/${id}`,
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

// export const uploadImage = (string, name, base64) => {
//     return axios({
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             'Authorization': `${string}`
//         },
//         url: `${BACKEND_API}/image`,
//         mode: 'no-cors',
//         data: {"name": name, "base64Content": base64},
//         onUploadProgress: progressEvent => {
//             console.log(Math.round(progressEvent.loaded/progressEvent.total*100));
//             return Math.round(progressEvent.loaded/progressEvent.total*100);
//         }
//     })
//         .then(res => res)
//         // .then()
//         .catch(err => console.warn('In uploadImage API method\n', err));
//
// };

export const getAllImages = (string) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/image`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const getHotspots = (string) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/hotspot`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};
export const createHotspot = (string, name, address, description, portalId) => {
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/hotspot`,
        mode: 'no-cors',
        data: {
            "name": name,
            "address": address,
            "description": description,
            "portalId": portalId
        }
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};
export const updateHotspotById = (string, name, address, description, portalId, hotspotId) => {
    return axios({
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/hotspot/${hotspotId}`,
        mode: 'no-cors',
        data: {
            "name": name,
            "address": address,
            "description": description,
            "portalId": !portalId ? null : portalId
        }
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};
export const createPortal = (string, info) => {
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/portal`,
        mode: 'no-cors',
        data: info
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const updatePortal = (string, info, id) => {
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/portal/publish/${id}`,
        mode: 'no-cors',
        data: info
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const publishPortal = (string, info, id) => {
    return axios({
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/portal/${id}`,
        mode: 'no-cors',
        data: info
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const previewPortal = (string, info) => {
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${BACKEND_API}/portal/preview`,
        mode: 'no-cors',
        data: info
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const getHotspotUsers = (string, hotSpotUUID) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${ANALYTICS_API}/login/statistic/${hotSpotUUID}`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};

export const exportHotspotUsersCSV = (string, hotSpotUUID) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'text/csv',
            'Accept': 'text/csv',
            'Authorization': `${string}`
        },
        url: `${ANALYTICS_API}/login/statistic/export/${hotSpotUUID}`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => authChecker(err.response));
};
