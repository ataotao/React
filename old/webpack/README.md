前言
======

webpack和react搭配开发非常棒可以说是最佳的搭档了，包在安装过程中开发用的使用npm install --save-dev <name>安装，生产环境需要的包用npm install --save <name>安装，国内由于网络环境建设使用淘宝的镜像源cnpm，本节使用的包列表：

- babel一系列编译转换工具:
- npm install --save-dev babel-core babel-cli babel-loader babel-preset-es2015 babel-preset-react
- React库:npm install --save react react-dom


目录结构
-------
    |-React-redux-example
        |-node_modules/                    #包文件
        |-public/                          #静态目录
            |-assets/                      #静态资源生成目录
            |-index.html
        |-src/                             #开发目录
            |-app.js                       #client入口文件
        |-config/                          #配置目录
            |-webpack.dev.js               #webpack开发配置文件
        |-package.json        
        |-README.md
        |-.gitignore                       #git的忽略列表

config/webpack.dev.js
---------------------
```
    var path = require('path')

    //配置文件是放在config的目录下的，所有这里定义了一个项目的根目录变量
    var projectRootPath = path.resolve(__dirname,'..') 

    var config = {
      entry: path.resolve(projectRootPath,'src/app.js'),
      output:{
        path: path.resolve(projectRootPath,'public','assets'),
        filename: 'bundle.js',
        publicPath: '/assets/'
      },
      module:{
        loaders:[
          {
            test:/\.js$/,
            exclude:/node_modules/,
            loader:'babel-loader',
            query:{
              presets:['react','es2015']
            }
          }
        ]
      }
    }

    module.exports=config;
```
```
    entry:要打包文件
    output:打包文件位置
    module:打包要加载的模块--presets用来解析ES6,React,ES7语法
    publicPath:指定公共URL地址在浏览器输出文件的引用
```

package.json
------------

- 在scripts添加webpack的编译命令，由于我的webpack配置文件，放在config目录中，所以在编译时要指定--config ./config/webpack.dev.js
```
    "scripts": {
      "build": "webpack --verbose --color --display-error-details --config ./config/webpack.dev.js "
    }
```


src/app.js
------------

- 这里我们用最少的代码测试一下我们的webpack配置有没有问题
```
    import React from 'react'
    import ReactDOM from 'react-dom'

    ReactDOM.render(<h1>Hello</h1>,document.getElementById('app'))
```

public/index.html
------------------
- 因为没有启动web服务器，所以<script src="./assets/bundle.js"></script>用的是文件的相对地址
```
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>React-redux-example</title>
    </head>
    <body>
      <div id="app"></div>
    </body>
    <script src="./assets/bundle.js"></script>
    </html>
```

build
------------------
- 完成上面所有步骤后，npm run build会看到在public/assets/目录中生成了一个bundle.js文件，在浏览器中打开index.html看到Hello,我们的webpack基本配置就完成了，如图