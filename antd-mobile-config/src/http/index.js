import { get } from './tools';
// import { post } from './tools';
import * as config from './config';

/**
 * 初始化 /api/user/v1.0/info/mine?tenant_id=370763113544693760&brand_id=370763114148673280
 * @arg
 * tenant_id
 * brand_id
 * @return Object
 */
export const getInfoMine = (params = {}) => get(config.info_mine, { tenant_id: params.tenant_id,  brand_id: params.brand_id});

/**
 * 获取品类 /api/user/v1.0/category?tenant_id=392394702372354048&brand_id=392394702976333312
 * @arg
 * tenant_id
 * brand_id
 * @return Object
 */
export const getCategory = (params = {}) => get(config.category, { tenant_id: params.tenant_id,  brand_id: params.brand_id});
