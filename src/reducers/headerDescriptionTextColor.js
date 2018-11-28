// const INITIAL = {
//     data: {
//         colorHEX: '#000000',
//         color:{
//             r: '0',
//             g: '0',
//             b: '0',
//             a: '1',
//         },
//         fontSize: '18',
//         textActions: {
//             bold: false,
//             italic: false,
//             underline: false,
//         },
//         text: 'Change this description',
//         alignment: 'center'
//     }
// };

export default function (state = {}, action) {
    switch (action.type) {
        case "HEADER_DESCRIPTION":
            // console.log('UPLOAD_BACKGROUND action', action.payload);
            return Object.assign(state, {
                data: action.payload
            });
        default:
            return state
    }
}
