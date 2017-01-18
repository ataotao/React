const user = {
  name: 'Atao',
  age: 38,
  gender: '男'
}
//React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件。React.createClass 方法就用于生成一个组件类
var HelloMessage = React.createClass({
  render: function () {
    let user = this.props.user;
    return <ul>
      <h1>Hello {user.name} </h1>
      <h2>age {user.age}</h2>
      <h3>gender {user.gender}</h3>
    </ul>;
  }
});
/** 
  *上面代码中，变量 HelloMessage 就是一个组件类。
  *模板插入 <HelloMessage /> 时，会自动生成 HelloMessage 的一个实例（下文的"组件"都指组件类的实例）。
  *所有组件类都必须有自己的 render 方法，用于输出组件。
  *
  *注意，组件类的第一个字母必须大写，否则会报错，比如HelloMessage不能写成helloMessage。另外，组件类只能包含一个顶层标签，否则也会报错。
  *<div></div> <p></p> 正确做法 <ul> <li></li><li></li> </ul>
  *
  */

/**
 * 组件的用法与原生的 HTML 标签完全一致，可以任意加入属性，
 * 比如 <HelloMessage name="John"> ，就是 HelloMessage 组件加入一个 name 属性，值为 John。
 * 组件的属性可以在组件类的 this.props 对象上获取，比如 name 属性就可以通过 this.props.name 读取。
 * 也可以传入一个对象 user, 属性就可以通过 this.props.user.name 读取。
 * 上面代码的运行结果如上。
 */
ReactDOM.render(
  <HelloMessage user = {user} />,
  document.getElementById('example')
);

/**
 * 添加组件属性，有一个地方需要注意，就是 
 * class 属性需要写成 className ，
 * for 属性需要写成 htmlFor ，
 * 这是因为 class 和 for 是 JavaScript 的保留字。
 */


// 演示jsx渲染，只有{}包含的地方才会渲染dom
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}
setInterval(tick, 1000);