import React, { Component } from 'react';
/**
 * 处理多个输入元素
 * 当您需要处理多个受控的 input 元素时，您可以为每个元素添加一个 name 属性，并且让处理函数根据 event.target.name 的值来选择要做什么。
 */
class ReservationInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked: target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return <form>
        <label>
          Is going: {this.state.isGoing.toString()}
          <input name="isGoing" type="checkbox" checked={this.state.isGoing} onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests: <code>{this.state.numberOfGuests}</code>
          <input name="numberOfGuests" type="number" value={this.state.numberOfGuests} onChange={this.handleInputChange} />
        </label>
      </form>;
  }
}

export default ReservationInput;