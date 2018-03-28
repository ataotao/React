import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from './routes/query';
import {mapStateToProps, mapDispatchToProps} from './action/states';

class App extends Component {
    dataInfoMain = {};
    dataCategory = {};
    componentWillMount() {

        const { fetchData } = this.props;
        let params = {
                tenant_id:'121265185512782854',
                brand_id:'121266371208969222'
            };
        
        fetchData({funcName: 'getInfoMine', params, stateName: 'INFO_MAIN'});

        // fetchData({funcName: 'getCategory', params, stateName: 'CATEGORY'});
        
                // let params = {
        //     tenant_id:'121265185512782854',
        //     brand_id:'121266371208969222'
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
        
        return (
            <Routes />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);