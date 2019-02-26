const INITIAL = {
    url: ''
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "REDIRECT_URL":
            return Object.assign(state, {
                url: action.payload
            });
        default:
            return state
    }
}
