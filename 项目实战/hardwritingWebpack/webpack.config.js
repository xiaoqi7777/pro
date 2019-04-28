
let path = require('path')
// 插件都是类  作用监听每个钩子上的事件
class P1  {
  apply(compiler){
    compiler.hooks.done.tap('p1',()=>{
      console.log('done')
    })
  }
}
class P2  {
  apply(compiler){
    compiler.hooks.afterCompile.tap('p2',()=>{
      console.log('afterCompile')
    })
  }
}
// function loader1 (source){
//   console.log('1111')
//   return source
// }
// function loader2 (source){
//   console.log('2222')
//   return source
// }

module.exports = {
  mode:'development',
  entry:path.resolve(__dirname,'src/index.js'),
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist')
  },
  resolveLoader:{
    modules:['node_modules',path.resolve(__dirname,'loaders')],
    alias:{
      loader1:path.resolve(__dirname,'loaders','loader1')
    }
  },
  watch:true,
  module:{
    rules:[
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader']
      }
      // {
      //   test:/\.jpeg$/,
      //   // file-loader
      //   // 目的就是根据图片生成一个md5 发射到dist目录下
      //   // file-loader还会返回到当前的图片路径

      //   // url-loader  会处理路径(通过file-loader emitFile将文件发射出来)
      //   use:{
      //     // loader:'file-loader'
      //     loader:'url-loader',
      //     options:{
      //       limit:200*1024
      //     }
      //   },
      // },
      // {
      //   test:/\.js$/,
      //   use:{
      //     loader:'banner-loader',
      //     options:{
      //       presets:{
      //         text:'珠峰',
      //       },
      //       filename:path.resolve(__dirname,'banner.js')
      //     }
      //   }
      // }
      // {
      //   test:/\.js$/,
      //   // loader  就是一个函数, 函数的参数是一个源码
      //   use:{
      //    loader:'loader1'
      //   },
      // },
      // {
      //   test:/\.js$/,
      //   // loader  就是一个函数, 函数的参数是一个源码
      //   use:{
      //    loader:'loader2'
      //   },
      // },
      // {
      //   test:/\.js$/,
      //   // loader  就是一个函数, 函数的参数是一个源码
      //   use:{
      //    loader:'loader3'
      //   },
      // }

    ]
  },
  plugins:[
    // new P1(),
    // new P2()
  ]
}