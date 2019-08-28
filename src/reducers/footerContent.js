
import Palette from '../static/styles/palette';

const INITIAL = {
    text: 'Footer content',
    styles: {
        color: Palette.BLUE,
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
