## 开发环境代理配置，只对开发环境有效（注意不同的方式apiUrl变化）
```
// package.json增加
"proxy": "https://dev.q.sopei.cn"
fetch('/api/user/v1.0/info/mine?tenant_id=370763113544693760&brand_id=370763114148673280').then(function(response) {
    return response;
  }).then(function(response) {
    console.log(response);
  });
```
```
// 或者书写为

  "proxy": {
    "/api": {
      "target": "https://dev.q.sopei.cn",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  }

  fetch('https://dev.q.sopei.cn/api/user/v1.0/info/mine?tenant_id=370763113544693760&brand_id=370763114148673280').then(function(response) {
    return response;
  }).then(function(response) {
    console.log(response);
  });
```

## 安装依赖
- react-helmet 设置title以及head内容插件
- react-app-rewired 一个对 create-react-app 进行自定义配置的社区解决方案(说明 https://ant.design/docs/react/use-with-create-react-app-cn)
- babel-plugin-import 按需加载组件
- react-app-rewire-less 自定义主题
- redux
- react-redux
- redux-logger
- redux-thunk  redux-thunk中间件可以让action创建函数先不返回一个action对象，而是返回一个函数，函数传递两个参数(dispatch,getState),在函数体内进行业务逻辑的封装
- redux-devtools-extension redux开发工具
- axios ajax请求
- react-router-dom  会多出<Link> <BrowserRouter> 这样的 DOM 类组件。所以用 react-router-dom 吧，如果你会用到 DOM 绑定的话。
- antd-mobile

**************************************************************************************************************************************************

