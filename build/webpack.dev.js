// 开发环境
const { merge } = require('webpack-merge')
const config = require('./webpack.config')
const webpack = require('webpack')
module.exports = merge(config, {
  mode: 'development',
  devtool:'nosources-source-map', //代码报错时可以迅速定位出错位置// 能具体定位到源码位置和源码展示，适合开发模式，体积较小
  devServer: {
    port:3000, //客户端端口
    open: false, //自动打开浏览器
    hot: true, //是否开启热更新
  },
  plugins:[
    //定义全局变量
    new webpack.DefinePlugin({
      process:{
        env:{
          NODE_ENV:JSON.stringify('development'),
          VUE_APP_URL: JSON.stringify('http://ashtartekk.com')
        }
      }
    })
  ]
})