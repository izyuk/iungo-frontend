export default function (state = {}, action) {
    switch (action.type) {
        case "HEADER_DESCRIPTION_TEXT_COLOR":
            // console.log('UPLOAD_BACKGROUND action', action.payload);
            return Object.assign(state, {
                color: action.payload
            });
        default:
            return state
    }
}
