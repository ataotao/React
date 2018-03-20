import React, { Component } from 'react';
function Contacts() {
  return <div className="Contacts" >Contacts</div>;
}

function Chat() {
  return <div className="Chat">Chat</div>;
}

function SplitPane(props) {
  return <div className="SplitPane">
      {/* 这里输出不用 {props.children}，采用自定义的prop属性 */}
      <div className="SplitPane-left">{props.left}</div>
      <div className="SplitPane-right">{props.right}</div>
    </div>;
}
/**
 * 有时候，在一个组件中你可能需要多个 “占位符” 。
 * 在这种情况下，你可以使用自定义的 prop(属性)，而不是使用 children ：
 */
class AppPage extends Component {
    render() {
    return (
      // 这里传入组件作为参数
      <SplitPane left={<Contacts />} right={<Chat />} />
    );
  }
}

export default AppPage;