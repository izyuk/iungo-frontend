import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.less';
import all from './reducers/reducers';
import {Provider} from 'react-redux';

import {createStore, applyMiddleware} from 'redux';

import App from './App';


const promiseMiddleware = require('redux-promise').default;

import registerServiceWorker from './registerServiceWorker';

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
registerServiceWorker();
