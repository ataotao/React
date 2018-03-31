import React, { Component } from 'react';
import { InputItem, Button, Flex, WhiteSpace, WingBlank, List } from 'antd-mobile';
import { createForm } from 'rc-form';
import style from './SearchInputBar.css';

class SearchInputBar extends Component {
    
    render() {
        console.log(this.props.form);
        const { getFieldProps } = this.props.form;
        return (
        <div>
            <WingBlank>
                    <List>
                        <Flex>
                            <div className={style.item_box_input}>
                                <InputItem 
                                {...getFieldProps('autofocus')} 
                                clear 
                                placeholder="输入车型查询配件，如CRV、杰德" 
                                maxLength="20"  
                                ref={el => (this.autoFocusInst = el)} 
                                className={style.item_input}
                                />
                            </div>
                            <div className={style.item_box_btn}>
                                <Button type="primary" size="large" inline className={style.item_btn}>查询</Button>
                            </div>
                        </Flex>
                    </List>
                    <WhiteSpace size="lg" />
                    
                    
                </WingBlank>
            </div>);
    }
}

export default createForm()(SearchInputBar);