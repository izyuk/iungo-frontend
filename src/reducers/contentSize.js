const INITIAL = {
    width: 720,
    padding: 10
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
