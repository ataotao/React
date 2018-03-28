import { combineReducers, createStore } from 'redux';
/**
 * 三大原则
 * 单一数据源
 * State 是只读的 唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
 * 使用纯函数来执行修改 它们不应该产生任何副作用
 */
function visibilityFilter(state = 'SHOW_ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter;
  } else {
    return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          });
        }
        return todo;
      });
    default:
      return state;
  }
}

// function todos(state = [], action) {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return state.concat([{ text: action.text, completed: false }]);
//     case 'TOGGLE_TODO':
//       return state.map(
//         (todo, index) =>
//           action.index === index
//             ? { text: todo.text, completed: !todo.completed }
//             : todo
//       );
//     default:
//       return state;
//   }
// }

// 利用combineReducers组合多个reducer，帮实现了todoApp
let reducer = combineReducers({ visibilityFilter, todos });

let store = createStore(reducer);

// 简单方式

// function todoApp(state = {}, action) {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   };
// }

// let store = createStore(todoApp);
// store.subscribe(() => console.log(store.getState()));

store.dispatch({
  type: 'ADD_TODO',
  text: 'Go to swimming pool'
});
store.dispatch({
  type: 'ADD_TODO',
  text: 'Go to swimming pool1'
});
store.dispatch({
  type: 'ADD_TODO',
  text: 'Go to swimming pool12'
});
store.dispatch({
  type: 'TOGGLE_TODO',
  index: 1
});
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_ALL'
});
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_ACTIVE'
});

console.log(store.getState());

// 伪代码
// var data = {
//   todos: [
//     {
//       text: 'Eat food',
//       completed: true
//     },
//     {
//       text: 'Exercise',
//       completed: false
//     }
//   ],
//   visibilityFilter: 'SHOW_COMPLETED'
// };

// { type: 'ADD_TODO', text: 'Go to swimming pool' }
// { type: 'TOGGLE_TODO', index: 1 }
// { type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }

// console.log(todoApp(data, { type: 'ADD_TODO', text: 'Go to swimming pool' }));

export default store;
