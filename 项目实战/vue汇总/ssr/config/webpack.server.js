
let merge = require('webpack-merge');
let base = require('./webpack.base');
let htmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');

module.exports = merge(base,{
  target:'node',//打包除的结果给node用
  entry:{
    server:path.join(__dirname,'../src/server-entry.js')
  },
  // 默认输出是 闭包函数 不需要引用 前端直接用的
  //  librarTarget:'conmonjs2' 就是nod用的 module.expots  = server.entry.js
  output:{
    libraryTarget:'commonjs2'
  },
  plugins:[
    // 把public目录下index.ssr的内容拷贝到 dist目录
    new htmlWebpackPlugin({
      filename:"index.ssr.html",
      template:path.resolve(__dirname,'../public/index.ssr.html'),
      // 排除server模块 生成的index.html 不会引入 server  这个的server对应entry里面的server
      excludeChunks:['server']
    })
  ]
})