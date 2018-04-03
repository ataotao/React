import React, { Component } from 'react';
import { InputItem, Button, Flex, WhiteSpace, List } from 'antd-mobile';
import style from './SearchInputBar.css';

class SearchInputBar extends Component {
    state = {
        value: this.props.config.value
    }
    componentDidMount() {
        
    }

    handleChange = value => {
        this.setState({value});
        this.props.onChange(value);
    }

    render() {
        let { config } = this.props;
        let { maxLength, placeholder, hasError } = config;
        return (
            <div>
                <List>
                    <Flex>
                        <div className={style.item_box_input}>
                            <InputItem clear maxLength={maxLength} 
                                placeholder={placeholder}                                    
                                className={style.item_input}
                                onChange={this.handleChange} 
                                value={this.state.value} 
                            />
                        </div>
                        <div className={style.item_box_btn}>
                            <Button type="primary" size="large" inline className={style.item_btn} disabled={hasError}>查询</Button>
                        </div>
                    </Flex>
                </List>
                <WhiteSpace />
            </div>
        );
    }
}

export default SearchInputBar;