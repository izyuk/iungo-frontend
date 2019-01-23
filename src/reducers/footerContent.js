const INITIAL = {
    text: 'Footer content',
    styles: {
        color: {
            rgba: {
                r: 85,
                g: 133,
                b: 237,
                a: 1,
            },
            hex: '#5585ed'
        },
        fontSize: 18,
        textActions: {
            bold: false,
            italic: false,
            underline: false
        },
        alignment: 'center'
    }
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "FOOTER_DESCRIPTION":
            return Object.assign(state, {
                text: action.payload.text,
                styles: action.payload.styles
            });
        default:
            return state
    }
}
