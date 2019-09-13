
import Palette from '~/static/styles/palette';
import CaptivePortalDefault from '~/context/CaptivePortalDefault';

const INITIAL = {
    ...CaptivePortalDefault,
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "COLLECT_DATA":
            return Object.assign(state, action.payload);
        default:
            return state
    }
}
