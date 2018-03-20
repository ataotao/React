import React, { Component } from 'react';
// 注： https://reactjs.org/docs/higher-order-components.html
/**
 高阶组件(Higher-Order Components)
在React中，高阶组件是重用组件逻辑的一项高级技术。高阶组件并不是React API的一部分。高阶组件源自于React生态。

具体来说，高阶组件是一个函数，能够接受一个组件并返回一个新的组件。

const EnhancedComponent = higherOrderComponent(WrappedComponent);
组件是将props转化成UI，然而高阶组件将一个组价转化成另外一个组件。

React在第三方组件库中非常常见，例如Redux的connect 和 Relay’s createContainer。

在这篇文档中，我们将讨论高阶组件为什么非常有用，并且如何构建。
 */

/**
在横切关注点中使用高阶组件
注意

我们之前介绍的mixins也是处理横切关注点的一种方法。我们已经意识到的mixin的使用时弊大于利。阅读这篇文章了解我们抛弃mixin和如果转换现有的组件。

组件是React中代码重用的最小单元。然而你会发现某些模式并不能直接适应传统组件。

//   例如，假设你有一个接受外部数据源渲染评论列表的 CommentList 组件：
class CommentList extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" 就是全局的数据源
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // 添加事件处理函数订阅数据
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // 清除事件处理函数
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // 任何时候数据发生改变就更新组件
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map(comment => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}

// 随后，你编写一个订阅单个博文的组件，其遵循类似的模式:

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}

CommentList和BlogPost是等价的，除了它们调用DataSource的不同方法，有不同的输出。但它们大部分的实现是类似的:

组件 mount(装载) 结束后，都添加 DataSource 的 change 监听
除了监听函数，无论什么时候 datasource 改变之后，都会调用 setState
组件 unmount(卸载) 之后，都会移除监听。
你可以想象在一个大型项目中，订阅 DataSource 并调用 setState的函数将会一次次出现。我们需要将其抽象出来，使得我们能够在一个地方定义逻辑并且在我们的组件中共享。这就是高阶组件的优点。

我们可以写一个函数，能够创建类似于CommentList和BlogPost这类订阅DataSource的新的组件。这个函数接受一个子组件作为参数，这个子组件接受订阅数据源作为props，调用withSubscription如下：

const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);

第一个参数是被包含的组件，第二个参数根据给定的DataSource和当前的props取回我们需要的数据。
当CommentListWithSubscription和CommentListWithSubscription被渲染时，CommentList和BlogPost将会被传递data属性，其中包含从DataSource取回的最新数据。


// 函数接受一个组件参数……
function withSubscription(WrappedComponent, selectData) {
  // ……返回另一个新组件……
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ……注意订阅数据……
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ……使用最新的数据渲染组件
      // 注意此处将已有的props属性传递给原组件
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

高阶组件既不会修改输入组件，也不会通过继承来复制行为。相反，通过包裹的形式，高阶组件将原先的组件组合在container组件中。高阶组件是纯函数，没有副作用。

就是这样。被包裹的元素接受container的所有props和新的props，并使用其渲染输出。高阶组件并不关心数据将会如何或者为什么使用，并且被包裹的元素并不关心数据的源头。

因为withSubscription只是一个普通函数，你可以按照你的意愿添加很多或者很少的参数。例如，你可能希望data的名字是可以配置的，为了进一步隔离高阶组件和被包裹组件。或者你可以接受一个参数，它可以配置shouldComponentUpdate,或者是可以配置数据的来源。这都是可行的，因为高阶组件可以完全自己控制组件该如何定义。

和组件相类似，withSubscription和被包裹组件的联系是基于props的。只要为被包裹元素提供相同的属性，那么很容易将一个高阶组件组件转化成不同的高阶组件。例如，如果你想要改变数据获取的库，这将非常有用。
  */

/**不要改变原始组件，而是使用组合
要忍住在高阶组件修改组件原型(或者修改其他)的冲动。

function logProps(InputComponent) {
  InputComponent.prototype.componentWillReceiveProps = function(nextProps) {
    console.log('Current props: ', this.props);
    console.log('Next props: ', nextProps);
  };
  // 我们返回的原始组件实际上已经
  // 被修改了。
  return InputComponent;
}

// EnhancedComponent会记录下所有的props属性
const EnhancedComponent = logProps(InputComponent);
这里存在一些问题，一个是输入组件(InputComponent)不能脱离增强组件分别重用。更重要的是，如果将另一个也修改componentWillReceiveProps的高阶组件应用于EnhancedComponent组件，第一个高阶组件的功能将会别覆盖。这个高阶组件对函数组件不会起作用，因为函数组件没有生命周期函数。

具有修改功能的高阶组件是一个漏洞的抽象过程：用户必须知道它是怎么实现的从而避免与其他高阶组件的冲突。

相比于修改，高阶组件最好是通过将输入组件包裹在容器组件的方式来使用组合:

function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      // 用容器组件组合包裹组件且不修改包裹组件，这才是正确的打开方式。
      return <WrappedComponent {...this.props} />;
    }
  }
}
这个高阶组件与之前的修改原型的版本有着相同的功能，但又避免了潜在的冲突可能。其在class类型和函数类型的组件都起作用。并且，因为是纯函数，它可以与其他高阶组件，甚至是自己组合。

你可能已经注意到高阶组件和被称为容器组件(container components)的模式有相同之处。容器组件是分离责任策略的一部分。这个分离策略是关于高层次和低层次关注点之间的责任分离。容器管理着类似订阅和状态这类东西，和给组件传递属性来处理类似渲染UI这类事情。高阶组件使用容器作为其实现的一部分。你可以将高阶组件视为定义参数化容器组件。
   * 
   */

/**
约定: 给包裹组件传递不相关的属性(Props)
高阶组件可以向组件添加功能。他不应该大幅度地改变功能。期望地是高阶组件返回的组件和被包裹组件具有相似的界面。

高阶组件应该通过props传递那些与特定功能无关的特性。大多数的高阶组件包含如下的render函数:

render() {
  // 过滤掉与高阶函数功能相关的props属性，
  // 不再传递
  const { extraProp, ...passThroughProps } = this.props;

  // 向包裹组件注入props属性，一般都是高阶组件的state状态
  // 或实例方法
  const injectedProp = someStateOrInstanceMethod;

  // 向包裹组件传递props属性
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
这个约定帮助确定高阶组件能够足够灵活和可以被重用。
 */

class HigherOrderComponents extends Component {
  render() {
    return <div />;
  }
}

export default HigherOrderComponents;
