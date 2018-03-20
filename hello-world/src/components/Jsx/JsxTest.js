/**
 * 从本质上讲，JSX 只是为 React.createElement(component, props, ...children) 函数提供的语法糖。JSX代码:
<MyButton color="blue" shadowSize={2}>
 Click Me
</MyButton>

编译为：
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
如果不存在子节点，你可以使用自闭合（self-closing）格式的标签。例如:
<div className="sidebar" />
编译为：
React.createElement(
  'div',
  {className: 'sidebar'},
  null
)
 */

import React, { Component } from 'react';
/*
指定 React 元素类型
一个 JSX 标签的开始部分决定了 React 元素的类型。
首字母大写的标签指示 JSX 标签是一个 React 组件。这些标签会被编译成 命名变量 的直接引用。所以如果你使用 JSX <Foo /> 表达式，那么 Foo 必须在作用域中。
React 必须在作用域中
因为 JSX 被编译为 React.createElement 的调用，所以 React 库必须在你 JSX 代码的作用域中。
例如，所有的 imports 在这段代码中都是必须的，虽然 React 和 CustomButton 并有直接从 JavaScript 中引用：
如果你不使用 JavaScript 打包器，而是通过在 <script> 标签加载 React ，它已经作为一个全局 React 存在。

*/

/**
 * 对 JSX 类型使用点语法
 * 在 JSX 中，你也可以使用点语法引用一个 React 组件。如果你有一个单一模块(module) ，但却 导出(exports) 多个 React 组件时，这将会很方便。
 * 例如，如果 MyComponents.DatePicker 是一个组件，你可以直接在 JSX 中使用它：
 */
const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>MyComponents.DatePicker {props.color} datepicker here.</div>;
  }
};

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}

/**
 * 用户定义组件必须以大写字母开头
 * 当一个元素类型以小写字母开头，它表示引用一个类似于 <div> 或者 <span> 的内置组件，会给 React.createElement 方法传递 'div' 或者 'span' 字符串。
 * 以大写字母开头的类型，类似于 <Foo />，会被编译成 React.createElement(Foo) ，对应于自定义组件 或者在 JavaScript 文件中导入的组件。
 * 我们建议给组件以大写字母开头的方式命名。如果你已经有以小写字母开头的组件，需要在 JSX 中使用前，将其赋值给以大写字母开头的变量。
 */

// 正确！ 这是一个组件，首字母应该大写：
function Hello(props) {
  // 正确！这种使用 <div> 是合法的，因为 div 是一个有效的 HTML 标记：
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // 正确！React 认为 <Hello /> 是一个组件，因为它首字母应是大写的：
  return <Hello toWhat="World" />;
}

/**
 * 在运行时选择类型
 * 不能使用一个普通的表达式作为 React 元素类型。如果你想使用普通表达式来表示元素类型，首先你需要将其赋值给大写的变量。这通常会出现在根据不同的 props 渲染不同的组件时：
 */

function PhotoStory(props) {
  return <div>{props.story}</div>;
}
function VideoStory(props) {
  return <div>{props.story}</div>;
}

const components = {
  photo: PhotoStory,
  video: VideoStory
};

// function Story(props) {
//   // 错误！JSX 类型不能是表达式
//   return <components[props.storyType] story={props.story} />;
// }

function Story(props) {
  // 正确！JSX 类型可以是一个以大写字母开头的变量.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
  //相当于下面的表示，不过是动态组件
  // return <components.photo story={props.story} />;
}

/**
 * JavaScript 表达式作为 props(属性)
 * 你可以传递任何一个用 {} 包裹的 JavaScript 表达式作为 props(属性)。例如，在这个 JSX 中：
 * <MyComponent foo={1 + 2 + 3 + 4} />
 * 对于 MyComponent 来讲，props.foo 的值为 10，因为表达式 1 + 2 + 3 + 4 会被计算估值。
 * 
 * 在 JavaScript 中，if 语句和 for 循环不是表达式，因此不能在 JSX 中直接使用。但你可以将他们放在附近的代码块中，例如
function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>even</strong>;
  } else {
    description = <i>odd</i>;
  }
  return <div>{props.number} is an {description} number</div>;
}
 */
