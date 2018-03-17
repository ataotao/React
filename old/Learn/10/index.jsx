/**
 * 组件的生命周期分成三个状态：
 * https://facebook.github.io/react/docs/refs-and-the-dom.html
 * 
 * Mounting：已插入真实 DOM      componentWillMount()  componentDidMount()
 * Updating：正在被重新渲染       componentWillUpdate(object nextProps, object nextState)   componentDidUpdate(object prevProps, object prevState)
 * Unmounting：已移出真实 DOM    componentWillUnmount()
 * 
 * React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。
 * componentWillMount()
 * componentDidMount()
 * componentWillUpdate(object nextProps, object nextState)
 * componentDidUpdate(object prevProps, object prevState)
 * componentWillUnmount()
 * 
 * 此外，React 还提供两种特殊状态的处理函数。
 * componentWillReceiveProps(object nextProps)：                 已加载组件收到新的参数时调用
 * shouldComponentUpdate(object nextProps, object nextState)：   组件判断是否重新渲染时调用
 * 
 * 这些方法的详细说明，可以参考[官方文档](https://facebook.github.io/react/docs/react-component.html)。
 * 下面是一个例子
 */

var Hello = React.createClass({

  //状态初始化
  getInitialState: function () {
    return {
      opacity: 1.0
    };
  },

  //组件已插入真实 DOM 前
  componentDidMount: function () {
    this.timer = setInterval(function () {
      //透明度设置为1
      var opacity = this.state.opacity;
      //每次执行 -0.05
      opacity -= .05;
      //透明度如果< 0.1,恢复到1
      if (opacity < 0.1) {
        opacity = 1.0;
        clearInterval(this.timer);
      }
      //设置组件显示的透明状态
      this.setState({
        opacity: opacity
      });
    }.bind(this), 100); //绑定真实的this
  },
  //渲染
  render: function () {
    return (
      // {{ opacity: this.state.opacity }} 第一重大括号表示这是 JavaScript 语法，第二重大括号表示样式对象。
      <div style={{ opacity: this.state.opacity }}>
        Hello {this.props.name}
      </div>
    );
  }

});

ReactDOM.render(
  <Hello name="world" />,
  document.getElementById('example')
);

/**
 * 
 * 上面代码在hello组件加载以后，通过 componentDidMount 方法设置一个定时器，每隔100毫秒，就重新设置组件的透明度，从而引发重新渲染。
 * 
 * 另外，组件的style属性的设置方式也值得注意，
 * 
 * 不能写成style="opacity:{this.state.opacity};"
 * 而要写成style={{opacity: this.state.opacity}}
 * 
 * 这是因为 React 组件样式是一个对象，所以第一重大括号表示这是 JavaScript 语法，第二重大括号表示样式对象。
 * [React 组件样式](https://facebook.github.io/react/docs/dom-elements.html)
 * 
 */

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 111
    }
  }

  handleChange(event) {
    this.setState({ value: 'aaa' });
  }

  handleFocus(event) {
    // 触发input焦点
    this.textInput.focus();
    this.handleChange();
    console.log(this.textInput);
  }

  componentWillUpdate() {
    console.log(arguments);
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in this.textInput.
    // 使用ref回调函数来存储对input DOM 的引用
    // this.textInput就是input的真实dom元素
    var value = this.state.value;
    return (
      <div>
        <input
          type="text" value={value} onChange={this.handleChange}
          ref={(input) => { this.textInput = input; } } />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.handleFocus}
          />
      </div>
    );
  }

}

ReactDOM.render(
  <CustomTextInput name="world" />,
  document.getElementById('root')
);