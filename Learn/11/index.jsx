/**
 * 组件的数据来源，通常是通过 Ajax 请求从服务器获取，
 * 可以使用 componentDidMount 方法设置 Ajax 请求，
 * 等到请求成功，再用 this.setState 方法重新渲染 UI 
 */

var UserGist = React.createClass({
  getInitialState: function () {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function () {
    $.get(this.props.source, function (result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function () {
    return (
      <div>
        {this.state.username}'s last gist is <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.getElementById('root')
);

/**
 * 上面代码使用 jQuery 完成 Ajax 请求，这是为了便于说明。React 本身没有任何依赖，完全可以不用jQuery，而使用其他库。
 * 我们甚至可以把一个Promise对象传入组件，请看Demo12。
 */


var ChatList = React.createClass({
  getInitialState: function () {
    console.log('1:getInitialState');
    return {
      chatData: []
    };
  },

  componentDidMount: function () {
    console.log('2:componentDidMount');
    $.get(this.props.source, function (result) {
      if (this.isMounted()) {
        this.setState({
          chatData: result
        });
      }
    }.bind(this));
  },

  render: function () {
    console.log('3:render');
    let chatData = this.state.chatData;
    return (
      <ul>
        { 
          chatData.length > 0 
          ? chatData.map((item, index, obj) => <li key={index}>{index}, {item.name}</li>)
          : <li>加载中...</li>
        }
      </ul>
    );
  }

});

ReactDOM.render(
  <ChatList source="./chat.json" />,
  document.getElementById('example')
);

/**
 * 上面代码使用 jQuery 完成 Ajax 请求，这是为了便于说明。React 本身没有任何依赖，完全可以不用jQuery，而使用其他库。
 */