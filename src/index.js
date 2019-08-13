import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.less';
import all from './reducers/reducers';
import {Provider} from 'react-redux';

import {applyMiddleware, createStore} from 'redux';

import App from './App';

import TagManager from 'react-gtm-module'
import registerServiceWorker from './registerServiceWorker';

const tagManagerArgs = {
    gtmId: 'GTM-PP297WL'
};

TagManager.initialize(tagManagerArgs);


const promiseMiddleware = require('redux-promise').default;

const store = createStore(
  all,
  applyMiddleware(promiseMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

if (window.Cypress) {
    window.__store__ = store.getState();
}


registerServiceWorker();
