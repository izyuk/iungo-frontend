import {combineReducers} from 'redux';

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
    if (action.type === 'RESET_APP') {
        Object.assign(state, action.payload);
        console.clear();
    }
    return allReducers(state, action);
};

export default rootReducer;
