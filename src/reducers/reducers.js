import {combineReducers} from 'redux';
import collectDataToTest from './collectDataToTest';


const allReducers = combineReducers({
    collectDataToTest: collectDataToTest
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_APP') {
        Object.assign(state, action.payload);
    }
    return allReducers(state, action);
};

export default rootReducer;
