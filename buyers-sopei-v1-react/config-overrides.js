const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  debugger;
  // 按需加载配置 `style: true` 会加载 less 文件
  config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config);
  // 这里利用了 less-loader 的 modifyVars 来进行主题配置， 变量和其他配置方式可以参考 配置主题 文档。
  config = rewireLess.withLoaderOptions({
    modifyVars: { '@primary-color': '#1DA57A' }
  })(config, env);
  return config;
};
