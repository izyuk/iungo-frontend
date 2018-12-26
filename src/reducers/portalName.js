export default function (state = {}, action) {
    switch (action.type) {
        case "PORTAL_NAME":
            return Object.assign(state, {
                name: action.payload
            });
        default:
            return state
    }
}
