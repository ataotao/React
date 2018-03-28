// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import './index.css';
import './style/lib/animate.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

import Routes from './routes/index';

const loggerMiddleware = createLogger();

// redux 注入操作
const middleware = [reduxThunk, loggerMiddleware];
const store = createStore(reducer, 
    composeWithDevTools(applyMiddleware(...middleware))
);

const render = Component => { 
    ReactDOM.render(
        <Provider store={store}>
            <Component store={store} />
        </Provider>
        ,
        document.getElementById('root')
    );
};

render(Routes);