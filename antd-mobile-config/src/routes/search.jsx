/**
 * 搜索路由配置
 */
import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';

import SearchModel from '../components/main/SearchModel';
import SearchVin from '../components/main/SearchVin';
import SearchCode from '../components/main/SearchCode';

export default () => (
    <Switch>
      {/* <Route exact path="/main" render={() => <Redirect push to="/main/searchModel" />} />  */}
      <Route path="/:tenant_id/:brand_id/main/searchModel" component={SearchModel}/>
      <Route path="/:tenant_id/:brand_id/main/searchVin" component={SearchVin}/>
      <Route path="/:tenant_id/:brand_id/main/searchCode" component={SearchCode} />
      <Route render={() => <Redirect to="/404" />} />
    </Switch>
)

