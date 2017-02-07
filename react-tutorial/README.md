react-tutorial
==============

JSX
-------------
- [使用 JSX](./01-JSX/01.html)
- [属性扩散]()
- [和HTML的差距]()





###### webpack
--------------
- npm install -g webpack
- Webpack 使用一个名为 webpack.config.js 的配置文件，要编译 JSX，先安装对应的 loader: npm install babel-loader --save-dev
- 假设我们在当前工程目录有一个入口文件 entry.js，React 组件放置在一个 components/ 目录下，组件被 entry.js 引用，要使用 entry.js，我们把这个文件指定输出到 dist/bundle.js，Webpack 配置如下：
``` Javascript
  var path = require('path');

  module.exports = {
      entry: './entry.js',
      output: {
          path: path.join(__dirname, '/dist'),
          filename: 'bundle.js'
      },
      resolve: {
          extensions: ['', '.js', '.jsx']
      },
      module: {
          loaders: [
              { test: /\.js|jsx$/, loaders: ['babel'] }
          ]
      }
  }
```
- resolve 指定可以被 import 的文件后缀。比如 Hello.jsx 这样的文件就可以直接用 import Hello from 'Hello' 引用。
- loaders 指定 babel-loader 编译后缀名为 .js 或者 .jsx 的文件，这样你就可以在这两种类型的文件中自由使用 JSX 和 ES6 了。
- 监听编译: webpack -d --watch
更多关于 Webpack 的介绍 [webpack-howto](https://github.com/petehunt/webpack-howto)