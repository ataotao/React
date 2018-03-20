import React from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const Home = Loadable({
  loader: () => import('./Home'),
  loading: Loading
});

const About = Loadable({
  loader: () => import('./About'),
  loading: Loading
});

const Haha = Loadable({
  loader: () => import('./Haha'),
  loading: Loading
});

const TestRoute = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/About">About</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/haha" component={Haha} />
      </Switch>
    </div>
  </Router>
);

export default TestRoute;

// class TestRoute extends Component {
//     render() {
//         return (
//             <div>

//             </div>
//         );
//     }
// }

// export default TestRoute;
