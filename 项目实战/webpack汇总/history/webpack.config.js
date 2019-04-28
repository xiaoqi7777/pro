let path = require('path')
let Html = require('html-webpack-plugin')
let MineCss =  require('mini-css-extract-plugin')
let UgligyJs = require('uglifyjs-webpack-plugin')
let Optimize = require('optimize-css-assets-webpack-plugin')
let webpack = require('webpack')
module.exports = {
  // css 压缩需要手动配置优化项
  optimization:{
    minimizer:[
      //必须mode 是production才会执行这个选项
      new UgligyJs({
        cache:true,
        parallel:true
      }),
      new Optimize({})
    ]
  },
  
  //开发模式 不会压缩
  //生产模式 会自动压缩(默认)
  // mode:'production',
  entry:{
    main:'./src/inedx.js',
    // 多入口
    // other:'./src/other.js'
  },
  output:{
    // filename:'bundle.js'
    filename:'[name].[hash:8].js',
    // .[hash:8] 文件更改的时候 打包的时候 hash 会变化 
    // 必须是绝对路径
    path:path.resolve(__dirname,'dist')
  },
  devtool:'source-map',
  module:{
    rules:[
      {//给每个模块注入一个变量

      },
      // {
      //   test:require.resolve('jquery'),
      //   use:{
      //     loader:'expose-loader?$',
      //   }
      // },
      {
        test:/\.html/,
        use:'html-withimg-loader'
      },
      {
        test:/\.(png|gif|jpg)/,
        //url-loader 会调用file-loader
        // use:'file-loader'//图片进行拷贝操作
        use:{
          loader:'url-loader',
          options:{
            limit:1*4 //超过100k会被转化成图片 转化图片 会调用file-loader
          }
        }
      },
      //代码规范的问题eslint eslint-loader
      // {
      //   test:/\.js$/,
      //   use:'eslint-loader',
      //   exclude:/node_modules/,//排除不需要的
      //   // 配置 在前面执行  或者 集中用数组[babel-loader,eslint-loader]
      //   enforce:'pre',
      // },
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:[
              '@babel/preset-env',
              "@babel/preset-react"
            ]
          }
          //在外面写了配置文件 就不用写options 两个一样的功能
        }
      },
      {
        test:/\.css$/,
        // use 可以放字符串 数组 对象 执行有顺序 从后往前
        // 传参数可以是对象 也可以?传参数
        // 抽取样式到link标签中 mini-css-extract-plugin 取代style-loader
        use:[
          MineCss.loader          
          //{
          // loader:'style-loader',
          // Options:{
          //   //更改插入的位子,默认最后面
          //   insertAt:'top'
          // }
          //}
        ,'css-loader','postcss-loader']
      },
      
    ]
  },
  plugins:[
    new Html({
      template:'./public/index.html',
      filename:'index.html',
      //指定 哪个入口文件
      chunks:['main']
    }),
    // 生产多个html
    // new Html({
    //   template:'./public/index.html',
    //   filename:'index111.html',
    //   chunks:['other']
    // }) 
    new MineCss({
      //抽离 link 标签取名
      filename:'css/main.css'
    }),
    new webpack.ProvidePlugin({
      '$':'jquery'
    })
  ]
}