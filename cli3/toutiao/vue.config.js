module.exports = {
    devServer: {
        proxy: {
            '/search': {
                target: 'http://ttapi.research.itcast.cn',
                ws: true,//是否代理websockets
                changeOrigin: true   // 设置同源  默认false，是否需要改变原始主机头为目标URL
            }
        }
    }
};