const user = {
  name: 'Atao',
  age: 38,
  gender: '男'
}

const NotesList = React.createClass({
  render: function () {
    console.log('this', this);
    //this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是 this.props.children 属性。它表示组件的所有子节点
    return (
      <ol>
        <h1>Hello {this.props.user.name} </h1>
        <h2>age {this.props.user.age}</h2>
        <h3>gender {this.props.user.gender}</h3>
        {
          React.Children.map(this.props.children, function (child, index) {
            return <li>{index}，{child}</li>;
          })
          // 在每个直接子元素（children）上调用fn函数。如果 children 是一个内嵌的对象或者数组，它将被遍历（不会传入容器对象到fn中）。如果children 参数是 null 或者 undefined，那么返回 null 或者 undefined 而不是一个空对象。
        }
        <li>
          <span>React.Children.forEach</span>
          {
            React.Children.forEach(this.props.children, function (child) {
              console.log('React.Children.forEach', child);
            })
            // 与React.Children.map方法功能类似，但不返回数组。
          }
        </li>
        <li>
          <span>React.Children.count</span>
          {
            console.log('React.Children.count', React.Children.count(this.props.children))
            // 统计children中的子组件数，和传递给map、forEach回调函数的调用次数一致。
          }
        </li>
        <li>
          <span>React.Children.only</span>
          {
            console.log('React.Children.only', React.Children.only(this.props.children[1]))
            // 返回children中仅有的子级。否则抛出异常。通常只有一个子级的时候才使用 React.Children.only(this.props.children) )
          }
        </li>
        <li>
          <span>React.Children.toArray</span>
          {
            console.log('React.Children.toArray', React.Children.toArray(this.props.children))
            // 将不透明的子组件children转换为一个水平的数组。这在你操作子组件集合使用render方法时非常有用，特别是在你想在传递结果前重新排列或分隔this.props.children时。
          }
        
        </li>

      </ol>
    );
  }
});

ReactDOM.render(
  <NotesList user={user}>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.getElementById('example')
);

/**
 * 上面代码的 NoteList 组件有两个 span 子节点，它们都可以通过 this.props.children 读取，运行结果如下。
 * 
 * 这里需要注意， this.props.children 的值有三种可能：
 * 如果当前组件没有子节点，它就是 undefined ;
 * 如果有一个子节点，数据类型是 object ；
 * 如果有多个子节点，数据类型就是 array 。
 * 所以，处理 this.props.children 的时候要小心。
 * 
 * React 提供一个工具方法 React.Children 来处理 this.props.children 。
 * 我们可以用 React.Children.map 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object。
 * 更多的 React.Children 的方法，请参考官方文档。
 */