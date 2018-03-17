// 路由
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const RouteExample = () => (
  <Router>
    <div>
      <h2>Accounts</h2>
      <ul>
        <li>
          <Link to="/netflix">Netflix</Link>
        </li>
        <li>
          <Link to="/zillow-group">Zillow Group</Link>
        </li>
        <li>
          <Link to="/yahoo">Yahoo</Link>
        </li>
        <li>
          <Link to="/modus-create">Modus Create</Link>
        </li>
        <li>
          <Link to="/order/asc">/order/asc</Link>
        </li>
        <li>
          <Link to="/order/desc">/order/desc</Link>
        </li>
        <li>
          <Link to="/order/foo">/order/foo</Link>
        </li>
      </ul>
      <Route path="/:id" component={Child} />

      {/*
          可以通过正则匹配是否显示ComponentWithRegex组件
         It's possible to use regular expressions to control what param values should be matched.
            * "/order/asc"  - matched
            * "/order/desc" - matched
            * "/order/foo"  - not matched
      */}
      <Route
        path="/order/:direction(asc|desc)"
        component={ComponentWithRegex}
      />
    </div>
  </Router>
);

const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
);

const ComponentWithRegex = ({ match }) => (
  <div>
    <h3>Only asc/desc are allowed: {match.params.direction}</h3>
  </div>
);

export default RouteExample;
