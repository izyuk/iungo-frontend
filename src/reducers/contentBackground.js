
import Palette from '../static/styles/palette';

const INITIAL = {
    color: Palette.getColor('WHITE'),
    opacity: 100
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "container_background":
            return Object.assign(state,
                action.payload
            );
        default:
            return state
    }
}
