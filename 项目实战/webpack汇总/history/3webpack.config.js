let path = require('path')
let Html = require('html-webpack-plugin')
let clear = require('clean-webpack-plugin')
let webpack = require('webpack')
let Copy = require('copy-webpack-plugin')
module.exports = {
  entry:{
    bundle:'./src/index.js'
  },
  output:{
    filename:'[name].[hash:8].js',
    path:path.resolve(__dirname,'dist')
  },
  // devtool:'source-map', //他会单独创建一个源码映射文件，指定到当前的行和列
  // devtool:'eval-source-map', //源码映射 会把源码映射插到每个文件的后面 体积会变大 不分离
  // devtool:'cheap-module-source-map',//babel 编译后的内容了  cheap不会定位到列数 只有行
  devtool:'cheap-module-eval-source-map',//生产环境不要source-map
  //边更改 边重新打包
  watch:true, //实时监控
  watchOptions:{
    poll:1000,//多少长时间 问一次 毫秒 
    aggregateTimeout:5000,//保存以后 5S不动就会打包 防抖
    ignored:/node_modules/
  },
  devServer:{
    before(app){// der-server 开启之前  app就是express里面的app
        app.get('/api/user',function(req,res){
          res.send({age:19})
        })
    }
    // proxy:{
    //   '/api':{
    //     target:'http://localhost:3000',
    //     pathRewrite:{
    //         '/api':'' ,//前端访问 /api/use  这个操作会变成 /use
    //     }
    //   }
    // }
  },
  resolve:{ //解析 commonjs 查找路径 require
    modules:[path.resolve('node_modules')], //查询文件的位子,//可以配置多个
    extensions:['.js','.json','.css'],//当我们引入的时候 先找什么文件的后缀  可以不写后缀 css等后缀了
    mainFields:['main','browser'],//先找main.js文件   主文件
    mainFiles:['index.js'],//mian找到了,在找index.js 入口文件
    alias:{//别名  使用的时候 直接引入bootstrap 即可
      bootstrap:('bootstrap/dist/css/bootstrap.css')
    }
  },
  module:{
    // 优化哪些不解析
    noParse:/jquery/,//有些文件 不是第三方 就是自己写的js 他没有require 写正则匹配
    rules:[
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:[
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  plugins:[
    new clear('./dist'),// 当 当前dist没有的时候 可能会报错
    new Html({
      template:'./public/index.html'
    }),
    new webpack.BannerPlugin('sg------------------sg'),
    // new Copy([{
    //   from:'./src/ppt',
    //   to:path.resolve(__dirname,'dist/ppt') // 名字为dist 可能拷贝不过去
    // }])
  ]
}
//  webpack-dev-server 内置了express 