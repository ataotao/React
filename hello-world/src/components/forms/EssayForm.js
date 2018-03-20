import React, { Component } from 'react';

class EssayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          {/* 在 React 中，<textarea> 的赋值使用 value 属性替代。这样一来，表单中 <textarea> 的书写方式接近于单行文本输入框 ： */}
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>;
  }
}


export default EssayForm;