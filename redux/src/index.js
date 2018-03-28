/**
 *
 * 传入 Store
 * 所有容器组件都可以访问 Redux store，所以可以手动监听它。一种方式是把它以 props 的形式传入到所有容器组件中。
 * 但这太麻烦了，因为必须要用 store 把展示组件包裹一层，仅仅是因为恰好在组件树中渲染了一个容器组件。
 * 建议的方式是使用指定的 React Redux 组件 <Provider> 来 魔法般的 让所有容器组件都可以访问 store，而不必显示地传递它。只需要在渲染根组件时使用即可。
 */
/** AsyncActions */
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { fetchPostsIfNeeded } from './AsyncActions/actions';
import rootReducer from './AsyncActions/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware, // 允许我们 dispatch() 函数
      loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
    )
  )
);

store
  .dispatch(fetchPostsIfNeeded('reactjs'))
  .then(() => console.log(store.getState()));
store
  .dispatch(fetchPostsIfNeeded('reactjs'))
  .then(() => console.log(store.getState()));
  
store
.dispatch(fetchPostsIfNeeded('frontend'))
.then(() => console.log(store.getState()));

// store.dispatch(selectSubreddit('reactjs'));
// store.dispatch(fetchPosts('reactjs')).then(() => {
//   console.log(store.getState())
// });
// store.dispatch(fetchPosts('frontend')).then(() => {
//   console.log(store.getState())
// });

/** AsyncActions */
/**  demo_react_todo_example  ************************************************************************************************************* */

// import React from 'react';
// // 开发工具
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { render } from 'react-dom';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import App from './demo_react_todo_example/components/App';
// import rootReducer from './demo_react_todo_example/reducers';

// let store = createStore(rootReducer, composeWithDevTools());

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );

/**  demo_react_todo  ************************************************************************************************************* */
// import React from 'react';
// // 开发工具
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { render } from 'react-dom';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import App from './demo_react_todo/containers/App';
// import todoStores from './demo_react_todo/stores/reducers';

// // let store = createStore(todoStores);
// let store = createStore(todoStores, composeWithDevTools());

// store.subscribe(() => console.log(store.getState()));
// // console.log(store);
// let rootElement = document.getElementById('root');
// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   rootElement
// );

/*************************************************************************************************************** */

// import React from 'react';
// import { render } from 'react-dom';
// // import { createStore, applyMiddleware } from 'redux';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

// /************************
//  * demo
//  *************************/
// // import A01 from './demo/A01';
// // import A02 from './demo/A02';
// // import './demo/A03_3store';

// /************************
//  * demo
//  *************************/

// let store = createStore(
//   todoApp,
//   // composeWithDevTools(applyMiddleware(...middleware))
//   composeWithDevTools()
// );

// let rootElement = document.getElementById('root');
// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   rootElement
// );
