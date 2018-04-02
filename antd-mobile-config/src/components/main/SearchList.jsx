import React, { Component } from 'react';
import { List, WingBlank } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import style from './SearchList.css';
const Item = List.Item;

class SearchList extends Component {
    state = {
        listBoxHeight: document.documentElement.clientHeight - 260 + 'px'
    };
    componentDidMount() {
        window.onresize = () => {
            this.setState({
                listBoxHeight:
                    document.documentElement.clientHeight - 260 + 'px'
            });
        };
    }
    componentWillUnmount() {
        window.onresize = null;
    }
    routeTo = item => {
        console.log(item);
        // const { history, match } = this.props;
        // history.push({ pathname: `${match.url}/${'searchModel'}` });
    };
    render() {
        let { list } = this.props;
        let { listBoxHeight } = this.state;
        const listItems = list.map((item, index) => {
            return (
                <Item key={index} onClick={() => this.routeTo(item)}>
                    <span className="f14">
                        {item.cm_brand + ' ' + item.cm_factory + ' ' + item.cm_model}
                    </span>
                </Item>
            );
        });
        return (
            <div className="list_box">
                <WingBlank>
                    <List
                        className={style.list_box}
                        style={{ height: listBoxHeight }}
                    >
                        {listItems}
                    </List>
                </WingBlank>
            </div>
        );
    }
}

export default SearchList;
