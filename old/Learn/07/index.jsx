/**
 * 组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。
 * 根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，
 * 这种算法叫做 DOM diff ，它可以极大提高网页的性能表现。
 * 
 * 但是，有时需要从组件获取真实 DOM 的节点，这时就要用到 ref 属性。
 */

const MyComponent = React.createClass({

  handleClick() {
    console.log(this.refs);
    console.log(this);
    this.refs.myTextInput.focus();
    this.refs.myTextInput.value = this.refs.myTextInput.name + '焦点获取到了';
  },

  handleSelect(proxy, e){
    // console.log(proxy);
    console.log(e);
  },

  render() {
    return (
      <div>
        <input type="text" name="myTextInput" ref="myTextInput" onSelect = {this.handleSelect}/>
        <input type="button" value="Focus the text input" onClick = {this.handleClick} />
      </div>
    );
  }

})

ReactDOM.render(
  <MyComponent />,
  document.getElementById("example")
)

/**
 * 
 * 上面代码中，组件 MyComponent 的子节点有一个文本输入框，用于获取用户的输入。这时就必须获取真实的 DOM 节点，虚拟 DOM 是拿不到用户输入的。
 * 为了做到这一点，文本输入框必须有一个 ref 属性，然后 this.refs.[refName] 就会返回这个真实的 DOM 节点。
 * 
 * 需要注意的是，由于 this.refs.[refName] 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。
 * 上面代码中，通过为组件指定 Click 事件的回调函数，确保了只有等到真实 DOM 发生 Click 事件之后，才会读取 this.refs.[refName] 属性。
 * 
 * React 组件支持很多事件，除了 Click 事件以外，还有 KeyDown 、Copy、Scroll 等，完整的事件清单请查看[官方文档]
 * (https://facebook.github.io/react/docs/events.html#supported-events)。
 * 
 */