let obj = {
    debug: process.env.NODE_ENV !== 'production',
    carBrandLogoUrl: window.location.protocol + '//carbrandlogo-1251517753.file.myqcloud.com/',
    imgUrl: window.location.protocol + '//sopei001-1251517753.file.myqcloud.com/',
    sopeibrandlogo: window.location.protocol + '//sopeibrandlogo-1251517753.file.myqcloud.com/',
    apiUrl:window.location.origin + '/api/'
};
switch (window.location.hostname) {
    case '192.168.1.250':
    case '192.168.1.133':
    case 'www.tao.com':
    case 'dev.q.sopei.cn':
        obj.appId = 'wxd47a4e2027a28b55';
        break;
    default:
        obj.appId = 'wx26d5d7a9568f7048';
        break;
}

export default obj;
