// const fd = new FormData();

// export async function upload_file(type, selectedFile) {
//     fd.append(type, selectedFile);
//     let query = axios.create({
//         baseURL: 'http://localhost:4000'
//     });
//     if(type === 'background')
//         if(fd.get('logo'))
//             fd.delete('logo');
//     if(type === 'logo')
//         if(fd.get('background'))
//             fd.delete('background');
//     return {
//         type: `UPLOAD_${type.toUpperCase()}`,
//         payload:
//             await query.post(`/upload/${type}`, fd)
//                 .then(result => {
//                     if (result.error) {
//                         throw new Error("Error in uploading object");
//                     }
//                     console.log('reducer', result.data);
//                     return result.data;
//                 })
//                 .catch(error => {
//                     console.log(error);
//                 })
//     };
// }

export default function (state = {}, action) {
    console.log(action.payload);
    switch (action.type) {
        case "UPLOAD_LOGO":
            // console.log('UPLOAD_LOGO action', action.payload);
            return Object.assign(state, {
                logo: {
                    url: action.payload.path.url,
                    position: action.payload.position
                }
            });
        case "UPLOAD_BACKGROUND":
            // console.log('UPLOAD_BACKGROUND action', action.payload);
            return Object.assign(state, {
                background: {
                    url: action.payload.path,
                    color: action.payload.color
                }
            });
        default:
            return state
    }
}
