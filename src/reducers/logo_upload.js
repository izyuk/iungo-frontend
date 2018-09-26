import axios from "axios";
import {dataTrasporter} from '../core/data-transporter';

const UPLOAD_LOGO = "UPLOAD_LOGO";

const fd = new FormData();

export async function upload_logo(type, selectedFile, selectedFileName) {
    fd.append(type, selectedFile, selectedFileName);
    let query = axios.create({
        baseURL: 'http://localhost:4000'
    });
    return {
        type: UPLOAD_LOGO,
        payload:
            await query.post('/upload/logo', fd)
                .then(result => {
                    if (result.error) {
                        throw new Error("Error in uploading object");
                    }
                    return result.data;
                })
                .catch(error => {
                    console.log(error);
                })
    };
}

export default function (state = [], action) {
    // debugger;
    switch (action.type) {
        case UPLOAD_LOGO:
            return Object.assign({}, {
                logo_upload: action.payload,
                logo_file_path: '../static/uploads/logo/' + action.payload
            });
        default:
            return state
    }
}