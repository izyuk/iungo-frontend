export default function (state = {}, action) {
    switch (action.type) {
        case "FOOTER_DESCRIPTION":
            // console.log('UPLOAD_BACKGROUND action', action.payload);
            return Object.assign(state, {
                text: action.payload.text,
                styles: action.payload.styles
            });
        default:
            return state
    }
}
