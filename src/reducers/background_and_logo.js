const INITIAL = {
    logo: {
        url: '',
        position: 'center'
    },
    background: {
        url: '',
        color: {
            rgba: {
                r: 229,
                g: 233,
                b: 242,
                a: 1,
            },
            hex: '#e5e9f2'
        },
        type: ''
    }
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "UPLOAD_LOGO":
            return Object.assign(state, {
                logo: {
                    url: action.payload.path,
                    position: action.payload.position
                }
            });
        case "UPLOAD_BACKGROUND":
            return Object.assign(state, {
                background: {
                    url: action.payload.path,
                    color: action.payload.color,
                    type: action.payload.type
                }
            });
        default:
            return state
    }
}
