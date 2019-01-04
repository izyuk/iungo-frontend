export default function (state = {}, action) {
    switch (action.type) {
        case "BACKGROUND_COLOR":
            return Object.assign(state, {
                color: action.payload
            });
        default:
            return state
    }
}
