var path = require('path')

//配置文件是放在config的目录下的，所有这里定义了一个项目的根目录变量
var projectRootPath = path.resolve(__dirname, '..')

var config = {
  entry: path.resolve(projectRootPath, 'src/app.js'),
  output: {
    path: path.resolve(projectRootPath, 'public', 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}
/**
 * entry:要打包文件
 * output:打包文件位置
 * module:打包要加载的模块--presets用来解析ES6,React,ES7语法
 * publicPath:指定公共URL地址在浏览器输出文件的引用
 */

// console.log('-------config----------');
// console.log(config);
// console.log('-------config end----------');
// console.log('-------path----------');
// console.log(path);
// console.log('-------path end----------');
// console.log('-------__dirname----------');
// console.log(__dirname);
// console.log('-------__dirname end----------');
// console.log('-------projectRootPath----------');
// console.log(projectRootPath);
// console.log('-------projectRootPath end----------');
module.exports = config;