
import Palette from '../static/styles/palette';

const INITIAL = {
    color: Palette.getColor('PALE_GREY_THREE'),
    type: 'solid',
    thickness: 1,
    radius: 4
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "container_border":
            return Object.assign(state,
                 action.payload
            );
        default:
            return state
    }
}
