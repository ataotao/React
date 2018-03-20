import React, { Component } from 'react';

/**
片段(fragments)
React 中一个常见模式是为一个组件返回多个元素。 片段(fragments) 可以让你将子元素列表添加到一个分组中，并且不会在DOM中增加额外节点。

render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
还有一个新的 简写语法 可以用来声明它们，但是它还没有被所有流行的工具所支持。
 */

/*
 动机
一个常见模式是为一个组件返回一个子元素列表。以这个示例的 React 片段为例：

class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
为了渲染有效的 HTML ， <Columns /> 需要返回多个 <td> 元素。如果 <Columns /> 的 render() 函数里面使用一个父级 div ，那么最终生成的 HTML 将是无效的。

class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}
在 <Table /> 组件中的输出结果：

<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
所以，我们介绍 Fragment。
 */
class Columns extends Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}

class Table extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <Columns />
          </tr>
        </tbody>
      </table>
    );
  }
}

/*
简写语法
有一个新的，更短的语法可以用来声明 片段(fragments) 。 它看起来像空标签：

There is a new, shorter syntax you can use for declaring fragments. It looks like empty tags:

class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
您可以像使用其他元素一样使用<></>，只是它不支持 键(keys) 或 属性(attributes)。

请注意， 目前许多工具都不支持这个简写语法 ， 所以你可能需要明确地使用 <React.Fragment> ，直到工具支持这个语法。
*/

/*
带 key 的 片段(fragments)
如果你需要一个带 key 的片段，你可以直接使用 <React.Fragment /> 。 一个使用场景是映射一个集合为一个片段数组 — 例如：创建一个描述列表：

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // 没有`key`，将会触发一个key警告
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
key 是唯一可以传递给 Fragment 的属性。在将来，我们可能增加额外的属性支持，比如事件处理。
*/
const items = [
  { id: 1, term: 'title-a', description: 'description-a' },
  { id: 2, term: 'title-b', description: 'description-b' }
];
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // 没有`key`，将会触发一个key警告
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

class FragmentsTest extends Component {
  render() {
    return (
      <div>
        <Table />
        <Glossary items={items} />
      </div>
    );
  }
}

export default FragmentsTest;
