const INITIAL = {
    colorHEX: '#ffffff',
    color: {
        r: '255',
        g: '255',
        b: '255',
        a: '1',
    },
    type: 'none',
    thickness: '1',
    radius: '0'
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "CONTENT_BORDER":
            return Object.assign(state, {
                color: action.payload
            });
        default:
            return state
    }
}
