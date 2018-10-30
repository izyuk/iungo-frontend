import axios from "axios";

const UPLOAD_LOGO = "UPLOAD_LOGO";

const INITIAL_STATE = {
    logo: '',
    logoPosition: 'center'
};

const fd = new FormData();

export async function upload_logo(type, selectedFile, selectedFileName) {
    fd.append(type, selectedFile, selectedFileName);
    let query = axios.create({
        baseURL: 'http://localhost:4000'
    });
    if(type === 'background')
        if(fd.get('logo'))
            fd.delete('logo');
    if(type === 'logo')
        if(fd.get('background'))
            fd.delete('background');
    return {
        type: "UPLOAD_LOGO",
        payload:
            await query.post(`/upload/logo`, fd)
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

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPLOAD_LOGO:
            return Object.assign(state, {
                logo: action.payload
            });
        default:
            return state
    }
}
