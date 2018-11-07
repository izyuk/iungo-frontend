export default function (state = {}, action) {
    switch (action.type) {
        case "BACKGROUND_COLOR":
            // console.log('UPLOAD_BACKGROUND action', action.payload);
            return Object.assign(state, {
                color: action.payload
            });
        default:
            return state
    }
}
