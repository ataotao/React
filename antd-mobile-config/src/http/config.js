/**
 * 接口地址配置文件
 */
import ENV from '../assets/js/env';
const api = ENV.apiUrl;
const user = api + 'user/v1.0/';

//接口地址
export const info_mine = user + 'info/mine';
export const category = user + 'category';

