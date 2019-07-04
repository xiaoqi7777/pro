
let path = require('path')
let DonePlugin = require('./plugins/DonePlugin.js')
let AsyncPlugin = require('./plugins/AsyncPlugin.js')
let FileListPlugin = require('./plugins/FileListPlugin')
// 插件都是类  作用监听每个钩子上的事件
let html = require('html-webpack-plugin')
let UploadPlugin = require('./plugins/UploadPlugin')
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
      // {
      //   test:/\.less$/,
      //   use:['style-loader','css-loader','less-loader']
      // }
    ]
  },
  plugins:[
    // new DonePlugin(),
    // new AsyncPlugin(),
    new html({
      template:'./src/index.html',
    }),
    new FileListPlugin({
      filename:'list.md'
    }),
    new UploadPlugin({
      bucket:'',// 上传到那个空间
      domain:'',// 内容管理 => 上传哪个域名
      accesskey:'',// 个人中心 => ak
      secretkey:'',// 个人中心 => sk
    })

    // new P1(),
    // new P2()
  ]
}