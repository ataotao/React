import React, { Component } from 'react';

function FormattedDate(props) {
  return (
    <h2>
      <code>各组件隔离并有自己的作用域{props.name}</code>It is{' '}
      {props.date.toLocaleTimeString()}.
    </h2>
  );
}

class Clock extends Component {
  constructor(props) {
    // 类组件总是需要调用调用基础构造函数props。
    super(props);
    this.state = { date: new Date(), comment: '', pageState: '' };
  }
  // componentDidMount()在将组件输出呈现给DOM后，该钩子运行。这是设置计时器的好地方：
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    /*
    * 状态修改注意点
    */

    // Wrong 这样是不正确的使用方式
    // this.state.comment = 'Hello';
    // Correct 正确设置方式
    this.setState({
      comment: 'Hello'
    });

    // 因为this.props和this.state可异步更新，你不应该依赖于它们的值来计算下一个状态。
    this.setState({
      counter: this.state.counter + this.props.increment
    });
    // Correct 正确使用方式
    this.setState((prevState, props) => ({
      counter: prevState.counter + props.increment
    }));
    // 或者
    this.setState(function(prevState, props) {
      return { counter: prevState.counter + props.increment };
    });

    setTimeout(() => {
      // 异步单独更新state值
      fetch('http://localhost:3000/').then(response => {
        this.setState(function(prevState, props) {
          return {
            pageState: '异步更新数据:' + response.type + '-' + response.url
          };
        });
      });
    }, 1000);
  }

  // 移除定时器
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // 执行定时器
  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <h3>{this.state.comment}</h3>
        <h3>{this.state.pageState}</h3>
        <h2>组件通过state传递值</h2>
        <FormattedDate date={this.state.date} name="FormattedDateA" />
        <FormattedDate date={this.state.date} name="FormattedDateB" />
      </div>
    );
  }
}

export default Clock;
