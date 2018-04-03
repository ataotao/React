import React, { Component } from 'react';
import SearchInputBar from './SearchInputBar';
import SearchList from './SearchList';
import { getSearchCarmodels } from '../../http';
import { WingBlank, WhiteSpace } from 'antd-mobile';
let timer;

class SearchModel extends Component {
    state = {
        pageType: 'searchModel',
        maxLength: 20,
        placeholder: '输入车型查询配件，如CRV、杰德',
        value: '',
        hasError: true,
        modelList: []
    };

    componentDidMount() {

    }
    /**
     * 根据关键词搜索车型
     */
    getSearchCarmodelsFn = keywords => {
        if (keywords !== '') {
            // 延迟输入查询，减少不必要的请求
            clearTimeout(timer);
            timer = setTimeout(() => {
                const { tenant_id, brand_id } = this.props.match.params;
                getSearchCarmodels({ tenant_id, brand_id, keywords }).then(res => {
                    this.setState({
                        modelList: res.data
                    });
                    timer = null;
                });
            }, 300);
        } else {
            this.setState({
                modelList: []
            });
        }
    };

    /**
     * 表单验证
     */
    validate = value => {
        value = value.replace(/\s/g, '');
        let res = value.length === 0 ? true : false;
        return res;
    };

    onChange = value => {
        let hasError = this.validate(value);
        this.setState({
            value,
            hasError
        });
        // 获取搜索列表
        this.getSearchCarmodelsFn(value);
    };

    render() {
        let { modelList } = this.state;
        return (
            <WingBlank>
                {/* 搜索框 */}
                <SearchInputBar config={this.state} onChange={this.onChange} />
                {/* 搜索结果列表 */}
                {modelList.length > 0 && <SearchList list={modelList} />}
                {/* 查询记录 */}
                <WhiteSpace size="lg" />
                <div>经常查询的品牌</div>
            </WingBlank>
        );
    }
}

export default SearchModel;
