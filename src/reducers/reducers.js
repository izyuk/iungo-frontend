// import {createStore, combineReducers, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';

import fileUpload from './file_upload';
import logoPos from './logoPos';
import backgroundColor from './backgroundColor';
import contentBorder from './contentBorder';
import contentBackground from './contentBackground';
import contentSize from './contentSize';
import selectTab from './selectTab';

const allReducers = combineReducers({
    file_upload: fileUpload,
    color: backgroundColor,
    position: logoPos,
    content_border: contentBorder,
    content_background: contentBackground,
    content_size: contentSize,
    tabName: selectTab
});

export default allReducers;
