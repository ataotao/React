import React, { Component } from 'react';

/**
 * ref 简介
 * 在react典型的数据流中，props传递是父子组件交互的唯一方式；通过传递一个新的props值来使子组件重新re-render,从而达到父子组件通信。当然，就像react官网所描述的一样，在react典型的数据量之外，某些情况下（例如和第三方的dom库整合，或者某个dom元素focus等）为了修改子组件我们可能需要另一种方式，这就是ref方式。
 *
 * React提供的这个ref属性，表示为对组件真正实例的引用，其实就是ReactDOM.render()返回的组件实例；需要区分一下，ReactDOM.render()渲染组件时返回的是组件实例；而渲染dom元素时，返回是具体的dom节点。
 *
 */
class FileInput extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(`Selected file - ${this.fileInput.files[0].name}`);
    // console.log(`Selected file - ${this.refs.fileInput.files[0].name}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          {/* ref通过回调方式 */}
          <input
            type="file"
            ref={input => {
              this.fileInput = input;
            }}
          />
          {/* ref设置为字符串方式 可以通过this.refs.fileInput访问 */}
          {/* <input type="file" ref="fileInput" /> */}
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default FileInput;
