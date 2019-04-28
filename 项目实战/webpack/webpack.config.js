
path = require('path')
let HTMLWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UgligyJs = require('uglifyjs-webpack-plugin')
let webpack = require('webpack')
let CleanWebpackPlugin =  require('clean-webpack-plugin')
module.exports = {
  optimization:{//优化
    minimizer:[
      new OptimizeCss(), //压缩css
      new UgligyJs({
        cache:true,
        parallel:true,
        sourceMap:true
      }),//压缩js js需要babel处理不然会报异常
    ]
  },
  devServer:{// 开发服务器的配置 默认8080
    hot:true,//启动热更新
    port:3000,
    progress:true,
    contentBase:'./dist',
    compress:true//压缩
  },
  watch:true,
  mode:"development",//模式 production development
  entry:{
    //ss 入口的名字
    ss:path.join(__dirname,'src/index.js')
  },//入口
  output:{
    //打包后的文件名 [name]指向 entry的ss 若只有路径 默认是main [hash:8] 后面会带一串字符 :8 长度是8  
    filename:'[name].[hash:8].js',
    path:path.join(__dirname,'dist'),//路径必须是一个绝对路径
    libraryTarget:'var',
  },
  plugins:[
    new CleanWebpackPlugin(),    
    //数组放着所有的webpack插件
    new HTMLWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html',
      minify:{
        removeAttributeQuotes:true,// 删除html ""
        collapseWhitespace:true,// 生成一行
      },
      hash:true,//引入的文件生成hash
    }),
    new webpack.HotModuleReplacementPlugin(),//热更新插件
    new webpack.NamedModulesPlugin(),//打印更新的模块路径

  ],
  module:{
    // 模块
    rules:[//规则 顺序默认从右向左执行,从下向上
      
      {
        test:/\.js$/,//默认查找所有的js
        use:{
          loader:'babel-loader',
          options:{// 用babel-loader 需要把es6->es5
            presets:['@babel/preset-env'],// 这个是大插件的集合
            plugins:[// 可选
              ["@babel/plugin-proposal-decorators",{"legacy":true}],//处理装饰器
              ['@babel/plugin-proposal-class-properties',{"loose":true}],//处理class
              "@babel/plugin-transform-runtime",
              "@babel/plugin-syntax-dynamic-import"
            ]

          }
        },
        //包含
        include:path.join(__dirname,'src'),
        //排除
        exclude:/node_modules/,
      },
      {
        // css-loader 主要解析 @import这类语法的
        // style-loader 他是把css  插入到head的标签底部
        // loader用法  一个用字符串 多个用[],顺序默认从右向左执行,从下向上
        //             还可以写成对象
        test:/\.css$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      }
    ]
  },
}

/*
  抽离css插件 yarn add mini-css-extract-plugin -D
 
  增加前缀 yarn add postcss-loader autoprefixer
    创建一个postcss.config.js
    
  压缩css optimize-css-assets-webpack-plugin

  处理js
  yarn add babel-loader @babel/core @babel/preset-env
  babel-loader 将语法转换
  @babel/core 核心模块
  @babel/preset-env 将高级的语法转换成 低级
  @babel/plugin-proposal-class-properties 处理es7 
   class A{
     a =1 
   }
  // 下面两个是一起的
  yarn add  @babel/plugin-transform-runtime -D //处理 generator
  yarn add @babel/runtime //生成依赖 

  yarn add @babel/polyfill  //生成依赖  处理实例上的方法 'xx'.includes('a')
  
  yarn add eslint eslint-loader -D


  引入第三方模块 cnpm i -S jquery
  1、 expose-loader 暴露到window上
    cnpm i -D expose-loader
    rules:[
      {
        test:require.resolve('jquery'),
        use:'expose-loader?$'
      }
    ]

  2、  webpack 插件的ProvidePlugin属性
      new webpack.ProvidePlugin({
        //提供插件 在每个模块中都注入$
        $:'jquery'
      })
  3、cnd引入 不打包jquery
    externals:{
      jquery:"$"
    }      
  可以在window.$ 直接访问到(window.$)

  图片处理
  1、在js中创建图片来引入
  2、在css引入 backgroud('url')
  3、<img src='' alt=''/>
  
  file-loader 默认会在内部生成一张图片 到build目录下  把生成的图片名字返回回来 这个一般不用 一般用url-loader
  
  html-withimg-loader 处理html里面引入的

  url-loader 

  分类打包


  */   