/**
 * 搜索路由配置
 */
import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import Loadable from 'react-loadable';
import PageLoading from '../components/PageLoading';

const SearchModel = Loadable({
    loader: () => import('../components/main/SearchModel'),
    loading: PageLoading
});

const SearchVin = Loadable({
    loader: () => import('../components/main/SearchVin'),
    loading: PageLoading
});

const SearchCode = Loadable({
    loader: () => import('../components/main/SearchCode'),
    loading: PageLoading
});

const SearchRoutes = () => (
    <Switch>
        {/* <Route exact path="/main" render={() => <Redirect push to="/main/searchModel" />} />  */}
        <Route path="/:tenant_id/:brand_id/main/searchModel" component={SearchModel}/>
        <Route path="/:tenant_id/:brand_id/main/searchVin" component={SearchVin}/>
        <Route path="/:tenant_id/:brand_id/main/searchCode" component={SearchCode} />
        <Route render={() => <Redirect to="/404" />} />
    </Switch>
);

export default SearchRoutes;
