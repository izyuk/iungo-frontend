export default function (state = {}, action) {
    switch (action.type) {
        case "CONTENT_BACKGROUND":
            return Object.assign(state,
                action.payload
            );
        default:
            return state
    }
}
