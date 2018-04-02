import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from './routes/';
import {mapStateToProps, mapDispatchToProps} from './action/states';
import PageLoading from './components/PageLoading';

class App extends Component {
    init = ()=> {
        const { fetchData } = this.props;
        let params = {
            tenant_id:'392394702372354048',
            brand_id:'392394702976333312'
        };
        // 拉取商户信息
        fetchData({funcName: 'getInfoMine', params, stateName: 'INFO_MAIN'});
    }
    componentWillMount() {
        this.init();
    }
    componentDidMount() {
        
    }
    render() {
        const { httpData } = this.props;
        const INFO_MAIN = httpData.INFO_MAIN;
        // 保证商户信息初始化完成
        return INFO_MAIN && INFO_MAIN.isFetching === false ? <Routes /> : <PageLoading/>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);