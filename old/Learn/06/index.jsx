const data = 111;

const MyTitle = React.createClass({
  /**
   * 组件的属性可以接受任意值，字符串、对象、函数等等都可以。
   * 有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。
   * 组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求
   */
  propTypes: {
    title: React.PropTypes.string.isRequired
    /**
     * 
     * 验证布尔值
     * optionalBool: React.PropTypes.bool,
     * 
     * 验证是一个函数
     * optionalFunc: React.PropTypes.func,
     * 
     * 验证是数字
     * optionalNumber: React.PropTypes.number,
     * 
     * 自定义验证器，验证失败需要返回一个 Error 对象。不要直接
     * 使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。
     * customProp: function(props, propName, componentName)  {
     * //自定义的验证方法
     * ……
     * }
     * customProp: function(props, propName, componentName) {
     *    if (!/matchme/.test(props[propName])) {
     *      return new Error(
     *        'Invalid prop `' + propName + '` supplied to' +
     *        ' `' + componentName + '`. Validation failed.'
     *      );
     *    }
     *  },
     * 
     * 
     */
  },
  /**
   * 上面的Mytitle组件有一个title属性。PropTypes 告诉 React，这个 title 属性是必须的，而且它的值必须是字符串。
   * 现在，我们设置 title 属性的值是一个数值 123。
   * 这样一来，title属性就通不过验证了。控制台会显示一行错误信息。
   * 更多的PropTypes设置，可以查看[官方文档](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)
   */
  render: function () {
    console.log(this);
    return <h1>{this.props.title}</h1>
  }
});

ReactDOM.render(
  <MyTitle title={data} />,
  document.getElementById('example')
)

/**
 * 此外，getDefaultProps 方法可以用来设置组件属性的默认值。
 */

var MyTitle1 = React.createClass({
  getDefaultProps: function () {
    return {
      title: 'Hello World'
    };
  },

  render() {
    return (
      <div>
        <h1> {this.props.title} </h1>;
       </div>
    );
  }
});

MyTitle1.propTypes = {
  title: function (props, propName, componentName) {
    console.log([...arguments]);
    if (props.title.length > 4) {
      return new Error(` ${componentName}组件 > ${propName} 名称太长`);
    }
  }
}

ReactDOM.render(
  <MyTitle1 />,
  document.getElementById('root')
);