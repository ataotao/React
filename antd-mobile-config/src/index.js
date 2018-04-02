import './assets/css/index.css';

import './assets/css/animate.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import App from './App';
import ENV from './assets/js/env';


// redux 注入操作
const middleware = [thunk];
if (ENV.debug) {
    middleware.push(createLogger());
}
const store = createStore(reducer, 
    composeWithDevTools(applyMiddleware(...middleware))
);

const render = Component => { 
    ReactDOM.render(
        <Provider store={store}>
            <Component />
        </Provider>,
        document.getElementById('root')
    );
};

render(App);