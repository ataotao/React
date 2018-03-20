import React, { Component } from 'react';
/*
何时使用 Refs
下面有一些正好使用 refs 的场景:

处理focus、文本选择或者媒体播放
触发强制动画
集成第三方DOM库
如果可以通过声明式实现，就尽量避免使用 refs 。

例如，相比于在 Dialog 组件中暴露 open() 和 close() 方法，最好传递 isOpen 属性。

不要过度使用 Refs
你可能首先会想到在你的应用程序中使用 refs 来更新组件。如果是这种情况，请花一点时间，更多的关注在组件层中使用 state。在组件层中，通常较高级别的 state 更为清晰。有关示例，请参考状态提升.
*/

/*
在 DOM 元素上添加 Ref
React 支持给任何组件添加特殊属性。ref 属性接受回调函数，并且当组件 装载(mounted) 或者 卸载(unmounted) 之后，回调函数会立即执行。
当给 HTML 元素添加 ref 属性时， ref 回调接受底层的 DOM 元素作为参数。例如，下面的代码使用ref 回调来存储 DOM 节点的引用。

React 组件在加载时将 DOM 元素传入 ref 的回调函数，在卸载时则会传入 null。
在componentDidMount 或 componentDidUpdate 这些生命周期回调之前执行 ref 回调。
使用 ref 回调只是为了在类上设置一个属性，是访问 DOM 元素的常见模式。首选的方法是在 ref 回调中设置属性 就像上面的例子一样。 甚至有一个较短的写法： ref={input => this.textInput = input} 。

*/

class CustomTextInput extends Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    // 通过使用原生API，显式地聚焦text输入框
    this.textInput.focus();
  }

  render() {
    // 在实例中通过使用`ref`回调函数来存储text输入框的DOM元素引用(例如:this.textInput)
    return (
      <div>
        {/* <input type="text" ref={input => {this.textInput = input;}} /> */}
        {/* 简写 */}
        <input type="text" ref={input => (this.textInput = input)} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focus}
        />
      </div>
    );
  }
}

/*
为 类(Class) 组件添加 Ref
当 ref 属性用于类(class)声明的自定义组件时，ref 回调函数收到的参数是装载(mounted)的组件实例。
例如，如果我们想包装 CustomTextInput 组件，实现组件在 装载(mounted) 后立即点击的效果:

class AutoFocusTextInput extends React.Component {
  componentDidMount() {
    this.textInput.focus();
  }

  render() {
    return (
      <CustomTextInput
        ref={(input) => { this.textInput = input; }} />
    );
  }
}
需要注意的是，这种方法仅对以类(class)声明的 CustomTextInput 有效：

class CustomTextInput extends Component {
  // ...
}
*/

class AutoFocusTextInput extends Component {
  componentDidMount() {
    // 默认焦点触发
    this.textInput.focus();
  }

  focusCb(input) {
    this.textInput = input;
  }

  render() {
    return <CustomTextInput ref={this.focusCb.bind(this)} />;
  }
}

/*
Refs 与 函数式组件
你不能在函数式组件上使用 ref 属性，因为它们没有实例:

如果你需要使用 ref ，你需要将组件转化成 类(class)组件，就像需要 生命周期方法 或者 state 一样。
function MyFunctionalComponent() {
  return <input />;
}

class Parent extends Component {
  render() {
    // 这里 *不会* 执行！
    return (
      <MyFunctionalComponent
        ref={(input) => { this.textInput = input; }} />
    );
  }
}

*/

/**
然而你可以 在函数式组件内部使用 ref 来引用一个 DOM 元素或者 类(class)组件：

function CustomTextInput(props) {
  // textInput必须在这里声明，所以 ref 回调可以引用它
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={(input) => { textInput = input; }} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );  
}
 */

function CustomTextInputA(props) {
  // textInput必须在这里声明，所以 ref 回调可以引用它
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={input => {
          textInput = input;
        }}
      />
      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  );
}

