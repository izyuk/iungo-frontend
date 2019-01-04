const INITIAL = {
    color: {
        rgba: {
            r: 255,
            g: 255,
            b: 255,
            a: 1,
        },
        hex: '#ffffff'
    },
    opacity: 100
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "container_background":
            return Object.assign(state,
                action.payload
            );
        default:
            return state
    }
}
