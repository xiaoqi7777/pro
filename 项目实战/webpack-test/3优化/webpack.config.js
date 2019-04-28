
let path = require('path')
let cleanWebpackPlugin = require('clean-webpack-plugin')
let Html = require('html-webpack-plugin')
let MineCss = require('mini-css-extract-plugin')
let Copy = require('copy-webpack-plugin')
let webpack = require('webpack')
let Happypack = require('happypack')
module.exports={
  mode:'production', 
  entry:{
    main:'./src/index.js',
    other:'./src/other.js'
    
  },
  output:{
    filename:'[name].[hash:8].js',
    path:path.join(__dirname,'dist')
  },
  optimization:{ 
    splitChunks:{//入口中有公共的抽离,entry里面的多个入口文件
      cacheGroups:{
        common:{
          name:'xx',//可选
          chunks:'initial',//入口中有公共的抽离,entry里面的多个入口文件
          minSize:0, // 只要有字节是公用的 我就抽离出来
          minChunks:2, // 最少引用多少次才可以被提出来
        }
      }
    }
  },
  resolve:{//解析 commonjs 查找路径 require
    modules:[path.resolve('node_modules')],
    extensions:['.js','.css','.json'],
    mainFields:['main','browser'],
    mainFiles:['index.js'],
    alias:{//第三方库的别名,使用的时候 直接引入bootstrap 
      bootstrap:('bootstrap/dist/css/bootstrap.css')
    }
  },
  devtool:'source-map',
  watch:true, //实时监控
  watchOptions:{
    poll:1000,//多少长时间 问一次 毫秒 
    aggregateTimeout:5000,//保存以后 5S不动就会打包 防抖
    ignored:/node_modules/
  },
  devServer:{
      proxy:{
        '/api':{
          target:'http://localhost:3000',
          pathRewrite:{
              '/api':'' ,//前端访问 /api/use  这个操作会变成 /use
          }
        }
      }
    // before(app){
    //   app.get('/api/user',function(req,res){
    //     res.send({age:9})
    //   })
    // }
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:'happypack/loader?id=js'
      },
      {
        test:/\.(png|gif|jpg)/,
        use:{
          loader:'url-loader',
          options:{
            limit:1*1024
          }
        }
      },
      {
        test:/\.css$/,
        use:'happypack/loader?id=css'
        
      }
    ]
  },
  plugins:[
    new cleanWebpackPlugin(['dist']),
    new Html({
      template:'./public/index.html',
      filename:'index.html',
      chunks:['name'].js
    }),
    new MineCss({
      //抽离样式 用Link 引入 需要起名字
      filename:'main.css'
    }),
    //原封不动的copy
    new Copy([{
      from:'./src/1.jpg',
      to:path.resolve(__dirname,'dist')
    }]),
    new webpack.BannerPlugin('------------1-----1-1-1-1'),
    new webpack.DefinePlugin({//定义环境变量
      // PRODUCTION:'true',//会取 ' ' 里面的值
      PRODUCTION:JSON.stringify('div'),
      FLAG:'true',
      EXPRESSION:JSON.stringify(1+1),
    }),
    new webpack.IgnorePlugin(/\.\/locale/,/moment/),
    //多线程打包 use必须是一个数组 
    new Happypack({
      id:'js',
      use:[{
        loader:'babel-loader',
        options:{
          presets:[
            "@babel/preset-env",
            "@babel/preset-react"
          ]
        }
      }]
    }),
    new Happypack({
      id:'css',
      use:[
        MineCss.loader,
        'css-loader',
        'postcss-loader'
      ]
    })
  ]
}