/**
 * 对父组件暴露 DOM 节点
在极少数情况下，你可能希望从父组件访问子节点的 DOM 节点。通常不建议这样做，因为它会破坏组件的封装，但偶尔也可用于触发焦点或测量子 DOM 节点的大小或位置。

虽然你可以向子组件添加 ref,但这不是一个理想的解决方案，因为你只能获取组件实例而不是 DOM 节点。并且，它还在函数式组件上无效。

相反，在这种情况下，我们建议在子节点上暴露一个特殊的属性。子节点将会获得一个函数属性，并将其作为 ref 属性附加到 DOM 节点。这允许父代通过中间件将 ref 回调给子代的 DOM 节点。

适用于类组件和函数式组件。

在下面的例子中，Parent 将它的 ref 回调作为一个特殊的 inputRef 传递给 CustomTextInput，然后 CustomTextInput 通过 ref 属性将其传递给 <input>。最终，Parent 中的 this.inputElement 将被设置为与 CustomTextInput 中的 <input> 元素相对应的 DOM 节点。

请注意，上述示例中的 inputRef 属性没有特殊的含义，它只是一般的组件属性。然而，使用 <input> 本身的 ref 属性很重要，因为它告诉 React 将 ref 附加到它的 DOM 节点。

即使 CustomTextInput 是一个函数式组件，它也同样有效。与只能为 DOM 元素和 class 组件指定的 ref 不同，诸如 inputRef 这种自定义的组件属性则没有限制。

 */
function CustomTextInputC(props) {
  return (
    <div>
      {/* ref传入的是父组件的回调函数 */}
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  handleClick() {
    this.inputElement.focus();
  }
  render() {
    return (
      <div>
        <CustomTextInputC inputRef={el => (this.inputElement = el)} />
        <input
          type="button"
          value="对父组件暴露 DOM 节点"
          onClick={this.handleClick.bind(this)}
        />
      </div>
    );
  }
}

/*
这种模式的另一个好处是它能作用很深。假如有个 Parent 组件不需要 DOM 节点 A，但是某个渲染 Parent 的组件（我们称之为 Grandparent）需要通过它访问。这时我们可以让 Grandparent 传递 inputRef 给 Parent 组件，然后让 Parent 组件将其转发给 CustomTextInput:
下面的例子中，Grandparent 首先指定了 ref 回调函数。它通过一个常规的 inputRef 属性被传递到 Parent，Parent 也同样把它传递给了 CustomTextInput。最后 CustomTextInput 读取了 inputRef 属性并将传递的函数作为 ref 属性附加到 <input>。最终，Grandparent 中的 this.inputElement 被设置为 CustomTextInput 的 input 对应的 DOM 节点。

总而言之，我们建议尽可能不暴露 DOM 节点，但这是一个有用的解决方式。请注意，此方法要求您向子组件添加一些代码，如果你无法完全控制子组件，最后的办法是使用 findDOMNode()，但是不推荐这样做。
*/

/**
 * this.refs.textInput 这种方式访问 refs ，我们建议用回调函数的方式代替。
 * 注意
 * 如果 ref 回调以内联函数的方式定义，在更新期间会被调用两次，第一次参数是 null ，之后参数是 DOM 元素。这是因为在每次渲染中都会创建一个新的函数实例。因此，React 需要清理旧的 ref 并且设置新的。
 * 通过将 ref 的回调函数定义成类的绑定函数的方式可以避免上述问题，但是在大多数例子中这都不是很重要。
 */

function CustomTextInputD(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

function ParentD(props) {
  return (
    <div>
      My input: <CustomTextInputD inputRef={props.inputRef} />
    </div>
  );
}

class GrandparentD extends Component {
  handleClick() {
    this.inputElement.focus();
  }
  render() {
    return (
      <div>
        <ParentD inputRef={el => (this.inputElement = el)} />
        <input
          type="button"
          value="对父组件暴露 DOM 节点"
          onClick={this.handleClick.bind(this)}
        />
      </div>
    );
  }
}

class RefsTest extends Component {
  render() {
    return (
      <div>
        <CustomTextInput />
        <AutoFocusTextInput />
        <CustomTextInputA />
        <Parent inputRef={el => (this.inputElement = el)} />
        <GrandparentD />
      </div>
    );
  }
}

export default RefsTest;
