let obj = {
    debug: process.env.NODE_ENV !== 'production',
    carBrandLogoUrl:
        window.location.protocol +
        '//carbrandlogo-1251517753.file.myqcloud.com/',
    imgUrl:
        window.location.protocol + '//sopei001-1251517753.file.myqcloud.com/',
    sopeibrandlogo:
        window.location.protocol +
        '//sopeibrandlogo-1251517753.file.myqcloud.com/'
};
switch (window.location.hostname) {
    case '192.168.1.250':
    case '192.168.0.133':
    case 'www.tao.com':
    case 'dev.q.sopei.cn':
        obj.apiUrl = 'https://dev.q.sopei.cn/api/';
        obj.registerApi = 'https://dev.q.sopei.cn/api/register/v1.0/';
        obj.loginApi = 'https://dev.q.sopei.cn/api/login/v1.0/';
        obj.queryApi = 'https://dev.q.sopei.cn/api/user/v1.0/';
        obj.appId = 'wxd47a4e2027a28b55';
        break;
    default:
        obj.apiUrl = window.location.origin + '/api/';
        obj.registerApi = window.location.origin + '/api/register/v1.0/';
        obj.loginApi = window.location.origin + '/api/login/v1.0/';
        obj.queryApi = window.location.origin + '/api/user/v1.0/';
        obj.appId = 'wx26d5d7a9568f7048';
        break;
}

export default obj;
