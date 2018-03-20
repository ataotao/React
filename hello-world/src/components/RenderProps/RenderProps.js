import React, { Component } from 'react';
import logo from '../../logo.svg';

class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        <h1>移动鼠标！</h1>
        <p>
          The current mouse position is ({this.state.x}, {this.state.y})
        </p>
      </div>
    );
  }
}

/**
当光标在屏幕上移动时，组件在a中显示其（x，y）坐标<p>。

现在的问题是：我们如何在另一个组件中重用这种行为？换句话说，如果另一个组件需要知道光标位置，我们是否可以封装该行为，以便我们可以轻松地与该组件共享它？

由于组件是React中代码重用的基本单元，因此让我们尝试重构一下代码，以便使用一个<Mouse>封装了我们需要在其他地方重用的行为的组件。
 */

// The <Mouse> component encapsulates the behavior we need...
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {/* ...但是我们如何呈现除<p>之外的其他内容？ */}
        <p>
          The current mouse position is ({this.state.x}, {this.state.y})
        </p>
      </div>
    );
  }
}

class MouseTrackerA extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse />
      </div>
    );
  }
}

/**
现在，<Mouse>组件封装了与侦听mousemove事件和存储游标的（x，y）位置相关的所有行为，但它尚未真正可重用。

例如，假设我们有一个<Cat>组件可以呈现猫在屏幕上追逐鼠标的图像。我们可以使用一个<Cat mouse={{ x, y }}>道具来告诉组件鼠标的坐标，以便知道将图像放置在屏幕上的位置。

作为第一遍，您可以尝试渲染<Cat> 内部<Mouse>的render方法，如下所示：
 */

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img
        src={logo}
        className="App-logo"
        alt="logo"
        style={{ position: 'fixed', left: mouse.x, top: mouse.y }}
      />
    );
  }
}

class MouseWithCat extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({ x: event.clientX, y: event.clientY });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {/*
          我们可以在这里添加一个<Cat>的<p>然后我们需要创建一个单独的<MouseWithSomethingElse>组件，
        每次我们需要使用它，所以<MouseWithCat> 并不是真的可重用.
        */}
        <Cat mouse={this.state} />
      </div>
    );
  }
}

class MouseTrackerB extends Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <MouseWithCat />
      </div>
    );
  }
}

/*
这种方法适用于我们的具体用例，但我们还没有实现以可重用的方式真正封装行为的目标。现在，每当我们想要为不同的用例使用鼠标位置时，我们都必须创建一个新的组件（即本质上是另一个组件<MouseWithCat>），它专门为该用例呈现一些东西。

这里是渲染道具的用途：不是对组件<Cat>内部进行硬编码，而是<Mouse>有效地改变其渲染输出，我们可以提供<Mouse>一个函数道具来动态确定渲染道具。
*/

class CatC extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img
        src={logo}
        className="App-logo"
        alt="logo"
        style={{ position: 'fixed', right: mouse.x, top: mouse.y }}
      />
    );
  }
}

class MouseC extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    console.log('MouseCInit');
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    console.log('MouseC');
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {/*
          不是提供<Mouse>呈现的静态表示，  使用`render` prop来动态确定要呈现的内容。
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTrackerC extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        {/* <Mouse render={mouse => <Cat mouse={mouse} />} /> */}
        {/* 这里的mouse值是通过 this.props.render(this.state) 传递而来 */}
        <MouseC
          render={mouse => {
            console.log('MouseTrackerC');
            return <CatC mouse={mouse} />;
          }}
        />
      </div>
    );
  }
}

