export default function (state = {}, action) {
    switch (action.type) {
        case "CONTENT_BORDER":
            return Object.assign(state,
                 action.payload
            );
        default:
            return state
    }
}