var str = `<MyComponent foo={1 + 2 + 3 + 4} />`;
function MyComponent(porps) {
  return (
    <div>
      {porps.foo} {str}
    </div>
  );
}
function NumberDescriber(props) {
  let description;
  if (props.number % 2 === 0) {
    description = <strong>even</strong>;
  } else {
    description = <i>odd</i>;
  }
  return (
    <div>
      {props.number} is an {description} number
    </div>
  );
}

/**
字符串字面量
你可以传入一个字符串字面量作为一个 props(属性) ，下面两个 JSX 表达式是等价的：
<MyComponent message="hello world" />
<MyComponent message={'hello world'} />

当你传递一个字符串字面量时，其值是未转义的 HTML(HTML-unescaped) 。那么这两个 JSX 表达式是等效的：
<MyComponent message="&lt;3" />
<MyComponent message={'<3'} />
这种行为通常讲并不重要，这里只涉及到了完整性。
 */

/**
 * props(属性) 默认为 “true”
如果你没给 prop(属性) 传值，那么他默认为 true 。下面两个 JSX 表达式是等价的：
<MyTextBox autocomplete />
<MyTextBox autocomplete={true} />

通常情况下，我们不建议使用这种类型，因为这会与ES6中的对象shorthand混淆 。
ES6 shorthand 中 {foo} 指的是 {foo: foo} 的简写，而不是 {foo: true} 。
这种行为只是为了与 HTML 的行为相匹配。
举个例子，在 HTML 中，<input type="radio" value="1" disabled /> 与 <input type="radio" value="1" disabled="true" /> 是等价的。
JSX 中的这种行为就是为了匹配 HTML 的行为。
 */

/**
  * 属性扩展
如果你已经有一个 object 类型的 props，并且希望在 JSX 中传入，你可以使用扩展操作符 ... 传入整个 props 对象。这两个组件是等效的：
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}
function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
当你构建一个一般容器时，属性扩展非常有用。然而，这可能会使得你的代码非常混乱，因为这非常容易使一些不相关的 props(属性) 传递给组件，而组件并不需要这些 props(属性) 。因此我们建议谨慎使用该语法。
  */
function Greeting(props) {
  return (
    <div>
      {props.children}
      {props.firstName + ' ' + props.lastName}
    </div>
  );
}
function App1() {
  return <Greeting firstName="Ben1" lastName="Hector1" />;
}
function App2() {
  const props = { firstName: 'Ben2', lastName: 'Hector2' };
  return (
    <Greeting {...props}>
      <div>
        <div>Hello World</div>

        <div>Hello World</div>

        <div>Hello World</div>

        <div>Hello World</div>
      </div>
    </Greeting>
  );
}

/**
  * SX 中的 Children
在 JSX 表达式中可以包含开放标签和闭合标签，标签中的内容会被传递一个特殊的 props(属性) ： props.children，下面有好几种方式传递 children ：

字符串字面量
您可以在开放标签和闭合标签中放入一个字符串，那么 props.children 就是那个字符串。这对于内置很多 HTML 元素时非常有用，例如:

<MyComponent>Hello world!</MyComponent>
这是有效的 JSX ，MyComponent 组件中的 props.children 值为字符串 "Hello world!" 。HTML是非转义的，因此你可以像写HTML一样来写JSX。

<div>This is valid HTML &amp; JSX at the same time.</div>
JSX会删除每行开头和结尾的空格，并且也会删除空行。邻接标签的空行也会被移除，字符串之间的空格会被压缩成一个空格，因此下面的渲染效果都是相同的：

<div>Hello World</div>

<div>
  Hello World
</div>

<div>
  Hello
  World
</div>

<div>

  Hello World
</div>
  */

/**
   * JSX Children
你可以提供多个 JSX 元素作为 children。这对显示嵌套组件非常有用：

<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>
你可以混合不同类型的 children(子元素) 在一起使用，所以你可以混用字符串字面量和 JSX children。这是 JSX 与 HTML 另一点相似的地方，因此下面是 HTML 和 JSX 均是有效的：

<div>
  Here is a list:
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
React组件不能返回多个React元素，但是单个JSX表达式可以有多个子元素，因此如果你想要渲染多个元素，你可以像上面一样，将其包裹在 div 中。
   */

