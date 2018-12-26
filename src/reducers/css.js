export default function (state = {}, action) {
    switch (action.type) {
        case "SET_CSS":
            return Object.assign(state, {
                path: action.payload
            });
        default:
            return state
    }
}
