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
    return axios(/*`${builder_API}/portal`, */{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${string}`
        },
        url: `${builder_API}/portal`,
        // mode: 'no-cors'
    })
        .then(res => res)
        .catch(err => console.warn('In getAllPortals API method\n', err));
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
