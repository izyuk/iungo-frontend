// import {createStore, combineReducers, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';

import fileUpload from './background_and_logo';
// import logoPos from './logoPos';
import backgroundColor from './backgroundColor';
import contentBorder from './contentBorder';
import contentBackground from './contentBackground';
import contentSize from './contentSize';
import headerContent from './headerContent';
import headerDescriptionTextData from './headerDescriptionTextColor';
import loginMethods from './loginMethods';
import footerContent from './footerContent';
import selectTab from './selectTab';

const allReducers = combineReducers({
    background_and_logo: fileUpload,
    // color: backgroundColor,
    content_border: contentBorder,
    content_background: contentBackground,
    content_size: contentSize,
    header: headerContent,
    login_methods: loginMethods,
    footer: footerContent,
    tabName: selectTab
});

export default allReducers;
