/**
 * http通用工具函数
 */

import axios from 'axios';
// import qs from 'qs';
import { Toast } from 'antd-mobile';
import ENV from '../assets/js/env';

// axios 配置
axios.defaults.timeout = 50000;
axios.defaults.baseURL = ENV.apiUrl;
// 跨域配置
axios.defaults.withCredentials = true;

// 拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    async response => {
        // 开发环境
        if (ENV.debug) {
            console.groupCollapsed('response info');
            console.log('%c request url', 'color: #9E9E9E; font-weight: bold', response.config.url + ' => state:' + response.status
            );
            console.log('%c request params', 'color: #4CAF50; font-weight: bold', response.config.params);
            if (response.config.data) {
                console.log('%c request data', 'color: #ACF9BF; font-weight: bold', response.config.data);
            }
            console.log('%c response data', 'color: #03A9F4; font-weight: bold', response.data);
            console.groupEnd();
        }

        return response;
    },
    error => {
        return Promise.resolve(error.response);
    }
);


function checkStatus(response) {
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response.data;
    }
    // 异常状态下，把错误信息返回去
    return {
        code: -404,
        status: -404,
        msg: '网络异常'
    };
}

function checkCode(res) {
    // 网络错误，服务器错误，后端抛出的错误
    if (res.status === -404) {
        Toast.fail(res.msg, 1);
    }
    return res;
}

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      请求参数
 * @param params    url参数
 */

export const post = (url, data, params = {}) => {
    return axios({
        method: 'post',
        url,
        params,
        //   data: qs.stringify(data)
        data: data
    })
        .then(response => {
            return checkStatus(response);
        })
        .then(res => {
            return checkCode(res);
        });
};

/**
 * 公用get请求
 * @param url       接口地址
 * @param params    接口参数
 */
export const get = (url, params) => {
    return axios({
        method: 'get',
        url,
        params
    })
        .then(response => {
            return checkStatus(response);
        })
        .then(res => {
            return checkCode(res);
        });
};
