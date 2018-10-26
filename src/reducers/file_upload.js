import axios from "axios";

const UPLOAD_LOGO = "UPLOAD_LOGO";
const UPLOAD_BACKGROUND = "UPLOAD_BACKGROUND";

const fd = new FormData();

export async function upload_file(type, selectedFile, selectedFileName) {
    fd.append(type, selectedFile, selectedFileName);
    let query = axios.create({
        baseURL: 'http://localhost:4000'
    });
    console.log('type', type);
    return {
        type: `UPLOAD_${type.toUpperCase()}`,
        payload:
            await query.post(`/upload/${type}`, fd)
                .then(result => {
                    if (result.error) {
                        throw new Error("Error in uploading object");
                    }
                    console.log(result.data);
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
            console.log(action.type);
            return Object.assign({}, {
                logo: action.payload,
            });
        case UPLOAD_BACKGROUND:
            console.log(action.type);
            return Object.assign({}, {
                background: action.payload,
            });
        default:
            return state
    }
}
