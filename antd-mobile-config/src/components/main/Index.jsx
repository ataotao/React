import React, { Component } from 'react';
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
function MainLogo() {
    return (
        <img alt="" src='/static/img/logo/sopei.png' className={style.logo} />
    );
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


class Index extends Component {
    // 按钮配置
    btnConfig = [
        { name: '按车型', type: 'primary', url: 'searchModel' },
        { name: '按VIN', type: 'default', url: 'searchVin' },
        { name: '按编码', type: 'default', url: 'searchCode' }
    ];

    /**
     * 点击事件
     * {name ,type , url}
     * @param {String} config 
     */
    handleClick = config => {
        let configs = [...this.btnConfig];
        configs.forEach(item => item.type = item.name === config.name ? 'primary' : 'default');
        this.setState({
            btnConfig: configs
        });
        this.routeTo(config.url);
    };

    // 路由
    routeTo = link => {
        const { history, match } = this.props;
        history.push({ pathname: `${match.url}/${link}`});
    };
    render() {
        return (
            <div>
                <Helmet>
                    <title>雨神品牌</title>
                </Helmet>
                {/* Header */}
                <MainHeader>
                    <MainLogo />
                </MainHeader>
                <WhiteSpace size="lg" />
                {/* TabButton */}
                <TabButton handleClick = {this.handleClick} btnConfig = {this.btnConfig}/>
                {/* 子路由 */}
                <SearchRoutes />
            </div>
        );
    }
}

export default Index;