/**
现在，我们不是有效地克隆<Mouse>组件并在其render方法中硬编码其他方法来解决特定用例，而是提供一个可用于动态确定其呈现内容的render道具<Mouse>。
更具体地说，渲染道具是组件用来知道渲染内容的函数。
这种技术使我们需要共享的行为非常便携。为了获得该行为，<Mouse>使用renderprop来渲染一个道具，该道具告诉它用光标的当前（x，y）来呈现什么。
有关渲染道具的一件有趣事情是，您可以使用具有渲染道具的常规组件来实现大多数高阶组件（HOC）。例如，如果您希望使用withMouseHOC而不是<Mouse>组件，则可以使用<Mouse>带有渲染支柱的常规方法轻松创建一个：

动态组件

 // If you really want a HOC for some reason, you can easily
// create one using a regular component with a render prop!
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse render={mouse => (
          <Component {...this.props} mouse={mouse} />
        )}/>
      );
    }
  }
}
所以使用渲染道具可以使用任何一种模式。
 */

// OutA和OutB负责不同的渲染顺序
class OutA extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <div>
        {data.name} {data.age}
      </div>
    );
  }
}

class OutB extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <div>
        {data.age} {data.name}
      </div>
    );
  }
}

// PageRender 提供数据
class PageRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'Tao', age: '30' };
  }

  render() {
    return <div>{this.props.render(this.state)}</div>;
  }
}

// 负责动态获取组件
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <PageRender
          render={data => {
            return <Component data={data} />;
          }}
        />
      );
    }
  };
}

// 传入两个不同组件
var TestA = withMouse(OutA);
var TestB = withMouse(OutB);

class MyPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <TestA />
        <TestB />
      </div>
    );
  }
}

/**
使用其他的道具 render
重要的是要记住，只是因为该模式被称为“渲染道具”，您不必使用命名的道具render来使用此模式。实际上，组件用来知道渲染的功能的任何道具在技术上都是“渲染道具”。

虽然上面的例子使用render，我们可以轻松地使用children道具！

<Mouse children={mouse => (
  <p>The mouse position is {mouse.x}, {mouse.y}</p>
)}/>
请记住，childrenprop实际上并不需要在JSX元素的“属性”列表中进行命名。相反，你可以把它直接放在元素中！

<Mouse>
  {mouse => (
    <p>The mouse position is {mouse.x}, {mouse.y}</p>
  )}
</Mouse>
您会在反应动作 API中看到这种技术。

由于这种技术有点不同寻常，所以在设计这样的API时，您可能需要明确声明这children应该是您的功能propTypes。

Mouse.propTypes = {
  children: PropTypes.func.isRequired
};
 */

/*
注意事项
使用Render Props和React.PureComponent时要小心
React.PureComponent如果您在render方法中创建函数，则使用渲染道具可以否定使用该渲染道具所带来的优势。这是因为浅色道具比较总是会false为新道具返回，并且render在这种情况下每个道具都会为渲染道具生成一个新值。

例如，<Mouse>从上面继续我们的组件，如果Mouse扩展React.PureComponent而不是React.Component，我们的例子看起来像这样：

class Mouse extends React.PureComponent {
  // Same implementation as above...
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>       
          This is bad! The value of the `render` prop will
          be different on each render.
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}

在这个例子中，每次<MouseTracker>渲染时，它会生成一个新的函数作为<Mouse render>道具的值，从而抵消了<Mouse>扩展的效果React.PureComponent！

为了解决这个问题，有时候可以将prop定义为一个实例方法，如下所示：

class MouseTracker extends React.Component {
  constructor(props) {
    super(props);

    // This binding ensures that `this.renderTheCat` always refers
    // to the *same* function when we use it in render.
    this.renderTheCat = this.renderTheCat.bind(this);
  }

  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}
如果您无法提前在构造函数中绑定实例方法（例如因为您需要关闭组件的道具和/或状态）<Mouse>应该扩展React.Component。
 */

class RenderProps extends Component {
  render() {
    return (
      <div>
        <MouseTracker />
        <MouseTrackerA />
        <MouseTrackerB />
        <MouseTrackerC />
        <MyPage />
      </div>
    );
  }
}

export default RenderProps;
