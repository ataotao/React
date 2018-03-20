import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * 在React中使用Web组件
class HelloMessage extends React.Component {
  render() {
    return <div>Hello <x-search>{this.props.name}</x-search>!</div>;
  }
}
注意：

Web组件通常暴露一个必要的API，例如，一个videoWeb组件可能会暴露play()和pause()方法。为访问组件的必要 API，你需要使用一个引用以能够直接和DOM节点交互。若你正在使用第三方Web组件，其最好的解决方案是编写一个 React组件，以包装该 Web组件。

由Web组件触发的事件可能无法通过React渲染树来正确冒泡。 你需要手动捕获事件处理器以处理那些在React组件里的事件。
 */

/**
  * 
  * 一个普遍的困扰是 Web组件 使用 “class” 而非 “className”。

function BrickFlipbox() {
  return (
    <brick-flipbox class="demo">
      <div>front</div>
      <div>back</div>
    </brick-flipbox>
  );
}
  */

class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello <x-search>{this.props.name}</x-search>!
        <brick-flipbox class="demo-text">
          <div>front</div>
          <div>back</div>
        </brick-flipbox>
      </div>
    );
  }
}

/**
 * 在Web组件中使用React
const proto = Object.create(HTMLElement.prototype, {
  attachedCallback: {
    value: function() {
      const mountPoint = document.createElement('span');
      this.createShadowRoot().appendChild(mountPoint);

      const name = this.getAttribute('name');
      const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
      ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
    }
  }
});
document.registerElement('x-search', {prototype: proto});
注意:

如果您使用 Babel 转换类，此代码将不起作用。看 这个问题 的讨论。 在加载 Web 组件之前，请包含custom-elements-es5-adapter ,以解决此问题。
 */

const proto = Object.create(HTMLElement.prototype, {
  attachedCallback: {
    value: function() {
      const mountPoint = document.createElement('span');
      this.createShadowRoot().appendChild(mountPoint);

      const name = this.getAttribute('name');
      const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
      ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
    }
  }
});
document.registerElement('x-search', { prototype: proto });

class WebComponents extends Component {
  render() {
    return (
      <div>
        <HelloMessage name={'tao'} />
      </div>
    );
  }
}

export default WebComponents;
