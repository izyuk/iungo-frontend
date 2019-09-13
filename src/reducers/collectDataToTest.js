
import Palette from '~/static/styles/palette';
import { getCaptivePortalDefault } from '~/context/CaptivePortalDefault';

const INITIAL = {
    ...getCaptivePortalDefault(),
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "COLLECT_DATA":
            return Object.assign(state, action.payload);
        default:
            return state
    }
}
