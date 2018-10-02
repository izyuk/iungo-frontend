import axios from "axios";

const UPLOAD_LOGO = "UPLOAD_LOGO";

const fd = new FormData();

export async function upload_file(type, selectedFile, selectedFileName) {
    fd.append(type, selectedFile, selectedFileName);
    let query = axios.create({
        baseURL: 'http://localhost:4000'
    });
    return {
        type: UPLOAD_LOGO,
        payload:
            await query.post(`/upload/${type}`, fd)
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
    switch (action.type) {
        case UPLOAD_LOGO:
            return Object.assign({}, {
                file_upload: action.payload,
            });
        default:
            return state
    }
}
