// import sha1 from 'sha1';
import axios from 'axios';

let auth_URL = 'http://a183d5946045f11e9bce002baace7c8b-29493317.eu-west-1.elb.amazonaws.com';
let builder_API = 'http://a8b116236046611e9bce002baace7c8b-245451943.eu-west-1.elb.amazonaws.com';

// const Api = {
export const userLogin = (login, password) => {
    let myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    });
    return axios({
        method: 'post',
        headers: myHeaders,
        url: `${auth_URL}/login`,
        mode: 'no-cors',
        data: {"username": login, "password": password}
    })
        .then(res => res)
        .catch(err => console.warn('In userLogin API method\n', err));

};
export const userRegister = (login, password) => {
    let myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });

    return axios({
        method: 'post',
        headers: myHeaders,
        url: `${auth_URL}/user`,
        mode: 'no-cors',
        data: {"username": login, "password": password}
    })
        .then(res => res)
        .catch(err => console.warn('In userRegister API method\n', err));

};
export const getAllPortals = (string) => {
    return axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${builder_API}/portal`,
    })
        .then(res => res)
        .catch(err => console.warn('In getAllPortals API method\n', err));
};
export const getPortal = (string, id) => {
    return axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${builder_API}/portal/${id}`,
    })
        .then(res => res)
        .catch(err => console.warn('In getPortal API method\n', err));
};

export const uploadImage = (string, name, base64) => {
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${builder_API}/image`,
        mode: 'no-cors',
        data: {"name": name, "base64Content": base64}
    })
        .then(res => res)
        .catch(err => console.warn('In uploadImage API method\n', err));

};

export const getHotspots = (string) => {
    return axios({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${builder_API}/hotspot`,
        mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => console.warn('In getHotspots API method\n', err));
};
export const createHotspot = (string, name, address, description, id) => {
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${builder_API}/hotspot`,
        mode: 'no-cors',
        data: {
            "name": name,
            "address": address,
            "description": description,
            "portalId": id
        }
    })
        .then(res => res)
        .catch(err => console.warn('In createHotspot API method\n', err));
};
export const updateHotspotById = (string, name, address, description, id) => {
    return axios({
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${builder_API}/hotspot/${id}`,
        mode: 'no-cors',
        data: {
            "name": name,
            "address": address,
            "description": description,
            "portalId": null
        }
    })
        .then(res => res)
        .catch(err => console.warn('In updateHotspotById API method\n', err));
};
export const createPortal = (string, info) => {
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${builder_API}/portal`,
        mode: 'no-cors',
        data: info
    })
        .then(res => res)
        .catch(err => console.warn('In createPortal API method\n', err));
};

export const publishPortal = (string, info, id) => {
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${builder_API}/portal/publish/${id}`,
        mode: 'no-cors',
        data: info
    })
        .then(res => res)
        .catch(err => console.warn('In publishPortal API method\n', err));
};

export const updatePortal = (string, info, id) => {
    return axios({
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${builder_API}/portal/${id}`,
        mode: 'no-cors',
        data: info
    })
        .then(res => res)
        .catch(err => console.warn('In publishPortal API method\n', err));
};

export const previewPortal = (string, info) => {
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${builder_API}/portal/preview`,
        mode: 'no-cors',
        data: info
    })
        .then(res => res)
        .catch(err => console.warn('In previewPortal API method\n', err));
};
