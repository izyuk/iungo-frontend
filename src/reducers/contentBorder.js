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
    type: 'none',
    thickness: 1,
    radius: 0
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "container_border":
            return Object.assign(state,
                 action.payload
            );
        default:
            return state
    }
}
