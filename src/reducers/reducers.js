import { combineReducers } from 'redux';
import Reducer from './reducer';

const allReducer = combineReducers({
  red: Reducer
});

export default allReducer;
