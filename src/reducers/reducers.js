// import {createStore, combineReducers, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';

import logoUpload from './logo_upload';

const allReducers = combineReducers({
  logo_upload: logoUpload
});

export default allReducers;
