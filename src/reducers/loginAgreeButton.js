
import Palette from '../static/styles/palette';

const INITIAL = {
    acceptButtonText: 'Connect',
    acceptButtonColor: Palette.WHITE,
    acceptButtonFont: {
        alignment: 'center',
        color: Palette.BLUE,
        fontSize: 18,
        textActions: {
            bold: false,
            italic: false,
            underline: false
        }
    },
    acceptButtonSize: {
        width: 145,
        padding: 10
    },
    acceptButtonBorder: {
        color: Palette.BLUE,
        radius: 5,
        type: "solid",
        thickness: 1
    }
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "LOGIN_AGREE_BUTTON":
            return Object.assign(state, action.payload);
        default:
            return state
    }
}
