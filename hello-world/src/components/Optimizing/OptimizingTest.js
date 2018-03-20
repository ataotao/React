import React, { Component } from 'react';
/**
 * 避免更新和重新渲染
 * 在一些情况下，你的组件可以通过重写生命周期函数 shouldComponentUpdate 来优化性能。该函数会在重新渲染流程前触发。该函数的默认实现中返回的是 true，使得 React 执行更新操作：
 * shouldComponentUpdate(nextProps, nextState) {
 *   return true;
 * }
 * 如果你的组件在部分场景下不需要更行，你可以在 shouldComponentUpdate 返回 false 来跳过整个渲染流程，包括调用render() 和之后流程。
 */

/**
 * 例子
 * 如果你想要你的组件仅当 props.color 或 state.count 发生改变时需要更新，你可以通过 shouldComponentUpdate 函数来检查：
 */

class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div>
        <button
          color={this.props.color}
          onClick={() => this.setState(state => ({ count: state.count + 1 }))}
        >
          Count: {this.state.count}
        </button>
        <button
          color={this.props.color}
          onClick={() => this.setState(state => ({ count: state.count }))}
        >
          点击这里不会重复更新,开启React Tools 的Highlight Updates查看 Count:{' '}
          {this.state.count}
        </button>
      </div>
    );
  }
}
/**
 * 在这种情况下，shouldComponentUpdate 函数仅仅检查 props.color 或者 state.count 是否发生改变。
 * 如果这些值没有发生变化，则组件不会进行更新。如果你的组件更复杂，你可以使用类似于对 props 和 state 的所有属性进行”浅比较”这种模式来决定组件是否需要更新。
 * 这种模式非常普遍，因此 React 提供了一个 helper 实现上面的逻辑：继承 React.PureComponent 。因此，下面的代码是一种更简单的方式实现了相同的功能：
 */

//  注意继承 React.PureComponent
class CounterButtonA extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }

  render() {
    return (
      <div>
        <button
          color={this.props.color}
          onClick={() => this.setState(state => ({ count: state.count + 1 }))}
        >
          Count: {this.state.count}
        </button>

        <button
          color={this.props.color}
          onClick={() => this.setState(state => ({ count: state.count }))}
        >
          继承 React.PureComponent方式避免更新 Count: {this.state.count}
        </button>
      </div>
    );
  }
}

/**
 * 大多数情况下，你可以使用 React.PureComponent 而不是自己编写 shouldComponentUpdate 。
 * 但 React.PureComponent 仅会进项浅比较，因此如果 props 或者 state 可能会导致浅比较失败的情况下就不能使用 React.PureComponent 。
 * 如果 props 和 state 属性存在更复杂的数据结构，这可能是一个问题。
 * 例如，我们编写一个 ListOfWords 组件展现一个以逗号分隔的单词列表，在父组件 WordAdder ，当你点击一个按钮时会给列表添加一个单词。下面的代码是不能正确地工作：
 *
 * 问题是 PureComponent 只进行在旧的 this.props.words 与新的 this.props.words 之间进行前比较。因此在 WordAdder 组件中 handleClick 的代码会突变 words 数组。虽然数组中实际的值发生了变化，但旧的 this.props.words 和新的 this.props.words 值是相同的，即使 ListOfWords 需要渲染新的值，但是还是不会进行更新。
 */

class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { words: ['marklar'] };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // 这个部分是不好的风格，造成一个错误
    // const words = this.state.words;
    // 这样可以实现，需要一个原对象的副本
    var words = this.state.words.map(item => item);
    words.push('marklar');
    this.setState({ words: words });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>测试更复杂的数据结构</button>
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}

/**
 * 不可变数据的力量
 * 避免这类问题最简单的方法是不要突变(mutate) props 或 state 的值。例如，上述 handleClick 方法可以通过使用 concat 重写
 * 
handleClick() {
  this.setState(prevState => ({
    words: prevState.words.concat(['marklar'])
  }));
}
ES6 对于数组支持展开语法 ，使得解决上述问题更加简单。如果你使用的是Create React App，默认支持该语法。

handleClick() {
  this.setState(prevState => ({
    words: [...prevState.words, 'marklar'],
  }));
};
你可以以一种简单的方式重写上述代码，使得改变对象的同时不会突变对象，例如，如果有一个 colormap 的对象并且编写一个函数将 colormap.right 的值改为 'blue' ：

function updateColorMap(colormap) {
  colormap.right = 'blue';
}
在不突变原来的对象的条件下实现上面的要求，我们可以使用Object.assign 方法：

function updateColorMap(colormap) {
  return Object.assign({}, colormap, {right: 'blue'});
}
updateColorMap 现在返回一个新的对象，而不是修改原来的对象。Object.assign 属于ES6语法，需要 polyfill。

JavaScript提案添加了对象展开符 ，能够更简单地更新对象而不突变对象。

function updateColorMap(colormap) {
  return {...colormap, right: 'blue'};
}
如果你使用的是 Create React App ，Object.assign 和对象展开符默认都是可用的。
 */

