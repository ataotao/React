import React, { Component } from 'react';
/*
错误边界(Error Boundaries)
过去，组件内的 JavaScript 错误常常会破坏 React 内部状态,并导致它在下一次渲染时产生 神秘的 错误。这些错误总会在应用代码中较早的错误引发的，但 React 并没有提供一种方式能够在组件内部优雅地来处理，也不能从错误中恢复。

错误边界介绍
部分 UI 中的 JavaScript 错误不应该破坏整个应用程序。 为了解决 React 用户的这个问题，React 16引入了一个 “错误边界(Error Boundaries)” 的新概念。

错误边界是 React 组件，它可以在子组件树的任何位置捕获 JavaScript 错误，记录这些错误，并显示一个备用 UI ** ，而不是使整个组件树崩溃。 错误边界(Error Boundaries) 在渲染，生命周期方法以及整个组件树下的构造函数中捕获错误。

注意

错误边界 无法 捕获如下错误:

事件处理 （了解更多）
异步代码 （例如 setTimeout 或 requestAnimationFrame 回调函数）
服务端渲染
错误边界自身抛出来的错误 （而不是其子组件）
如果一个类组件定义了一个名为 componentDidCatch(error, info): 的新生命周期方法，它将成为一个错误边界：
*/

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   componentDidCatch(error, info) {
//     // Display fallback UI
//     this.setState({ hasError: true });
//     // You can also log the error to an error reporting service
//     logErrorToMyService(error, info);
//   }

//   render() {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return <h1>Something went wrong.</h1>;
//     }
//     return this.props.children;
//   }
// }
// 而后你可以像一个普通的组件一样使用：
/*
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>;
*/

/**
 * componentDidCatch() 方法机制类似于 JavaScript catch {}，但是针对组件。仅有类组件可以成为错误边界。实际上，大多数时间你仅想要定义一个错误边界组件并在你的整个应用中使用。

注意错误边界(Error Boundaries) 仅可以捕获其子组件的错误。错误边界无法捕获其自身的错误。如果一个错误边界无法渲染错误信息，则错误会向上冒泡至最接近的错误边界。这也类似于 JavaScript 中 catch {} 的工作机制。

componentDidCatch 参数
error 是被抛出的错误。

info 是一个含有 componentStack 属性的对象。这一属性包含了错误期间关于组件的堆栈信息。

componentDidCatch(error, info) {
  
  Example stack information:
     in ComponentThatThrows (created by App)
     in ErrorBoundary (created by App)
     in div (created by App)
     in App

// }
*/

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1
    }));
  }

  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

function App() {
  return (
    <div>
      <p>
        <b>
          这是React 16中的错误边界示例。
          <br />
          <br />
          点击数字来增加计数器。
          <br />
          当计数器达到5时，该计数器被编程为抛出。这模拟组件中的JavaScript错误。
        </b>
      </p>
      <hr />
      <ErrorBoundary>
        <p>
          这两个计数器位于相同的错误边界内。
          如果一个崩溃，错误边界将取代它们两个。
        </p>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
      <hr />
      <p>
        这两个计数器位于相同的错误边界内。
        如果一个崩溃，错误边界将取代它们两个。
      </p>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
    </div>
  );
}

/**
 * 如何放置错误边界
错误边界的粒度完全取决于你的应用。你可以将其包装在最顶层的路由组件并为用户展示一个 “发生异常（Something went wrong）“的错误信息，就像服务端框架通常处理崩溃一样。你也可以将单独的插件包装在错误边界内部以保护应用不受该组件崩溃的影响。
 */

/**
  * 
  * 未捕获错误（Uncaught Errors）的新行为
这一改变有非常重要的意义。自 React 16 开始，任何未被错误边界捕获的错误将会卸载整个 React 组件树。

我们对这一决定饱含争论，但在我们的经验中放置下一个错误的UI比完全移除它要更糟糕。例如，在类似 Messenger 的产品中留下一个异常的可见 UI 可能会导致用户将信息发错给别人。类似的，对于支付类的应用来说，什么都不展示也比显示一堆错误更好。

这一改变意味着随着你迁入到 React 16，你将可能会发现一些已存在你应用中但未曾注意到的崩溃。增加错误边界能够让你在发生异常时提供更好的用户体验。

例如，Facebook Messenger 将侧边栏、信息面板，对话框以及信息输入框包装在单独的错误边界中。如果其中的某些 UI 组件崩溃，其余部分仍然能够交互。

我们也鼓励使用 JS 错误报告服务（或自行构建）这样你能够掌握在生产环境中发生的未捕获的异常，并将其修复。
  */
/**
为何不使用 try/catch?
try / catch 非常棒，但其仅能在命令式代码（imperative code）下可用：

try {
  showButton();
} catch (error) {
  // ...
}
然而，React 组件是声明式的并且具体指出 声明 什么需要被渲染：

<Button />
错误边界保留了 React 原生的声明性质，且其行为符合你的预期。例如，即使错误发生 componentDidUpdate 时期由某一个深层组件树中的 setState 调用引起，其仍然能够冒泡到最近的错误边界。
 */

/**
事件处理器如何处理？
错误边界无法捕获事件处理器内部的错误。

React 不需要错误边界在事件处理器内将其从错误中恢复。不像渲染方法或生命周期钩子，事件处理器不会再渲染周期内触发。因此若他们抛出异常，React 仍然能够知道需要在屏幕上显示什么。

如果你需要在事件处理器内部捕获错误，使用普通的 JavaScript try / catch 语句：

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  
  handleClick = () => {
    try {
      // Do something that could throw
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Caught an error.</h1>
    }
    return <div onClick={this.handleClick}>Click Me</div>
  }
}
注意上述例子仅是说明普通的 JavaScript 行为而并未使用错误边界。
  */

class ErrorBoundaries extends Component {
  render() {
    return (
      <div>
        <App />
      </div>
    );
  }
}

export default ErrorBoundaries;
