import * as type from './type';
import * as http from '../http';

// 两个对象对比是否内容一致
const isObjectValueEqual = (a, b) => {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    if (aProps.length !== bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}

// 数据请求动作
const requestData = (category, params) => ({
    type: type.REQUEST_DATA,
    category,
    params: params
});

// 数据接收动作
export const receiveData = (res, category, params) => {
    return {
        type: type.RECEIVE_DATA,
        res,
        category,
        params: params
    }
};

/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */
export const fetchData = ({funcName, params, stateName}) => (dispatch, getState) => {
    !stateName && (stateName = funcName);
    // 对比请求参数是否相同
    let states = getState()['httpData'];
    let isEqual = states[stateName] && isObjectValueEqual(params, states[stateName].params);
    if(isEqual) {
        // 返回缓存数据
        dispatch(receiveData(states[stateName], stateName, params));
    }else{
        // 返回加载状态
        dispatch(requestData(stateName, params));
        return http[funcName](params).then(res => {
            // 返回异步数据
            dispatch(receiveData(res, stateName, params));
        });
    }
};