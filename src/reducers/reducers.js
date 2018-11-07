// import {createStore, combineReducers, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';

import fileUpload from './file_upload';
import logoPos from './logoPos';
import backgroundColor from './backgroundColor';
import selectTab from './selectTab';

const allReducers = combineReducers({
    file_upload: fileUpload,
    color: backgroundColor,
    position: logoPos,
    tabName: selectTab
});

export default allReducers;
