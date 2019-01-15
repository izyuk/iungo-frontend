const INITIAL = {
    width: 720,
    padding: '24px 32px 32px 32px'
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "container_size":
            return Object.assign(state,
                action.payload
            );
        default:
            return state
    }
}
