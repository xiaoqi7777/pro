/*
  1、初始化项目  npm init
     npm install
      webpack 
      webpack-cli
      webpack-dev-server
      html-webpack-plugin
      css-loader 处理路径 @import url()
      style-loader 把css插入到页面中 默认插到最后
      mini-css-extract-plugin 抽离了css 变成link 取代style-loader
        用法三部
          1引入 2实例 3在loader里面写 实例对象.loader 

      optimize-css-assets-webpack-plugin css压缩插件
      uglifyjs-webpack-plugin js优化插件
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


      postcss-loader 运行他需要一个配置文件 (跟babel一样)
      autoprefixer

      @babel/core babel-loader @babel/preset-env
      
      
      @babel/plugin-transform-runtime
      @babel/runtime 项目依赖 //这两个都是用来之前 promise等高级语法的
                             // generator 还可以处理重复的代码 减少体积

      babel-polyfill 项目依赖 补丁 处理实例上的 es7等语法 

      eslint-loader
      eslint  js检测

      file-loader 对图进行处理 

      html-withimg-loader 将我们写的 ../img 等引入图片进行处理
      url-loader  会调用file-loader  

      expose-loader 暴露
     直接运行 npx webpack 或者 配置脚本 
      build:'webpack'
     
  2、配置文件 名字webpack.config.js(固定的)
  3、eslint配置 https://eslint.org/
     下载的文件 要在前面加.

  用法  node不支持es6 只能用module.exports
    module.exports = {
      mode:'production',             // 设置环境 production/devlopment
      // 优化项
      optimization:{ //默认是有的js优化 可以不写 如果要写下面的配置要跟上否在js就不压缩了
        splitChunks:{//入口中有公共的抽离,entry里面的多个入口文件
          cacheGroups:{
            // 自己写的就common
            common:{
              name:'xx',//可选
              chunks:'initial',//入口中有公共的抽离,entry里面的多个入口文件
              minSize:0, // 只要有字节是公用的 我就抽离出来
              minChunks:2, // 最少引用多少次才可以被提出来
            },
            // 第三方模块写 vendor, 一般先抽离第三方在抽离自己写的
            vendor:{
              priority:1,//优先级比common高
              test:/node_modules/, // 标识 处理所有的第三方模块
              chunks:'initial',//入口中有公共的抽离,entry里面的多个入口文件
              minSize:0, // 只要有字节是公用的 我就抽离出来
              minChunks:2, // 最少引用多少次才可以被提出来
           
            }
          }
        }
        minimizer:[ 
          //必须mode 是production才会执行这个选项 
          // 优化js
          new UgligyJs({
            cache:true,
            parallel:true
          }),
          // 优化css
          new Optimize({})
        ]
      },
      // 入口
      entry:{                        
        main:'./src/index.js'           //多个入口就在下面接着写 一般只写一个
      },
      // 出口
      output:{                       
        filename:'[name].[hash:8].js'     //filename定义出口文件名字[name]就是不同入口的名字,也可以取固定的
                                        //加.hash:8 就是生成的文件名字 带一串hash值
        path:path.resolve(__dirname,'dist') // path放到那个位子

        libraryTarget:'var', // 不会挂到 var  会是exports[a] = function(){}()
                                  // 如果是commonjs 会是 var a  = function(){}()
                                  // 如果是commonjs2  会是module.exports = function(){}()
                                  // 如果是this   就是this[a] = function(){}()
                                  // global 默认是window[a] = function(){}()
                                  // var 是 var a  = function(){}()
        library:'_dll_[name]', //生成后是一个闭包 这个配置 效果是 var a = 闭包

      },
      // loader 处理
      module:{
         // 优化哪些不解析
        noParse:/jquery/,//有些文件 不是第三方 就是自己写的js 他没有require 写正则匹配
        exclude:/node_modules/, //忽略掉node_modules
        include:path.resolve('src'), //在src下找
        rules:[                         //所有的loader都在rules下处理
          { //对象
            test:/\.(png|gif|jpg)/,     // test 查找文件
            use:{                       // use 用loader做处理 有三种写法 字符串 数组 对象
              loader:'url-loader'       
              options:{                 
                limit:10*1024
              }
            }
          },
          { //字符串
            test:/\.js$/,
            use:'babel-loader',  //在外面写了配置文件 就不用写options 两个一样的功能
            options:{
              presets:[
                "@babel/preset-env",
                "@babel/preset-react",//解析react
              ]
            }
          },
          {
            test:/\.css$/,
            use:['css-loader','postcss-loader']
          }
        ]
      }
      plugins:[                                   //插件 都是要new的
        new Html({                                //这个是指定html模板
              template:'./public/index.html',     template模板
              filename:'index.html',              filename输出的名字
              //指定 哪个入口文件
              chunks:['main'].js                     chunks指定入口文件 
        })
      ]

    }
  4、源码映射
    source-map 源码映射 把当前源代码和打包后的代码   做一个映射
    在生产环境中，进行调试 前端监控
    devtool:'source-map' //他会单独创建一个源码映射文件，指定到当前的行和列
  5、边更改 边重新打包
    watch:true, //实时监控
    watchOptions:{
      poll:1000,//多少长时间 问一次 毫秒 
      aggregateTimeout:5000,//保存以后 5S不动就会打包 防抖
      ignored:/node_modules/
    },
  6、插件
    cleanWebpackPlugin = require('clean-webpack-plugin') 把以前的删除了
    new cleanWebpackPlugin(['dist'])
    
    let webpack = require('webpack')
    new webpack.BannerPlugin('------------1-----1-1-1-1')增加版权声明

    new webpack.DefinePlugin({//定义环境变量
      // PRODUCTION:'true',//会取 ' ' 里面的值 一般都加JSON.stringify 
      PRODUCTION:JSON.stringify('div')
    })
 
    webpack-dev-middleware 在服务器上用的一个中间件 在后台开启webpack 前端不用
    
    Copy = require('copy-webpack-plugin') 把文件 原封不动的 拷贝走
      new Copy([{
        from:'./src/ppt',
        to:path.resolve(__dirname,'dist/ppt') // 名字为dist 可能拷贝不过去
      }])
    动态连接库:在发开发模式的时候 先把大体积文件打包好

    将文件打包一次 后  直接引入 不用每次打包
      Dllplugin = require('webpack/lib/Dllplugin') 
        new Dllplugin({ //要跟 output library参数对应上
          name:'_dll_[name]',//产生出去的是一个JSON 文件
          path:path.resolve(__dirname,'dist','mainfile.json')
        })
    引用
      但是需要在index.html 里面手动引入(他会取查找,不会自动引入)
      ReferencePlugin = require('webpack/lib/DllReferencePlugin')
      new ReferencePlugin({
        manifest:path.resolve(__dirname,'dist','mainfile.json')
      }),

    处理 可以约定那个包不引入，可以自己采取引用那个包
    new webpack.IgnorePlugin(/\.\/locale/,/moment/)
    
    css压缩插件
    let UgligyJs = require('uglifyjs-webpack-plugin')
    let Optimize = require('optimize-css-assets-webpack-plugin')
         uglifyjs-webpack-plugin js优化插件
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

    多线程打包
    let Happypack = require('happypack')
    原来的 rules 下的use 更改写法 id与下面对应,多个的时候 同理 
      {
        test:/\.js$/,
        use:'happypack/loader?id=js'
      },
    在插件中注册
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
    
  7、在webpack这一层来解决跨域
    代理 
    devServer:{
      proxy:{
        '/api':{
          target:'http://localhost:3000',
          pathRewrite:{
              '/api':'' ,//前端访问 /api/use  这个操作会变成 /use
          }
        }
      }
    },
    before(app){// der-server 开启之前  app就是express里面的app 自己请求模拟的数据
        app.get('/api/user',function(req,res){
          res.send({age:19})
        })
    }
  8、resolve:
    { //解析 commonjs 查找路径 require
      modules :[path.resolve('node_modules')], //查询文件的位子
      extensions:['.js','.json','.css'],//当我们引入的时候 先找什么文件的后缀  可以不写后缀 css等后缀了
      mainFields:['main','browser'],//先找main.js文件   主文件
      mainFiles:['index.js'],//mian找到了,在找index.js 入口文件
      alias:{//别名  使用的时候 直接引入bootstrap 即可
        bootstrap:('bootstrap/dist/css/bootstrap.css')
      }
    },
  9、webpack-merge 合并文件
    一般脚手架 创建webpack.base.js  webpack.prod.js webpack.config.js
    通过webpack-merge 合并代码
    let base = require('./webpack.base.js')

    let merge = require('webpack-merge')

    module.exports = merge(base,{
      mode:'development',
      devtool:'source-map'
    })
  10、合并后执行文件 默认是执行webpack.config.js
    npm run build -- --config webpack.dev.js 前面--的意思是 后面是参数
        --mode development     
  11、动态懒加载 打包的时候 会多出来一个js  原理用的jsonp  callback为了实现代码块的加载 
    @babel/plugin-syntax-dynamic-import
    在babel 中配置
        use:[{
          loader:'babel-loader',
          options:{
            presets:[
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            plugins:['@babel/plugin-syntax-dynamic-import']
          }
        }]
   
  11、配置脚本
    scripts:{
      "dev":"webpack-dev-server",
      "build":"webpack" 
    }


  优化策略
  1、dllPlugin 动态连接库,将公共大型代码提前打包好,动态进入
  2、exclude include 查找的时候 包含 和 忽略
  3、IgnorePlugin 可以约定那个包不引入，可以自己采取引用那个包
  4、多线程打包 进程里包括了一条主线程 node中可以开子进程
     happypack 默认开启4个线程
  5、tree shaking 必须采用import 语法 es6
     在引入的时候 将没用的代码抹掉 
      生产模式 有效 发开模式无效
     import  是静态导入
     require 是动态导入
    前端不要使用require 语法 可能会导致代码是多余的 
  6、提取公共代码的插件 配置优化项 splitChunks



*/