
let path = require('path')
// 默认环境变量 NODE_ENV production development
module.exports = {
  //根据环境 设置请求路径
  publicPath:process.env.NODE_ENV === 'production' ? 'http://www.zf.com':'/',
  //打包的资源 集中放到一个独立文件
  assetsDir:'asserts',
  // 输出的目录 默认dist
  outputDir:'./my-dist',
  // 加这个才能使用template(一般都是render)  一般不使用体积会变大 设置false
  runtimeCompiler:true,
  // 打包 不在使用SourceMap 减少体积
  productionSourceMap:false,
  chainWebpack:config=>{
    //  可以获取到webpack的配置 在增加一些自己的功能
    //  配置目录别名 别名叫@   以后引用的@ 就直接代表src目录
    config.resolve.alias.set('@',path.resolve(__dirname,'src')),
    config.resolve.alias.set('_v',path.resolve(__dirname,'src/components'))
  },
  // configureWebpack:{//会自动合并
  //   pluhins:[],
  //   module:{}
  // },
  devServer:{
    //开发 服务时 使用
    proxy:{
      '/api/getUser':{
        target:'http://localhost:3000',
        pathRewrite:{
          //vue中 请求 /api/getUser会找到这儿
          //下面配置 /api不会出现在真是请求路径中
          '/api':''
        }
      }
    }
  },
  // vue add style-resources-loader 会自动注入进来
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname,'src/assets/common.scss')
      ]
    }
  }
}