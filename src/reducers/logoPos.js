const INITIAL = {
    position: 'center'
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "LOGO_POSITION":
            return Object.assign(state, {
                position: action.payload
            });
        default:
            return state
    }
}
