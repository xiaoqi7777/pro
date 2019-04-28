
let merge = require('webpack-merge');
let base = require('./webpack.base');
let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base,{
  // 打包输出默认是 [name] => main 
  entry:{
    client:path.join(__dirname,'../src/client-entry.js'),
  },
  plugins:[
    new htmlWebpackPlugin({
      filename:'index.html',
      template:path.resolve(__dirname,'../public/index.html'),
      excludeChunks:['client']
    })
  ]
})