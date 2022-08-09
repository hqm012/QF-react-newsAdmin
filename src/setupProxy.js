const proxy = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
        //新版是proxy.createProxyMiddleware 
        proxy.createProxyMiddleware('/api1', { target: 'http://localhost:5000', changeOrigin: true, pathRewrite: { '^/api1': '' } }))
}