class ListOfWordsA extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdderA extends React.Component {
  constructor(props) {
    super(props);
    this.state = { words: ['marklar'], color: 'blue' };
    this.handleClick = this.handleClick.bind(this);
    this.updateColorMapFn = this.updateColorMapFn.bind(this);
  }

  // handleClick 方法可以通过使用 concat 重写:
  //   handleClick() {
  //     this.setState(prevState => ({
  //       words: prevState.words.concat(['marklar'])
  //     }));
  //   }

  //   ES6 对于数组支持展开语法 ，使得解决上述问题更加简单。如果你使用的是Create React App，默认支持该语法。
  handleClick() {
    this.setState(prevState => ({
      words: [...prevState.words, 'marklar']
    }));
  }

  // 你可以以一种简单的方式重写上述代码，使得改变对象的同时不会突变对象，例如，如果有一个 colormap 的对象并且编写一个函数将 colormap.right 的值改为 'blue' ：

  updateColorMapFn() {
    function updateColorMap(colormap) {
      return { ...colormap, color: 'red' };
    }
    // function updateColorMap(colormap) {
    //   return Object.assign({}, colormap, { right: 'blue' });
    // }
    let newState = updateColorMap(this.state).color;
    if (newState === this.state.color) return;
    this.setState({
      color: updateColorMap(this.state).color
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>测试更复杂的数据结构</button>
        <button onClick={this.updateColorMapFn}>
          测试改变颜色{this.state.color}
        </button>
        <ListOfWordsA words={this.state.words} />
      </div>
    );
  }
}

/**
 * 使用 Immutable 数据结构
 * Immutable.js 是解决上述问题的另外一个方法，其提供了通过结构共享实现(Structural Sharing)地不可变的(Immutable)、持久的(Persistent)集合
 *
 * 不可变(Immutable)  一个集合一旦创建，在其他时间是不可更改的。
 * 持久的(Persistent)  新的集合可以基于之前的结合创建并产生突变，例如：set。原来的集合在新集合创建之后仍然是可用的。
 * 结构共享(Structural Sharing) 新的集合尽可能通过之前集合相同的结构创建，最小程度地减少复制操作来提高性能。
 * 不可变性使得追踪改变非常容易。改变会产生新的对象，因此我们仅需要检查对象的引用是否改变。例如，下面是普通的JavaScript代码：
 * 
 * onst x = { foo: 'bar' };
 * const y = x;
 * y.foo = 'baz';
 * x === y; // true
 * 虽然 y 被编辑了，但是因为引用的是相同的对象 x ,所以比较返回 true 。 你可以用 immutable.js 编写类似的代码：
 * 
 * const SomeRecord = Immutable.Record({ foo: null });
 * const x = new SomeRecord({ foo: 'bar' });
 * const y = x.set('foo', 'baz');
 * const z = x.set('foo', 'bar');
 * x === y; // false
 * x === z; // true
 * 
在这种情况下，因为当改变 x 时返回新的引用，我们可以使用一个相等检查(x===y)来验证存储在y中的新值是否与存储在x中的原始值不同。

其他两个可以帮助我们使用不可变数据的库分别是:seamless-immutable 和 immutability-helper。

不可变数据提供了一种更简单的方式来追踪对象的改变，这正是我们实现 shouldComponentUpdate 所需要的。这将会提供可观的性能提升。
 */

class OptimizingTest extends Component {
  render() {
    return (
      <div>
        <div>使用生产版本</div>
        <div>避免重新渲染</div>

        <div>shouldComponentUpdate 应用例子</div>
        <CounterButton />
        <CounterButtonA />
        <WordAdder />
        <WordAdderA />
      </div>
    );
  }
}

export default OptimizingTest;
