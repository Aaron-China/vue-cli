const path = require('path')
const webpack = require('webpack')
function resolve (dir) {
    return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
    configureWebpack: {
        plugins: [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ]
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, "src/app.less")] // 引入全局样式变量
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@assets', resolve('src/assets'))
            .set('@layouts', resolve('src/layouts'))
            .set('@static', resolve('src/static'))
            .set('@components', resolve('src/components'))
            .set('@router', resolve('src/router'))
            .set('@utils', resolve('src/utils'))
            .set('@store', resolve('src/store'))
            .set('@views', resolve('src/views'))
    },
    // 服务转发
    devServer: {
        port: 8001,
        proxy: {
            '/WebSocketConfig/': {
                target: 'ws://test.com', 
                changeOrigin: true,
                ws: true,    // 开启sockjs
            },
            '/api/': {
                target: 'http://test.com', 
                changeOrigin: true,
                ws: false,    // 关闭sockjs
            },
        },
    },

    // disable source map in production
    productionSourceMap: false,
    lintOnSave: false,
    // babel-loader no-ignore node_modules/*
    transpileDependencies: []
}
