// @flow
// 添加@flow检查错误

import React, { Component } from 'react';
// import logo from './logo.svg';

/*
查看 App.scss文件 ，注意页面import需要放编译的css文件， 路径设置也只对scss文件里有效

"build-css": "node-sass-chokidar src/ -o src/",
"watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
设置了--include-path参数，则可默认src目录或者node_modules为根目录,方便写import路径
"build-css": "node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/",
"watch-css": "npm run build-css && node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/ --watch --recursive"
*/
import './App.css';

import test from './test.png';
import test1 from './test1.png';

// 标题设置
import { Helmet } from 'react-helmet';

// 测试组件
import DangerButton from './components/DangerButton';

// bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Modal, Button, Grid, Row, Col } from 'react-bootstrap';

// 路由
import RouteExample from './RouteExample';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { logo: process.env.PUBLIC_URL + '/img/logo.svg' };

    // 环境变量
    if (process.env.NODE_ENV !== 'production') {
      console.log(process.env);
    }
  }

  handleClick = () => {
    // 测试动态导入模块 还可以搭配async/ await使用
    import('./components/moduleA')
      .then(({ moduleA }) => {
        alert('动态加载模块成功');
      })
      .catch(err => {
        // Handle failure
      });
  };

  render() {
    return (
      <div className="App">
        {/* 页面标题设置 */}
        <Helmet>
          <meta charSet="utf-8" />
          <title>Atao Title</title>
          <meta name="description" content="Helmet application" />
          <link rel="canonical" href="http://www.tao.com/example" />
        </Helmet>
        <header className="App-header">
          {this.state.logo}
          <div>
            {/* 从public文件夹获取资源文件 */}
            <img src={this.state.logo} alt="logo" />
          </div>
          {/* 背景图也能build */}
          <div className="Logo-bg" />
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* 小于10,000字节的图像将返回数据URI而不是路径 */}
          <img src={test1} className="App-logo" alt="logo" />
          <img src={test} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* bootstrap */}
        <Button bsStyle="primary">Primary</Button>
        <div className="col-xs-12">col-xs-12</div>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              111
            </Col>
            <Col xs={6} md={4}>
              222
            </Col>
          </Row>
        </Grid>
        <div className="static-modal hide">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>One fine body...</Modal.Body>

            <Modal.Footer>
              <Button>Close</Button>
              <Button bsStyle="primary">Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>;
        <p className="App-intro blue">
          测试组件导入 <DangerButton />
        </p>
        <p>测试动态加载模块</p>
        <button onClick={this.handleClick}>测试动态加载模块</button>
        {/* 路由 */}
        <RouteExample />
        {/* 环境变量 */}
        <div>
          <small>
            You are running this application in <b>{process.env.NODE_ENV}</b>{' '}
            mode.
          </small>
          <div>
            环境变量REACT_APP_WEBSITE_NAME，永久环境变量可以在根目录的.env文件里面设置
            =
            {process.env.REACT_APP_WEBSITE_NAME}
          </div>
          <form>
            <input
              type="text"
              defaultValue={process.env.REACT_APP_SECRET_CODE}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
