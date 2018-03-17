/**
 * 用户在表单填入的内容，属于用户跟组件的互动，所以不能用 this.props 读取
 */

var Input = React.createClass({

  getInitialState() {
    return { value: 'Hello!' };
  },

  handleChange(event) {
    this.setState({ value: event.target.value.toUpperCase() });
  },

  render() {
    var value = this.state.value;
    return (
      <div>
        <input type="text" value={value.toUpperCase()} onChange={this.handleChange} />
        <p>{value.toUpperCase()}</p>
      </div>
    );
  }

});

ReactDOM.render(
  <Input />,
  document.getElementById('root')
);

/**
 * 上面代码中，文本输入框的值，不能用 this.props.value 读取，而要定义一个 onChange 事件的回调函数，通过 event.target.value 读取用户输入的值。
 * textarea 元素、select元素、radio元素都属于这种情况，更多介绍请参考[官方文档](https://facebook.github.io/react/docs/forms.html)。 
 */

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'coconut' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>{this.state.value}</p>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <FlavorForm />,
  document.getElementById('example')
);