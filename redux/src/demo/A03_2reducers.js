import { combineReducers } from 'redux';

import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './A03_1actions';

// const initialState = {
//   visibilityFilter: VisibilityFilters.SHOW_ALL,
//   todos: []
// };

// 拆分 Reducer,简化逻辑
// 注意 todos 依旧接收 state，但它变成了一个数组！现在 todoApp 只把需要更新的一部分 state 传给 todos 函数，todos 函数自己确定如何更新这部分数据。
// 这就是所谓的 reducer 合成，它是开发 Redux 应用最基础的模式。

// 注意每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据
const { SHOW_ALL } = VisibilityFilters;

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          });
        }
        return todo;
      });
    default:
      return state;
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

// function todoApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action)
//   };
// }

// 最后，Redux 提供了 combineReducers() 工具类来做上面 todoApp 做的事情，这样就能消灭一些样板代码了。有了它，可以这样重构 todoApp：

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;

// 注意上面的写法和下面完全等价：

// export default function todoApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action)
//   }
// }

// 你也可以给它们设置不同的 key，或者调用不同的函数。下面两种合成 reducer 方法完全等价：

// const reducer = combineReducers({
//   a: doSomethingWithA,
//   b: processB,
//   c: c
// })
// function reducer(state = {}, action) {
//   return {
//     a: doSomethingWithA(state.a, action),
//     b: processB(state.b, action),
//     c: c(state.c, action)
//   }
// }
// combineReducers() 所做的只是生成一个函数，这个函数来调用你的一系列 reducer，每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理，然后这个生成的函数再将所有 reducer 的结果合并成一个大的对象。没有任何魔法。正如其他 reducers，如果 combineReducers() 中包含的所有 reducers 都没有更改 state，那么也就不会创建一个新的对象。

// ES6 用户使用注意
// combineReducers 接收一个对象，可以把所有顶级的 reducer 放到一个独立的文件中，通过 export 暴露出每个 reducer 函数，然后使用 import * as reducers 得到一个以它们名字作为 key 的 object：

// import { combineReducers } from 'redux'
// import * as reducers from './reducers'

// const todoApp = combineReducers(reducers)
// 由于 import * 还是比较新的语法，为了避免困惑，我们不会在本文档中使用它。但在一些社区示例中你可能会遇到它们

/*------------------------------------------------------------------------*/
/*
// function todoApp(state, action) {
//   if (typeof state === 'undefined') {
//     return initialState;
//   }

//   // 这里暂不处理任何 action，
//   // 仅返回传入的 state。
//   return state;
// }
*/

// 这里一个技巧是使用 ES6 参数默认值语法 来精简代码。
// 现在可以处理 SET_VISIBILITY_FILTER。需要做的只是改变 state 中的 visibilityFilter。

/*

function todoApp(state = initialState, action) {
  
//    注意:
//    不要修改 state。 使用 Object.assign() 新建了一个副本。
//    不能这样使用 Object.assign(state, { visibilityFilter: action.filter })，因为它会改变第一个参数的值。
//    你必须把第一个参数设置为空对象。你也可以开启对ES7提案对象展开运算符的支持, 从而使用 { ...state, ...newState } 达到相同的目的。
//    在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。
   
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      //   return Object.assign({}, state, {
      //     visibilityFilter: action.filter
      //   });
      return { ...state, ...{ visibilityFilter: action.filter } };
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      });
    
    //  我们需要修改数组中指定的数据项而又不希望导致突变, 因此我们的做法是在创建一个新的数组后, 将那些无需修改的项原封不动移入, 接着对需修改的项用新生成的对象替换。
    //  (译者注：Javascript中的对象存储时均是由值和指向值的引用两个部分构成。此处突变指直接修改引用所指向的值, 而引用本身保持不变。)
    //  如果经常需要这类的操作，可以选择使用帮助类 React-addons-update，updeep，或者使用原生支持深度更新的库 Immutable。最后，时刻谨记永远不要在克隆 state 前修改它。
     
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            });
          }
          return todo;
        })
      });
    default:
      return state;
  }
}
*/
