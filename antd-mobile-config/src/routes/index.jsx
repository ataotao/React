/**
 * 主路由配置
 */
import React from 'react';

// import { Router, Route, Redirect, Switch } from 'react-router-dom';
// import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Loadable from 'react-loadable';
import PageLoading from '../components/PageLoading';

const NotFound = Loadable({
  loader: () => import('../components/NotFound'),
  loading: PageLoading
});

const Loading = Loadable({
  loader: () => import('../components/Loading'),
  loading: PageLoading
});

const Main = Loadable({
  loader: () => import('../components/main/Index'),
  loading: PageLoading
});


export default () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect push to="/loading" />} /> 
      <Route path="/loading" component={Loading}/>
      <Route path="/:tenant_id/:brand_id/main" component={Main}/>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

