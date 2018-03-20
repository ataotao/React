import React, { Component } from 'react';

/**
 * props.children 有点类似VUE作用域插槽的使用方式
 * 一些组件在设计前无法获知自己要使用什么子组件，尤其在 Sidebar 和 Dialog 等通用 “容器” 中比较常见。
 * 我们建议这种组件使用特别的 children prop 来直接传递 子元素到他们的输出中：
 */

function FancyBorder(props) {
  return <div className={'FancyBorder FancyBorder-' + props.color}>
      <p>{props.title}</p>
      {/* 
        props.children这里输出的实际上是夫组件内部写入的内容
        <h1 className="Dialog-title">Welcome</h1>
        <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
       */}
      {props.children}
    </div>;
}

class WelcomeDialog extends Component {
  render() {
    return (
      <FancyBorder color="blue" title="测试标题">
        <h1 className="Dialog-title">Welcome</h1>
        <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
      </FancyBorder>
    );
  }
}

export default WelcomeDialog;
