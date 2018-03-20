import React, { Component } from 'react';

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    // 回调函数中需要bing(this), 箭头函数不需要
    // this.handleClick = this.handleClick.bind(this);
    // 或者在执行的地方调用箭头函数
  }

  //   handleClick() {
  //     this.setState(prevState => ({
  //       isToggleOn: !prevState.isToggleOn
  //     }));
  //   }

  handleClick = (param, e) => {
    console.log(e.target);
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  };

  deleteRow(id, e) {
    /* 
    *  参数传递 
    *  在这两种情况下，e表示React事件的参数都将作为ID之后的第二个参数传递。
    *  使用箭头函数，我们必须明确地传递它，但是bind方式，e会默认带有。
    */
    console.log(e.target);
    console.log(id);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this, 'param')}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
        <button onClick={e => this.handleClick('param', e)}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
        <LoggingButton />
        {/* 参数传递 
        *在这两种情况下，e表示React事件的参数都将作为ID之后的第二个参数传递。
        *使用箭头函数，我们必须明确地传递它，但是bind方式，e会默认带有。
        */}
        <button onClick={e => this.deleteRow('参数传递 箭头函数方式', e)}>
          参数传递 箭头函数方式
        </button>
        <button onClick={this.deleteRow.bind(this, '参数传递 bind函数方式')}>
          参数传递 bind函数方式
        </button>
      </div>
    );
  }
}

export default Toggle;

// 或者在执行的地方调用箭头函数
class LoggingButton extends React.Component {
  handleClickLogin() {
    console.log('this is LoggingButton:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return <button onClick={e => this.handleClickLogin(e)}>Click me</button>;
  }
}
