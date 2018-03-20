import React, { Component } from 'react';

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

// 元素变量 （这里将不同方法传入）
function LoginButton(props) {
  return <button onClick={props.onClick}>Login</button>;
}

function LogoutButton(props) {
  return <button onClick={props.onClick}>Logout</button>;
}

// jsx通过&&内联断点判断方法
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {/* 大于0才会显示 */}
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}

// 防止组件渲染
function WarningBanner(props) {
  // 在极少数情况下，您可能希望组件隐藏自身，即使它是由另一个组件渲染的。为此，返回 null 而不是其渲染输出。
  // 在下面的例子中，根据名为warn的 prop 值，呈现 <WarningBanner /> 。如果 prop 值为 false ，则该组件不渲染：
  if (!props.warn) {
    return null;
    // return false;
    // 没看明白false和null的区别
    // null从组件的render方法返回不会影响组件的生命周期方法的触发。例如，componentWillUpdate并且componentDidUpdate仍然会被调用。
  }

  return <div className="warning">Warning!</div>;
}

class ConditionalRender extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.state = { isLoggedIn: false, showWarning: true };
  }
  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }
  componentWillUpdate() {
    console.log('componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }
  componentDidMount() {}
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const messages = ['React', 'Re: React', 'Re:Re: React'];

    // 条件渲染判断
    const button = isLoggedIn ? (
      <LogoutButton onClick={this.handleLogoutClick} />
    ) : (
      <LoginButton onClick={this.handleLoginClick} />
    );

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
        {/* 内联 && 判断条件渲染 */}
        <div>
          <Mailbox unreadMessages={messages} />
        </div>
        {/* 三元表达式判断条件渲染 */}
        <div>
          三元表达式判断条件渲染 <b>{isLoggedIn ? '登录了' : '没有登录'}</b> .
        </div>
        <div>
          <p>如果这样判断条件太复杂，考虑分拆组件的方式处理</p>
          {isLoggedIn ? (
            <LogoutButton onClick={this.handleLogoutClick} />
          ) : (
            <LoginButton onClick={this.handleLoginClick} />
          )}
        </div>
        <p>防止组件渲染</p>
        <div>
          <WarningBanner warn={this.state.showWarning} />
          <button onClick={this.handleToggleClick}>
            {this.state.showWarning ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
    );
  }
}

export default ConditionalRender;
