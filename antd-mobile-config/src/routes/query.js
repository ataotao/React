/**
 * query子路由配置
 */
import React, {Component} from 'react';

// import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router-dom';

import Category from '../components/query/Category';

export default class QueryRoutes extends Component {
  render() {
      return (
          <Switch>
            <Route exact path="/app/category" component={Category}/>
            <Route render={() => <Redirect to="/404" />} />
          </Switch>
      )
  }
}