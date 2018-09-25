import axios from "axios";
import { dataTrasporter } from '../core/data-transporter';

const UPLOAD_LOGO = "UPLOAD_LOGO";

const fd = new FormData();
// bodyFormData.set('api_token','wTCDQleCEWCYrrVu');

// export function download_filters(){
// 	return {
// 		type: DOWLOAD_FILTERS
// 	}
// }

export async function upload_logo(type, selectedFile, selectedFileName) {
    fd.append(type, selectedFile, selectedFileName);
    return {
        type: UPLOAD_LOGO,
        payload: await axios.post('http://localhost:4000/upload/logo', fd)
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
    // debugger;
    switch (action.type) {
        case UPLOAD_LOGO:
            return Object.assign({}, {logo_upload: action.payload});
        default:
            return state
    }
}