function MyContainer(props) {
  return <div>{props.children}</div>;
}

function MyFirstComponent() {
  return <div>MyFirstComponent</div>;
}
function MySecondComponent() {
  return <div>MySecondComponent</div>;
}

/*
 JavaScript 表达式作为 Children(子元素)
通过使用 {} 包裹，你可以将任何的 JavaScript 元素而作为 children(子元素) 传递，下面表达式是等价的:

<MyComponent>foo</MyComponent>
<MyComponent>{'foo'}</MyComponent>
这对于渲染长度不定的 JSX 表达式列表非常有用。例如，这渲染了一个 HTML 列表：

function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}
JavaScript 表达式可以和其他类型的子元素混用，这对于字符串模板非常有用：

function Hello(props) {
  return <div>Hello {props.addressee}!</div>;
} 
 */
function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>{todos.map(message => <Item key={message} message={message} />)}</ul>
  );
}

/*
Functions(函数) 作为 Children(子元素)
通常情况下，嵌入到 JSX 中的 JavaScript 表达式会被认为是一个字符串、React元素 或者是这些内容的一个列表。
然而， props.children 类似于其他的 props(属性) ，可以被传入任何数据，而不是仅仅只是 React 可以渲染的数据。
例如，如果有自定义组件，其 props.children 的值可以是回调函数：

// Calls the children callback numTimes to produce a repeated component
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
传递到自定义组件的 children(子元素) 可以是任何内容，只要在渲染之前组件可以将其转化为 React 能够处理的东西即可。这种用法并不常见，但是如果你需要扩展 JSX 的话，则会非常有用。
*/

function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {index => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}

/*
Booleans, Null, 和 Undefined 被忽略
false，null，undefined，和 true 都是有效的的 children(子元素) 。但是并不会被渲染，下面的JSX表达式渲染效果是相同的：
<div />
<div></div>
<div>{false}</div>
<div>{null}</div>
<div>{undefined}</div>
<div>{true}</div>
在有条件性渲染 React 元素时非常有用。如果 showHeader 为 true 时，<Header />会被渲染：
<div>
  {showHeader && <Header />}
  <Content />
</div>
*/
function Header() {
    return 'Header';
}
/*
需要注意的是“falsy”值，例如数值 0 ，仍然会被 React 渲染。例如，这段代码不会按照你预期的发生，因为当 props.messages 是一个空数组时 0 会被打印：

<div>
  {props.messages.length &&
    <MessageList messages={props.messages} />
  }
</div>
要修复这个问题，确保 && 之前的表达式总是布尔值：

<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>
*/

/*
 反过来，如果在输出中想要渲染 false ，true，null 或者 undefined ，你必须先将其转化为字符串:
<div>
  My JavaScript variable is {String(myVariable)}.
</div>
 */
class JsxTest extends Component {
  render() {
      var showHeader = true;
      var messages = [];
    return <div>
        <BlueDatePicker />
        <HelloWorld />
        <Story storyType="photo" story="PhotoStory" />
        <Story storyType="video" story="VideoStory" />
        <MyComponent foo={1 + 2 + 3 + 4} />
        <NumberDescriber number="10" />
        <App1 />
        <App2 />
        <MyContainer>
          <MyFirstComponent />
          <MySecondComponent />
        </MyContainer>
        <TodoList />
        <ListOfTenThings />
        {/* 在有条件性渲染 React 元素时非常有用。如果 showHeader 为 true 时，<Header />会被渲染： */}
        <div>{showHeader && <Header />}</div>
        <div>
          {/* 因为当 messages 是一个空数组时 0 会被打 */}
          {messages.length && <Header />}
          {messages.length > 0 && <Header />}
        </div>
        {/* 反过来，如果在输出中想要渲染 false ，true，null 或者 undefined ，你必须先将其转化为字符串: */}
        <div>
          My JavaScript variable is {String(showHeader)} {(!showHeader).toString()}.
        </div>
      </div>;
  }
}

export default JsxTest;
