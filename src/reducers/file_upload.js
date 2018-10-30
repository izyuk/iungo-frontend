import axios from "axios";

const UPLOAD_LOGO = "UPLOAD_LOGO";
const UPLOAD_BACKGROUND = "UPLOAD_BACKGROUND";

const INITIAL_STATE = {
    background: 'rgba(255,255,255,1)',
    backgroundType: 'color',
    logo: '',
    logoPosition: 'center'
};

const fd = new FormData();

export async function upload_file(type, selectedFile, selectedFileName) {
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

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPLOAD_LOGO:
            return Object.assign(state, {
                logo: action.payload
            });
        case UPLOAD_BACKGROUND:
            return Object.assign(state, {
                background: action.payload
            });
        default:
            return state
    }
}
