const INITIAL = {
    text: '<Footer content>',
    styles: {
        color: {
            rgba: {
                r: 249,
                g: 249,
                b: 252,
                a: 1,
            },
            hex: '#f9f9fc'
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
