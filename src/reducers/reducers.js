// import {createStore, combineReducers, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';

import fileUpload from './file_upload';
import selectTab from './selectTab';

const allReducers = combineReducers({
    file_upload: fileUpload,
    tabName: selectTab
});

export default allReducers;
