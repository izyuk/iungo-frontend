const INITIAL = {
    top: {
        text: '<Company name>',
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
    },
    description: {
        text: '<Venue description>',
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
    }
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "HEADER_TOP":
            return Object.assign(state, {
                top: {
                    text: action.payload.text,
                    styles: action.payload.styles
                }
            });
        case "HEADER_DESCRIPTION":
            return Object.assign(state, {
                description: {
                    text: action.payload.text,
                    styles: action.payload.styles
                }
            });
        default:
            return state
    }
}
