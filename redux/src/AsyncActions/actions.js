/**
 * 把 REQUEST_POSTS 和 SELECT_SUBREDDIT 或 INVALIDATE_SUBREDDIT 分开很重要。
 * 虽然它们的发生有先后顺序，但随着应用变得复杂，有些用户操作（比如，预加载最流行的 subreddit，或者一段时间后自动刷新过期数据）后需要马上请求数据。
 * 路由变化时也可能需要请求数据，所以一开始如果把请求数据和特定的 UI 事件耦合到一起是不明智的。
 */

 /**
  异步 action 创建函数
  最后，如何把 之前定义 的同步 action 创建函数和网络请求结合起来呢？标准的做法是使用 Redux Thunk 中间件。要引入 redux-thunk 这个专门的库才能使用。我们 后面 会介绍 middleware 大体上是如何工作的；目前，你只需要知道一个要点：通过使用指定的 middleware，action 创建函数除了返回 action 对象外还可以返回函数。这时，这个 action 创建函数就成为了 thunk。

  当 action 创建函数返回函数时，这个函数会被 Redux Thunk middleware 执行。这个函数并不需要保持纯净；它还可以带有副作用，包括执行异步 API 请求。这个函数还可以 dispatch action，就像 dispatch 前面定义的同步 action 一样。

  我们仍可以在 actions.js 里定义这些特殊的 thunk action 创建函数。
  */

//  thunk 的一个优点是它的结果可以再次被 dispatch：
//  这可以让我们逐步开发复杂的异步控制流，同时保持代码整洁如初：

 import fetch from 'cross-fetch';

// 用户可以选择要显示的 subreddit
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export function selectSubreddit(subreddit) {
  return { type: SELECT_SUBREDDIT, subreddit };
}

// 当需要获取指定 subreddit 的帖子的时候，需要 dispatch REQUEST_POSTS action：
 export const REQUEST_POSTS = 'REQUEST_POSTS';
 function requestPosts(subreddit) {
   return { type: REQUEST_POSTS, subreddit };
 }

 // 最后，当收到请求响应时，我们会 dispatch RECEIVE_POSTS：
 export const RECEIVE_POSTS = 'RECEIVE_POSTS';
 function receivePosts(subreddit, json) {
   return { type: RECEIVE_POSTS, subreddit, posts: json.data.children.map(child => child.data), receivedAt: Date.now() };
 }

//  也可以按 "刷新" 按钮来更新它：
 export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
 export function invalidateSubreddit(subreddit) {
   return { type: INVALIDATE_SUBREDDIT, subreddit };
 }

//  异步请求
 function fetchPosts(subreddit) {
   return dispatch => {
     dispatch(requestPosts(subreddit));
     return fetch(`http://www.reddit.com/r/${subreddit}.json`)
       .then(response => response.json())
       .then(json => dispatch(receivePosts(subreddit, json)));
   };
 }

//  判断是否为缓存数据
 function shouldFetchPosts(state, subreddit) {
  // isFetching  // 进度条状态
  // didInvalidate// 标记数据是否过期
   const posts = state.postsBySubreddit[subreddit];
   if (!posts) {
     // 如果没有此缓存数据
     return true;
   } else if (posts.isFetching) {
    // 如果进度条正在加载
     return false;
   } else {
     // 标记数据是否过期
     return posts.didInvalidate;
   }
 }

 export function fetchPostsIfNeeded(subreddit) {
   // 注意这个函数也接收了 getState() 方法
   // 它让你选择接下来 dispatch 什么。

   // 当缓存的值是可用时，
   // 减少网络请求很有用。

   return (dispatch, getState) => {
     if (shouldFetchPosts(getState(), subreddit)) {
       // 在 thunk 里 dispatch 另一个 thunk！
       return dispatch(fetchPosts(subreddit));
     } else {
       // 告诉调用代码不需要再等待。
       return Promise.resolve();
     }
   };
 }

/*

import fetch from 'cross-fetch';

// 用户可以选择要显示的 subreddit
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
}

export const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
}

// 来看一下我们写的第一个 thunk action 创建函数！
// 虽然内部操作不同，你可以像其它 action 创建函数 一样使用它：
// store.dispatch(fetchPosts('reactjs'))

export function fetchPosts(subreddit) {
  // Thunk middleware 知道如何处理函数。
  // 这里把 dispatch 方法通过参数的形式传给函数，
  // 以此来让它自己也能 dispatch action。

  return function(dispatch) {
    // 首次 dispatch：更新应用的 state 来通知
    // API 请求发起了。

    dispatch(requestPosts(subreddit));

    // thunk middleware 调用的函数可以有返回值，
    // 它会被当作 dispatch 方法的返回值传递。

    // 这个案例中，我们返回一个等待处理的 promise。
    // 这并不是 redux middleware 所必须的，但这对于我们而言很方便。

    return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
      .then(
        response => response.json(),
        // 不要使用 catch，因为会捕获
        // 在 dispatch 和渲染中出现的任何错误，
        // 导致 'Unexpected batch number' 错误。
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        // 可以多次 dispatch！
        // 这里，使用 API 请求结果来更新应用的 state。

        dispatch(receivePosts(subreddit, json))
      );
  };
}

*/

/*
// 用户可以选择要显示的 subreddit
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
}

// 也可以按 "刷新" 按钮来更新它：
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export function invalidatesubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
}

// 当需要获取指定 subreddit 的帖子的时候，需要 dispatch REQUEST_POSTS action：
export const REQUEST_POSTS = 'REQUEST_POSTS';
export function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
}

// 最后，当收到请求响应时，我们会 dispatch RECEIVE_POSTS：
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}
*/

/**
"Reddit 头条" 应用会长这个样子：

{
  selectedsubreddit: 'frontend',
  postsBySubreddit: {
    frontend: {
      isFetching: true,      // 进度条状态
      didInvalidate: false,  // 标记数据是否过期
      items: []        
    },
    reactjs: {
      isFetching: false,             // 进度条状态
      didInvalidate: false,          // 标记数据是否过期
      lastUpdated: 1439478405547,    // 存放数据最后更新时间
      items: [
        {
          id: 42,
          title: 'Confusion about Flux and Relay'
        },
        {
          id: 500,
          title: 'Creating a Simple Application Using React JS and Flux Architecture'
        }
      ]
    }
  }
}
下面列出几个要点：

分开存储 subreddit 信息，是为了缓存所有 subreddit。当用户来回切换 subreddit 时，可以立即更新，同时在不需要的时候可以不请求数据。不要担心把所有帖子放到内存中（会浪费内存）：除非你需要处理成千上万条帖子，同时用户还很少关闭标签页，否则你不需要做任何清理。

每个帖子的列表都需要使用 
isFetching 来显示进度条，
didInvalidate 来标记数据是否过期，
lastUpdated 来存放数据最后更新时间，
还有 items 存放列表信息本身。
在实际应用中，你还需要存放 fetchedPageCount 和 nextPageUrl 这样分页相关的 state。
 */