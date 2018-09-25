// import {createStore, combineReducers, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';

import logo_upload from './logo_upload';

// export default createStore(
//     combineReducers({
//         logo_upload
//     }),
//     {},
//     applyMiddleware(thunk)
// );
const allReducers = combineReducers({
  logo_upload
});

export default allReducers;
