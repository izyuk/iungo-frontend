const INITIAL = {
    methods: {
        google: false,
        facebook: false,
        twitter: false,
        button: false
    }
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "LOGIN_METHODS":
            return Object.assign(state, {
                methods: action.payload
            });
        default:
            return state
    }
}
