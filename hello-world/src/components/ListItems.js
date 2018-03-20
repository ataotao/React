import React, { Component } from 'react';

// 经验准则是元素中调用 map() 需要 keys 。keys需要设置在list遍历的位置
// function NumberList(props) {
//   const numbers = props.numbers;
//   const listItems = numbers.map(number => (
//     <li key={number.toString()}>{number}</li>
//   ));
//   return <ul>{listItems}</ul>;
// }

// 这样输出也没问题
// 有时这可以产生清晰的代码，但是这个风格也可能被滥用。就像在 JavaScript 中，是否有必要提取一个变量以提高程序的可读性，这取决于你。但是记住，如果 map() 体中有太多嵌套，可能是提取组件的好时机。
function NumberList(props) {
  const numbers = props.numbers;
  return (
    // JSX允许在大括号中嵌入任何表达式，因此可以 内联 map() 结果：
    <ul>
      {numbers.map(number => 
      <li key={number.toString()}>
        {number}
      </li>
      )}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];

class ListItems extends Component {
  // componentDidMount()在将组件输出呈现给DOM后
  componentDidMount() {}

  render() {
    return (
      <div>
        <NumberList numbers={numbers} />
      </div>
    );
  }
}

export default ListItems;
