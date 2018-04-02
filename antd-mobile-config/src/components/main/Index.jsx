import React, { Component } from 'react';
import { connect } from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../../action/states';
import { Helmet } from 'react-helmet';
import { Button } from 'antd-mobile';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import SearchRoutes from '../../routes/search';
import style from './index.css';

/**
 * 会员图标
 */
function IconWode() {
    return <span className={`iconfont icon-wode blue ${style.icon}`}>
        <span className={`red-dot ${style.dot}`}></span>
    </span>;
}

/**
 * 头部
 * @param {*} porps 
 */
function MainHeader(porps) {
    return (
        <div className={style.header}>
            {porps.children}
            <IconWode />
        </div>
    );
}
/**
 * 品牌logo
 */
function MainLogo(props) {
    let { infoMain } = props;
    let { brand_imageurl, brand_des, brand_logo_using } = infoMain;
    let using = brand_logo_using.toString();
    let regExp = /^https?:\/\//;
    let imgUrl = regExp.test(brand_imageurl) ? brand_imageurl : '/' + brand_imageurl;
    switch (using) {
        case '1':
            return <img alt="" src={imgUrl} className={style.logo} />;
        case '2':
        default:
            return <div className="ell f24 p15"> <strong>{brand_des}</strong> </div>;
    }
}

/**
 * TabButtons
 * @param {*} props 
 */
function TabButton(props) {
    const listItems = props.btnConfig.map((config, index) => (
        <Button
            key={index}
            type={config.type}
            size="small"
            inline
            className={style.TabButton}
            onClick={() => props.handleClick(config)}
        >
            {config.name}
        </Button>
    ));
    return <WingBlank className={style.TabButton_box}>{listItems}</WingBlank>;
}


// 按钮配置
const btnConfig = [
    { name: '按车型', type: 'primary', url: 'searchModel' },
    { name: '按VIN', type: 'default', url: 'searchVin' },
    { name: '按编码', type: 'default', url: 'searchCode' }
];

class Index extends Component {
    state = {
        infoMain: {},
        currentConfig: btnConfig[0],
        btnConfig
    };

    componentWillMount() {
        const { httpData } = this.props;
        this.getInfoMine(httpData.INFO_MAIN);
    }

    componentDidMount() {

    }
    /**
     * 获取商户信息
     */
    getInfoMine = (INFO_MAIN)=> {
        this.setState({
            infoMain: JSON.parse(JSON.stringify(INFO_MAIN)).res.data
        });
    }
    /**
     * 点击事件
     * {name ,type , url}
     * @param {String} config
     */
    handleClick = config => {
        let configs = [...this.state.btnConfig];
        configs.forEach(
            item => (item.type = item.name === config.name ? 'primary' : 'default')
        );
        this.setState({
            currentConfig: config,
            btnConfig: configs
        });
        this.routeTo(config.url);
    };

    // 路由
    routeTo = link => {
        const { history, match } = this.props;
        history.push({ pathname: `${match.url}/${link}` });
    };

    render() {
        let {infoMain, btnConfig, currentConfig } = this.state;
        return (
            <div>
                <Helmet>
                    <title>{infoMain.brand_name +  ' - ' + currentConfig.name + '查询'}</title>
                </Helmet>
                {/* Header */}
                <MainHeader>
                    <MainLogo infoMain={infoMain} />
                </MainHeader>
                <WhiteSpace size="lg" />
                {/* TabButton */}
                <TabButton
                    handleClick={this.handleClick}
                    btnConfig={btnConfig}
                />
                {/* 子路由 */}
                <SearchRoutes />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);