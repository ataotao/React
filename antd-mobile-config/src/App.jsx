import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from './routes/';
import {mapStateToProps, mapDispatchToProps} from './action/states';

class App extends Component {
    dataInfoMain = {};
    dataCategory = {};
    componentWillMount() {
        const { fetchData } = this.props;
        let params = {
                tenant_id:'392394702372354048',
                brand_id:'392394702976333312'
            };
        
        fetchData({funcName: 'getInfoMine', params, stateName: 'INFO_MAIN'});

        // fetchData({funcName: 'getCategory', params, stateName: 'CATEGORY'});
        
                // let params = {
        //     tenant_id:'392394702372354048',
        //     brand_id:'392394702976333312'
        // };
        // const { receiveData } = this.props;
        // let infoMain = receiveData(params, 'INFO_MAIN');
        // let category = receiveData(params, 'CATEGORY');
        // this.init(infoMain, category);
    }
    componentDidMount() {
        
    }
    init = (infoMain, category) => {
        // this.setState({
        //     dataInfoMain: infoMain,
        //     dataCategory: category
        // });
    };
    render() {
        // const { httpData } = this.props;
        // console.log('httpData', httpData);
        
        return <Routes />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);