/**
 * 主路由配置
 */
import React from 'react';

// import { Router, Route, Redirect, Switch } from 'react-router-dom';
// import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import NotFound from '../components/NotFound';
import Loading from '../components/Loading';

import QueryIndex from '../components/query/QueryIndex';

// import Member from '../components/member/Index';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect push to="/loading" />} /> 
      <Route exact path="/loading" component={Loading}/>
      <Route path="/query" component={QueryIndex}/>
      <Route exact path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

