import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Clock from './components/Clock';
import Toggle from './components/Toggle';
import ConditionalRender from './components/ConditionalRender';
import ListItems from './components/ListItems';

import NameForm from './components/forms/NameForm';
import EssayForm from './components/forms/EssayForm';
import SelectForm from './components/forms/SelectForm';
import FileInput from './components/forms/FileInput';
import ReservationInput from './components/forms/ReservationInput';

import Calculator from './components/LiftingStateUp/Calculator';

import WelcomeDialog from './components/CompositionVsInheritance/WelcomeDialog';
import WelcomeDialogA from './components/CompositionVsInheritance/WelcomeDialogA';
import SignUpDialog from './components/CompositionVsInheritance/SignUpDialog';
import AppPage from './components/CompositionVsInheritance/AppPage';

import FilterableProductTable from './components/FilterableProductTable';

import JsxTest from './components/Jsx/JsxTest';
import PropTypesTest from './components/PropTypes/PropTypesTest';
import RefsTest from './components/Refs/RefsTest';

import UncontrolledComponentsTest from './components/UncontrolledComponents/UncontrolledComponentsTest';
import Optimizing from './components/Optimizing/OptimizingTest';

import ContextTest from './components/Context/ContextTest';

import FragmentsTest from './components/Fragments/FragmentsTest';

import PortalsTest from './components/Portals/PortalsTest';

import ErrorBoundaries from './components/ErrorBoundaries/ErrorBoundaries';

import WebComponents from './components/WebComponents/WebComponents';

import HigherOrderComponents from './components/HigherOrderComponents/HigherOrderComponents';

import RenderProps from './components/RenderProps/RenderProps';

import TestRoute from './components/TestRoute/TestRoute';

function getGreeting(user) {
  if (user) {
    return <span>Hello, {formatName(user)}!</span>;
  }
  return <span>Hello, Stranger.</span>;
}

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez',
  avatarUrl: logo
};

// jsx 不要使用引号包裹，它不是字符串
const element = <img src={user.avatarUrl} className="App-logo" alt="" />;
const element1 = (
  <div tabIndex="0">注意tabindex或者class 需要改成tabIndex和className</div>
);

const title = user.firstName;
// This is safe:
const element2 = <h5>{title}</h5>;

// 组件方式一
function Welcome(props) {
  return <h5>Hello, {props.name}</h5>;
}

// 组件方式二
class Welcomea extends Component {
  render() {
    return <h5>Hello, {this.props.name}</h5>;
  }
}

// 提取组件应用方便多处使用
function formatDate(date) {
  return date.toLocaleDateString();
}

function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}

function Comment(props) {
  // 组件的props不可修改
  // props.text = 'aaaa';
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}

/**
 * 事件处理
 */

function ActionLink() {
  function handleClick(e) {
    // return false; // return false 无效
    e.preventDefault();
    alert('The link was clicked. e.preventDefault(),默认动作被阻止');
  }

  return (
    <a href="http://www.163.com/" onClick={handleClick}>
      Click me
    </a>
  );
}
const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'http://placekitten.com/g/64/64'
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <h1>快速入门</h1>
          <h2>jsx</h2>
          <div>{getGreeting(user)}!</div>
          <div>{getGreeting()}!</div>
          <div>{element}</div>
          <div>{element1}</div>
          <div>{element2}</div>
          <div id="root2" />
          <h2>组件</h2>
          <Welcome name="Welcome" />
          <Welcomea name="Welcomea" />
          {/* Comment 组件 包含 Avatar*/}
          <Comment
            date={comment.date}
            text={comment.text}
            author={comment.author}
          />
          {/* Avatar组件单独使用 */}
          <Avatar user={comment.author} />
          <h3>不要直接修改组件的props值</h3>
          <h2>状态和生命周期</h2>
          <Clock />
          <h2>事件处理</h2>
          <ActionLink />
          <Toggle />
          <h2>条件渲染</h2>
          <ConditionalRender />
          <h3>列表(Lists) 和 键(Keys)</h3>
          <ListItems />
          <h3>表单(Forms)</h3>
          <NameForm />
          <p>&nbsp;</p>
          <EssayForm />
          <p>&nbsp;</p>
          <SelectForm />
          <p>&nbsp;</p>
          <FileInput />
          <p>&nbsp;</p>
          <ReservationInput />
          <p>&nbsp;</p>
          <h3>状态提升(Lifting State Up)</h3>
          <p>&nbsp;</p>
          <Calculator />
          <h3>组合 VS 继承（Composition vs Inheritance）</h3>
          <p>&nbsp;</p>
          <WelcomeDialog />
          <WelcomeDialogA />
          <SignUpDialog />
          <AppPage />
          <h3>React 编程思想(综合实例)</h3>
          <FilterableProductTable products={PRODUCTS} />
          <p>&nbsp;</p>
          <h3>
            --------------------------------------------------------------------
          </h3>
          <h1>高级指南</h1>
          <h3>深入 JSX</h3>
          <JsxTest />
          <p>&nbsp;</p>
          <h3>使用 PropTypes 进行类型检查</h3>
          <PropTypesTest />
          <p>&nbsp;</p>
          <h3>静态类型检查</h3>
          <div>
            <code>npm install --save-dev flow-bin </code>
            <code> scripts 加入"flow": "flow",</code>
            <code>初始化flow配置</code>
            <code>npm run flow init</code>
            <code>执行flow</code>
            <code>npm run flow</code>
          </div>
          <h3>Refs 和 DOM</h3>
          <RefsTest />
          <h3>不受控组件 通过ref控制form</h3>
          <UncontrolledComponentsTest />
          <h3>性能优化</h3>
          <Optimizing />
          <h3>上下文(Context)传递数据</h3>
          <ContextTest />
          <h3>片段(fragments)</h3>
          <FragmentsTest />
          <h3>插槽(Portals)</h3>
          <PortalsTest />
          <h3>错误边界(Error Boundaries)</h3>
          <ErrorBoundaries />
          <h3>Web 组件(Web Components)</h3>
          <WebComponents />
          <h3>高阶组件(Higher-Order Components)</h3>
          <HigherOrderComponents />
          <h3>
            <a
              href="https://reactjs.org/docs/integrating-with-other-libraries.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              与第三方库协同
            </a>
          </h3>
          <h3>Render Props 动态渲染Props</h3>
          <RenderProps />
          <h3>测试动态路由</h3>
          <TestRoute />
        </div>
      </div>
    );
  }
}

export default App;

var PRODUCTS = [
  {
    category: 'Sporting Goods',
    price: '$49.99',
    stocked: true,
    name: 'Football'
  },
  {
    category: 'Sporting Goods',
    price: '$9.99',
    stocked: true,
    name: 'Baseball'
  },
  {
    category: 'Sporting Goods',
    price: '$29.99',
    stocked: false,
    name: 'Basketball'
  },
  {
    category: 'Electronics',
    price: '$99.99',
    stocked: true,
    name: 'iPod Touch'
  },
  {
    category: 'Electronics',
    price: '$399.99',
    stocked: false,
    name: 'iPhone 5'
  },
  {
    category: 'Electronics',
    price: '$199.99',
    stocked: true,
    name: 'Nexus 7'
  }
];
