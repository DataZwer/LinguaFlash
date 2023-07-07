const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,//关闭eslint
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      // 'jquery': path.resolve(__dirname, '../node_modules/jquery/dist/jquery.min'),
      'window.jQuery': 'jquery'
    }])
  },
  //代理跨域
  devServer: {
          proxy: {
               '/api': {
                    target: 'http://127.0.0.1:3008',
               },
               '/my':{
                    target: 'http://127.0.0.1:3008',
               }
          },
     },
})
