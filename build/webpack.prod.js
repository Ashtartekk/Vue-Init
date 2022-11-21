// 生产环境
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const config = require('./webpack.config')

module.exports = merge(config, {
  mode: 'production',
  devtool:'eval-cheap-module-source-map', //代码报错时可以迅速定位出错位置// 只能定位源码位置，不能源码展示，体积较小，适合生产模式
  plugins:[
    //定义全局变量
    new webpack.DefinePlugin({
      process:{
        env:{
          NODE_ENV:JSON.stringify('production'),
          VUE_APP_URL: JSON.stringify('http://ashtartekk.com')
        }
      }
    })
  ]
})