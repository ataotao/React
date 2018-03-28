## 容器组件（Smart/Container Components）和展示组件（Dumb/Presentational Components）

### 展示组件

* 作用： 描述如何展现（骨架、样式）
* 直接使用： Redux 否
* 数据来源： props
* 数据修改： 从 props 调用回调函数
* 调用方式： 手动

### 容器组件

* 作用： 描述如何运行（数据获取、状态更新）
* 直接使用： 是
* 数据来源： 监听 Redux state
* 数据修改： 向 Redux 派发 actions
* 调用方式： 通常由 React Redux 生成

大部分的组件都应该是展示型的，但一般需要少数的几个容器组件把它们和 Redux store 连接起来。这和下面的设计简介并不意味着容器组件必须位于组件树的最顶层。如果一个容器组件变得太复杂（例如，它有大量的嵌套组件以及传递数不尽的回调函数），那么在组件树中引入另一个容器，就像 FAQ 中提到的那样。

技术上讲你可以直接使用 `store.subscribe()` 来编写容器组件。但不建议这么做的原因是无法使用 React Redux 带来的`性能优化`。也因此，不要手写容器组件，而使用 React Redux 的 `connect()` 方法来生成，后面会详细介绍。

### 例子

#### 展示组件

以下的这些组件（和它们的 props ）就是从这个设计里来的：

* TodoList 用于显示 todos 列表。

  * todos: Array 以 { text, completed } 形式显示的 todo 项数组。
  * onTodoClick(index: number) 当 todo 项被点击时调用的回调函数。

* Todo 一个 todo 项。

  * text: string 显示的文本内容。
  * completed: boolean todo 项是否显示删除线。
  * onClick() 当 todo 项被点击时调用的回调函数。

* Link 带有 callback 回调功能的链接

  * onClick() 当点击链接时会触发

* Footer 一个允许用户改变可见 todo 过滤器的组件。

* App 根组件，渲染余下的所有内容。

这些组件只定义外观并不关心数据来源和如何改变。传入什么就渲染什么。如果你把代码从 Redux 迁移到别的架构，这些组件可以不做任何改动直接使用。它们并不依赖于 Redux。

#### 容器组件

还需要一些容器组件来把展示组件连接到 Redux。例如，展示型的 TodoList 组件需要一个类似 VisibleTodoList 的容器来监听 Redux store 变化并处理如何过滤出要显示的数据。为了实现状态过滤，需要实现 FilterLink 的容器组件来渲染 Link 并在点击时触发对应的 action：

* VisibleTodoList 根据当前显示的状态来对 todo 列表进行过滤，并渲染 TodoList。

* FilterLink 得到当前过滤器并渲染 Link。
  * filter: string 就是当前过滤的状态

#### 其它组件

有时很难分清到底该使用容器组件还是展示组件。例如，有时表单和函数严重耦合在一起，如这个小的组件：

* AddTodo 含有“Add”按钮的输入框

技术上讲可以把它分成两个组件，但一开始就这么做有点早。在一些非常小的组件里混用容器和展示是可以的。当业务变复杂后，如何拆分就很明显了。所以现在就使用混合型的吧。
