// import sha1 from 'sha1';
import axios from 'axios';

let auth_URL = 'http://a183d5946045f11e9bce002baace7c8b-29493317.eu-west-1.elb.amazonaws.com';
let builder_API = 'http://a8b116236046611e9bce002baace7c8b-245451943.eu-west-1.elb.amazonaws.com';

const Api = {
    userLogin: async function (login, password) {
        let myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        return await axios({
            method: 'post',
            headers: myHeaders,
            url: `${auth_URL}/login`,
            mode: 'no-cors',
            data: {"username": login, "password": password}
        })
            .then(res => res)
            .catch(err => console.warn('In userLogin API method\n', err));

    },
    userRegister: async function (login, password) {
        let myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });

        return await axios({
            method: 'post',
            headers: myHeaders,
            url: `${auth_URL}/user`,
            mode: 'no-cors',
            data: {"username": login, "password": password}
        })
            .then(res => res)
            .catch(err => console.warn('In userRegister API method\n', err));

    }
    // newRelease: async function (slug) {
    //     const API_TOKEN = sha1(`${URL}/public/api/releasesxqg7j47xsiyesgywh7e6lexkld487w6opjcze6k2akbp6v6csy`);
    //     let myHeaders = new Headers({
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'api-token': API_TOKEN
    //     });
    //     return await axios.post(`${URL}/public/api/releases`, {
    //         "title": {"en": "tst", "ru": "", "uk": ""},
    //         "slug": `${slug}`,
    //         "user_id": 1
    //     }, {
    //         mode: 'no-cors',
    //         headers: myHeaders
    //     })
    //         .then(res => res)
    //         .catch(err => console.warn('In uploading API method\n', err));
    // },
    // getReleases: async function () {
    //     const API_TOKEN = sha1(`${URL}/public/api/releasesxqg7j47xsiyesgywh7e6lexkld487w6opjcze6k2akbp6v6csy`);
    //     console.log(API_TOKEN);
    //     let myHeaders = new Headers({
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'api-token': API_TOKEN
    //     });
    //     return await axios.get(`${URL}/public/api/releases`, {
    //         mode: 'no-cors',
    //         headers: myHeaders
    //     })
    //         .then(res => res)
    //         .catch(err => console.warn('In getReleases API method\n', err));
    // },
    // fileUploads: async function (releases, files) {
    //     const API_TOKEN = sha1(`${URL}/public/api/releases/${releases}/videoxqg7j47xsiyesgywh7e6lexkld487w6opjcze6k2akbp6v6csy`);
    //     let myHeaders = new Headers({
    //         'Content-Type': 'multipart/form-data',
    //         'Accept': 'application/json',
    //         'api-token': API_TOKEN
    //     });
    //     let formData = new FormData();
    //     // files.forEach(file => {
    //     // });
    //     console.log('files \n', files);
    //     formData.append('videos[0]', files[0]);
    //     console.log('formData \n', formData);
    //     return await axios.post(`${URL}/public/api/releases/${releases}/videos`, formData,  {
    //         mode: 'no-cors',
    //         headers: myHeaders
    //     })
    //         .then(res => res)
    //         .catch(err => console.warn('In uploading API method\n', err));
    // }
};


module.exports = {
    Api: Api
};
