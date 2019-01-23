const INITIAL = {
    color: {
        rgba: {
            r: 229,
            g: 233,
            b: 242,
            a: 1,
        },
        hex: '#e5e9f2'
    },
    type: 'solid',
    thickness: 1,
    radius: 4
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
