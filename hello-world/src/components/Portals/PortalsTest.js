import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
 插槽(Portals)
Portals 提供了一种很好的方法，将子节点渲染到父组件 DOM 层次结构之外的 DOM 节点。

ReactDOM.createPortal(child, container)
第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 片段(fragment)。第二个参数（container）则是一个 DOM 元素。
 */

/**
用法  注意：这里是使用ReactDOM.createPortal的区别
1. this.props.children 会装载一个新的 div，并将 children 渲染到这个 div 中
2. ReactDOM.createPortal不会创建一个新的 div。 它把 children 渲染到 `domNode` 中
通常来说，当你从组件的 render 方法返回一个元素时，它将被作为子元素被装载到最近父节点 DOM 中：

render() {
  // React 装载一个新的 div，并将 children 渲染到这个 div 中
  return (
    <div>
      {this.props.children}
    </div>
  );
}
然而，有时候将子元素插入到 DOM 节点的其他位置会有用的：

render() {
  // React *不* 会创建一个新的 div。 它把 children 渲染到 `domNode` 中。
  // `domNode` 可以是任何有效的 DOM 节点，不管它在 DOM 中的位置。
  return ReactDOM.createPortal(
    this.props.children,
    domNode,
  );
}
对于 portal 的一个典型用例是当父组件有 overflow: hidden 或 z-index 样式，但你需要子组件能够在视觉上 “跳出(break out)” 其容器。例如，对话框、hovercards以及提示框：

注意：

记住这点非常重要，当在使用 portals 时，你需要确保遵循合适的可访问指南。
  */

// These two containers are siblings in the DOM
// const appRoot = document.getElementById('app-root');
// const modalRoot = document.getElementById('modal-root');
var modalRoot = document.createElement('div');
modalRoot.id = 'modal-root';
document.body.appendChild(modalRoot);

// Let's create a Modal component that is an abstraction around
// the portal API.
class Modal extends Component {
  constructor(props) {
    super(props);
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    console.log('加入Modal');
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    console.log('移除Modal');
    modalRoot.removeChild(this.el);
  }

  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      this.props.children,
      // A DOM element
      this.el
    );
    // 下面这样也可以实现
    // return <div>{this.props.children}</div>;
  }
}

// The Modal component is a normal React component, so we can
// render it wherever we like without needing to know that it's
// implemented with portals.
class AppPage extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  handleHide() {
    this.setState({ showModal: false });
  }

  render() {
    // Show a Modal on click.
    // (In a real app, don't forget to use ARIA attributes
    // for accessibility!)
    const modal = this.state.showModal ? (
      <Modal>
        <div className="modal">
          <div>
            With a portal, we can render content into a different part of the
            DOM, as if it were any other React child.
          </div>
          This is being rendered inside the #modal-container div.
          <button onClick={this.handleHide}>Hide modal</button>
        </div>
      </Modal>
    ) : null;

    return (
      <div className="app-page">
        This div has overflow: hidden.
        <button onClick={this.handleShow}>Show modal</button>
        {modal}
      </div>
    );
  }
}

/*
通过 Portals 进行事件冒泡
尽管 portal 可以被放置在 DOM 树的任何地方，但在其他方面其行为和普通的 React 子节点行为一致。如上下文特性依然能够如之前一样正确地工作，无论其子节点是否是 portal，由于 portal 仍存在于 React tree 中，而不用考虑其在 DOM tree 中的位置。

这包含事件冒泡。一个从 portal 内部会触发的事件会一直冒泡至包含 React tree 的祖先。假设如下 HTML 结构：

<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>
在 #app-root 里的 Parent 组件能够捕获到未被捕获的从兄弟节点 #modal-root 冒泡上来的事件。
*/

// These two containers are siblings in the DOM

var modalRootA = document.createElement('div');
modalRootA.id = 'modal-rootA';
document.body.appendChild(modalRootA);

class ModalA extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRootA.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRootA.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

class ParentA extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicks: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This will fire when the button in Child is clicked,
    // updating Parent's state, even though button
    // is not direct descendant in the DOM.
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
    console.log(this.state.clicks);
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools to observe that the button is not a child
          of the div with the onClick handler.
        </p>
        <ModalA>
          <ChildA />
        </ModalA>
      </div>
    );
  }
}

function ChildA() {
  // The click event on this button will bubble up to parent,
  // because there is no 'onClick' attribute defined
  function haneldClick(e) {
    e.stopPropagation();
  }

  return (
    <div className="modal" style={{ display: 'none' }}>
      {/* 移除 style={{ display: 'none' }}显示全部内容 */}
      <div
        style={{ width: '100px', height: '100px', background: 'red' }}
        onClick={haneldClick.bind(this)}
      >
        点这里试下,在点按钮和背景看console
      </div>
      <button>Click</button>
    </div>
  );
}

/**
 在父组件里捕获一个来自 portal 的事件冒泡能够在开发时具有不完全依赖于 portal 的更为灵活的抽象。例如，若你在渲染一个 <Modal /> 组件，父组件能够捕获其事件而无论其是否采用 portal 实现。
 */

class PortalsTest extends Component {
  render() {
    return (
      <div>
        <AppPage />
        <ParentA />
      </div>
    );
  }
}

export default PortalsTest;
