const path = require('path')
const WebpackBar = require('webpackbar')
const { VueLoaderPlugin } = require('vue-loader') //vue的加载器
const HtmlWebpackPlugin = require('html-webpack-plugin') //打包html的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //该插件的主要是为了抽离 css 样式,防止将样式打包在 js 中文件过大和因为文件大网络请求超时的情况

module.exports = {
    mode:'development', //开发模式
    entry:'./src/main.js', //从哪个文件开始去分析，入口文件
    output:{ //output是配置打包后的文件放在哪个文件夹
        path:path.resolve(__dirname , '../dist'), //定义放在哪个文件夹 这个__dirname相当于pwd当前目录 //path模块内置的resolve方法拼接完整目录
        filename:'js/bundle.js' //定义叫什么名字
    },
    module:{ //任何模块
        rules:[ //匹配规则 
            { test:/\.vue$/,use:'vue-loader' }, //webpack里loader的作用就是代码转译
            { test:/\.(css|s[cs]ss)$/,use:[ //loader顺序是从右到左
                MiniCssExtractPlugin.loader, //配置了这个不要配置'style-loader'不然打包的时候会报错
                'css-loader',
                'sass-loader',
            ] },
            { test:/\.m?js$/,//匹配后缀为js的文件
            exclude: /node_modules/, //排除node_modules中的js
            use:{
                loader:'babel-loader',
            }},
            // { test:/\.(png|jpe?g|gif|svg|webp)$/,use:{loader:'file-loader',options:{esModule:false}} } //老语法
            { test:/\.(png|jpe?g|gif|svg|webp)$/,type:'asset/resource',
            parser:{
                //转base64条件
                dataUrlCondition:{ maxSize:25*1024,} //25kb
            },
            generator:{
                //打包到dist/image 文件下
                filename: 'images/[contenthash][ext][query]',
            }
        }, //webpack5写法
        ]
    },
    plugins:[//插件的作用就是增强webpack的功能 写什么功能就会增强webpack的什么功能
       new HtmlWebpackPlugin({
        template:'./index.html', //选择模板
        inject:'body' //js文件是否自动引入到body
       }),
       new MiniCssExtractPlugin({
        filename:'styles/chunk-[contenthash].css', //将文件都输出到dist下的styles文件夹下
        ignoreOrder:true
       }),
       new WebpackBar({
        color:'#85d',//进度条颜色
        basic:false, //日志报告器
        profile:false //探查器
       }),
       new VueLoaderPlugin()
    ],
    resolve:{
        //路径别名
        alias:{
            '@':path.resolve('./src'), //pwd当前目录下的src等于@
            assets: '~/assets',
            tools:'~/tools'
        },
        //引入文件时省略后缀
        extensions:['.js','.ts','.scss','vue']
    }

}