const { version } = require('../package.json');

/**
 * app路由配置
 */
module.exports = (app) => {
    // 获取域名
    let { VITE_H5_URL } = require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` }).parsed;
    // 如果解析失败则降级为生产
    VITE_H5_URL = VITE_H5_URL || 'http://www.vitaminaq.cn';
    // invoice/reapply
    return app.use('/app-config', (req, res) => {
        const originRoutes = [
            /**
             * 选择发票抬头
             */
            {
                code: 10000,
                url: '/invoice/reapply#invoiceId={invoiceId}',
                showTitle: true
            }
        ]
        const routes = originRoutes.map(i => {
            const { url } = i;
            const arr = url.split('#');
            i.url = `${VITE_H5_URL}${arr[0]}${arr[0].match(/\?/g) ? '&' : '?'}v=${version}${arr[1] ? `#${arr[1]}` : ''}`
            return i;
        })
        res.json({
            code: 0,
            data: {
                version,
                routes
            },
            describe: {
                version: '当前h5版本号',
                routes: {
                    code: '路由代号',
                    url: '真实跳转地址，替换掉url中的{}参数占位符，此处还会拓展一些控制参数，待补充',
                    showTitle: 'true | false true: 使用原生导航栏；false：使用h5导航栏'
                }
            }
        })
    });
}