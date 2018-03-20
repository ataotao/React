import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Clock from '../Clock';
import Toggle from '../Toggle';
import ConditionalRender from '../ConditionalRender';

/**
为什么不使用上下文(Context)
绝大多数的应用程序不需要使用上下文(context)。
如果你希望使用应用程序更加稳定，就不要使用上下文(context)。这只是一个实验性的 API ，并且可能在未来的 React 版本中移除。
如果你不熟悉 Redux 或者 MobX 这类 state 管理库，就不要使用 context 。在许多实际应用中，这些库以及和React 绑定是一个很好的管理 和许多组件相关的 state 。Redux 相比 context 是更好的解决方案。
如果你不是一个经验丰富的 React 开发者，就不要使用 context 。更好的方式是使用 props 和 state 。
如果你不顾这些警告仍然坚持使用 context ，尝试着将 context 的使用隔离在一个将小的范围内，并且在可能的情况下直接使用 context ，以便在API改变的时候进行升级。
 */

import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    return (
      <div>
        {/* <button style={{ color: 'red', background: this.props.color }}> */}
        {/* context方式传递数据 */}
        <button style={{ color: 'red', background: this.context.color }}>
          {this.props.children}
        </button>
      </div>
    );
  }
}

Button.contextTypes = {
  color: PropTypes.string
};

class Message extends Component {
  render() {
    return (
      <div>
        {this.props.text} <Button color={this.props.color}>Delete</Button>
      </div>
    );
  }
}

/**
 * 通过将 childContextTypes 和 getChildContext 添加到 MessageList ( context 提供者)，React 自动地向下传递信息，并且子树中的任何组件（这个例子中的Button）都可以通过定义 contextTypes 去访问它。

如果 contextTypes 没有定义， context 将是一个空对象。
 */

class MessageList extends Component {
  getChildContext() {
    return { color: 'purple' };
  }
  render() {
    const color = 'purple';
    const children = this.props.messages.map((message, index) => (
      <Message text={message.text} color={color} key={index} />
    ));
    return <div>{children}</div>;
  }
}

MessageList.childContextTypes = {
  color: PropTypes.string
};

const messages = [
  {
    text: 'text1'
  },
  {
    text: 'text2'
  }
];

/**
 * 父子耦合
Context 可以构建 API 使得父组件和子组件进行相互通信。例如， React Router V4 就是使用这种方式的一个库：
 */

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Clock</Link>
        </li>
        <li>
          <Link to="/toggle">Toggle</Link>
        </li>
        <li>
          <Link to="/conditionalRender">ConditionalRender</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Clock} />
      <Route path="/toggle" component={Toggle} />
      <Route path="/conditionalRender" component={ConditionalRender} />
    </div>
  </Router>
);

/**
在生命周期方法中引用 Context
如果 contextTypes 在组件中定义，下列的生命周期方法将接受一个额外的参数， context 对象：
constructor(props, context)
componentWillReceiveProps(nextProps, nextContext)
shouldComponentUpdate(nextProps, nextState, nextContext)
componentWillUpdate(nextProps, nextState, nextContext)
componentDidUpdate(prevProps, prevState, prevContext)
注意：
从 React 16 开始， componentDidUpdate 不再接收 prevContext 。
 */

/*
 在无状态的函数式组件中引用 Context
无状态的函数式组件也可以引用 context , 如果 contextTypes 作为函数的属性被定义。下面代码展示一个无状态的函数式 Button 组件。

const PropTypes = require('prop-types');

const Button = ({children}, context) =>
  <button style={{'{{'}}background: context.color}}>
    {children}
  </button>;

Button.contextTypes = {color: PropTypes.string};
 */

/**
更新 Context
别这么做！

React 有一个 API 更新 context，但是它打破了基本流程，不应该使用。

getChildContext 函数将会在每次state或者props改变时调用。为了更新context中的数据，使用 this.setState触发本地状态的更新。这将触发一个的context并且数据的改变可以被子元素收到。

const PropTypes = require('prop-types');

class MediaQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {type:'desktop'};
  }

  getChildContext() {
    return {type: this.state.type};
  }

  componentDidMount() {
    const checkMediaQuery = () => {
      const type = window.matchMedia("(min-width: 1025px)").matches ? 'desktop' : 'mobile';
      if (type !== this.state.type) {
        this.setState({type});
      }
    };

    window.addEventListener('resize', checkMediaQuery);
    checkMediaQuery();
  }

  render() {
    return this.props.children;
  }
}

MediaQuery.childContextTypes = {
  type: PropTypes.string
};
问题在于，组件提供的context值改变，后代元素如果 shouldComponentUpdate 返回 false 那么context的将不会更新。这使得使用context的组件完全失控，所以基本上没有办法可靠的更新context。这篇博客文章 很好的解释了为什么这是一个问题并如果绕过它。
  */

class ContextTest extends Component {
  render() {
    return (
      <div>
        <MessageList messages={messages} />
        <BasicExample />
      </div>
    );
  }
}

export default ContextTest;
