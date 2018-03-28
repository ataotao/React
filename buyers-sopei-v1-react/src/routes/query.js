/**
 * query子路由配置
 */
import React, {Component} from 'react';

// import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router-dom';

import QueryCategory from '../components/query/QueryCategory';

export default class QueryRoutes extends Component {
  render() {
      return (
          <Switch>
            <Route exact path="/query/index" component={QueryCategory}/>
            <Route render={() => <Redirect to="/404" />} />
          </Switch>
      )
  }
}