const INITIAL = {
    width: '720',
    padding: '10'
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "CONTENT_SIZE":
            return Object.assign(state, {
                color: action.payload
            });
        default:
            return state
    }
}
