const INITIAL = {
    color: {
        rgba: {
            r: 249,
            g: 249,
            b: 252,
            a: 1,
        },
        hex: '#f9f9fc'
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
