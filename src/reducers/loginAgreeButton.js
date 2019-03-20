const INITIAL = {
    acceptButtonText: 'Default name',
    acceptButtonColor: {
        hex: "#ffffff",
        rgba: {r: 255, g: 255, b: 255, a: 1}
    },
    acceptButtonFont: {
        alignment: 'center',
        color: {
            hex: '#5585ed',
            rgba: {r: 85, g: 133, b: 237, a: 1}
        },
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
        color: {
            hex: '#5585ed',
            rgba: {r: 85, g: 133, b: 237, a: 1}
        },
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
