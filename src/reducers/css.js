const INITIAL = {
    path: ''
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "SET_CSS":
            return Object.assign(state, {
                path: action.payload
            });
        default:
            return state
    }
}
