export default function (state = [], action) {
    switch (action.type) {
        case "TAB_SELECTED":
            return Object.assign({}, {
                type: action.payload,
            });
        default:
            return state
    }
}
