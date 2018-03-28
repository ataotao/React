import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../stores/actions';

let AddTodo = ({ dispatch }) => {
  // 可以理解成下面的代码, dispatch来自connect()(AddTodo)
  // let AddTodo = props => {
  // let { dispatch } = props;
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          /* 表单字符串验证 */
          if (!input.value.trim()) {
            return;
          }
          /* action添加动作 */
          dispatch(addTodo(input.value));
          input.value = '';
        }}
      >
        <input
          ref={node => {
            /* 赋值input的dom元素 */
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

AddTodo = connect()(AddTodo);

export default AddTodo;
