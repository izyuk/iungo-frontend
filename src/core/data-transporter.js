import axios from 'axios';

const bodyFormData = new FormData();

let dataTrasporter = axios.create({
    url: 'http://localhost:4000',
    method: 'post'
    // headers: {'Content-Type': 'multipart/form-data'},
    // data: bodyFormData
});

export default dataTrasporter;
