export default function (state = {}, action) {
    switch (action.type) {
        case "TOKEN":
            return Object.assign(state, {
                token: action.payload
            });
        default:
            return state
    }
}
