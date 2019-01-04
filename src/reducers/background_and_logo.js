const INITIAL = {
    logo: {
        url: '',
        position: 'center'
    },
    background: {
        url: '',
        color: {
            rgba: {
                r: 249,
                g: 249,
                b: 252,
                a: 1,
            },
            hex: '#f9f9fc'
        }
    }
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "UPLOAD_LOGO":
            return Object.assign(state, {
                logo: {
                    url: action.payload.path.url,
                    position: action.payload.position
                }
            });
        case "UPLOAD_BACKGROUND":
            return Object.assign(state, {
                background: {
                    url: action.payload.path,
                    color: action.payload.color
                }
            });
        default:
            return state
    }
}
