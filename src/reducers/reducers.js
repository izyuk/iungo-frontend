// import {createStore, combineReducers, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';

import fileUpload from './background_and_logo';
import selectTab from './selectTab';
import contentBorder from './contentBorder';
import contentBackground from './contentBackground';
import contentSize from './contentSize';
import headerContent from './headerContent';
import loginMethods from './loginMethods';
import footerContent from './footerContent';
import auth from './auth';
import portalName from './portalName';
import css from './css';
import imagesIDs from './imagesIDs';


const allReducers = combineReducers({
    background_and_logo: fileUpload,
    tabName: selectTab,
    container_border: contentBorder,
    container_background: contentBackground,
    container_size: contentSize,
    header: headerContent,
    login_methods: loginMethods,
    footer: footerContent,
    token: auth,
    name: portalName,
    css: css,
    imagesIDs: imagesIDs
});

const rootReducer = (state, action) => {
    console.log('here');
    if (action.type === 'RESET_APP') {
        console.log('reset');
        state = undefined;
        return allReducers(undefined, action);
    }

    return allReducers(state, action);
};

export default rootReducer;
