import { receiveData, fetchData } from './index';
import { bindActionCreators } from 'redux';

export const mapStateToProps = state => {
    return {httpData : state.httpData};
};
// bindActionCreators() 可以自动把多个 action 创建函数 绑定到 dispatch() 方法上。
export const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch),
    fetchData: bindActionCreators(fetchData, dispatch)
});