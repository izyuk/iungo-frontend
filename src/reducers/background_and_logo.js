
import Palette from '../static/styles/palette';

const INITIAL = {
    logo: {
        url: '',
        position: 'center'
    },
    background: {
        url: '',
        color: Palette.getColor('PALE_GREY_THREE'),
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
