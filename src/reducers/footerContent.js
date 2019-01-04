const INITIAL = {
    text: '<Footer content>',
    styles: {
        color: {
            rgba: {
                r: 0,
                g: 0,
                b: 0,
                a: 1,
            },
            hex: '#000000'
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
