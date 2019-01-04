const INITIAL = {
    logoID: '',
    backgroundID: ''
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "SET_backgroundID":
            return Object.assign(state, {
                    backgroundID: action.payload
                }
            );
        case "SET_logoID":
            return Object.assign(state, {
                    logoID: action.payload
                }
            );
        default:
            return state
    }
}
