/**
 * 我们甚至可以把一个Promise对象传入组件，请看Demo12。
 */

var RepoList = React.createClass({
  getInitialState: function () {
    return {
      loading: true,
      error: null,
      chatData: null
    };
  },

  componentDidMount() {
    this.props.promise.then(
      value => this.setState({ loading: false, chatData: value }),
      error => this.setState({ loading: false, error: error }));
  },

  render: function () {
    if (this.state.loading) {
      return <span>Loading...</span>;
    }
    else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;
    }
    else {
      // var repos = this.state.chatData.items;
      // var repoList = repos.map(function (repo, index) {
      //   return (
      //     <li key={index}><a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count} stars) <br/> {repo.description}</li>
      //   );
      // });
      var repos = this.state.chatData;
      var repoList = repos.map(function (repo, index) {
        return (
          <li key={index}>{repo.name} ({repo.notice} notice) <br /> {repo.head}</li>
        );
      });
      return (
        <main>
          <h1>Most Popular JavaScript Projects in Github</h1>
          <ol>{repoList}</ol>
        </main>
      );
    }
  }
});

// ReactDOM.render(
//   <RepoList promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')} />,
//   document.getElementById('example')
// );
ReactDOM.render(
  <RepoList promise={$.getJSON('http://192.168.0.118:8080/12/chat.json')} />,
  document.getElementById('example')
);

/**
 * 上面代码从Github的API抓取数据，然后将Promise对象作为属性，传给RepoList组件。
 * 如果Promise对象正在抓取数据（pending状态），组件显示"正在加载"；如果Promise对象报错（rejected状态），组件显示报错信息；
 * 如果Promise对象抓取数据成功（fulfilled状态），组件显示获取的数据。
 */