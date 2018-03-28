/**
 * Store 就是把它们联系到一起的对象。Store 有以下职责：
 * 维持应用的 state；
 * 提供 getState() 方法获取 state；
 * 提供 dispatch(action) 方法更新 state；
 * 通过 subscribe(listener) 注册监听器;
 * 通过 subscribe(listener) 返回的函数注销监听器。
 * 再次强调一下 Redux 应用只有一个单一的 store。当需要拆分数据处理逻辑时，你应该使用 reducer 组合 而不是创建多个 store。
 *
 * 根据已有的 reducer 来创建 store 是非常容易的。在前一个章节中，我们使用 combineReducers() 将多个 reducer 合并成为一个。现在我们将其导入，并传递 createStore()。
 * import { createStore } from 'redux'
 * import todoApp from './reducers'
 * let store = createStore(todoApp)
 *
 * createStore() 的第二个参数是可选的, 用于设置 state 初始状态。这对开发同构应用时非常有用，服务器端 redux 应用的 state 结构可以与客户端保持一致, 那么客户端可以将从网络接收到的服务端 state 直接用于本地数据初始化。
 * let store = createStore(todoApp, window.STATE_FROM_SERVER)
 */

import { createStore } from 'redux';
import todoApp from './A03_2reducers';
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './A03_1actions';

let store = createStore(todoApp);

// 发起 Actions
// 现在我们已经创建好了 store ，让我们来验证一下！虽然还没有界面，我们已经可以测试数据处理逻辑了。

// 打印初始状态
console.log(store.getState());

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// 发起一系列 action
store.dispatch(addTodo('Learn about actions'));
store.dispatch(addTodo('Learn about reducers'));
store.dispatch(addTodo('Learn about store'));
store.dispatch(toggleTodo(0));
store.dispatch(toggleTodo(1));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

// 停止监听 state 更新
unsubscribe();

export default store;
