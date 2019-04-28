let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    entry:path.join(__dirname,'src/main'),
    output:{
      filename:'bundle.js',
      path:path.join(__dirname,'dist')
    },
    module:{
      rules:[
        {
          test:/\.js$/,
          use:{
            loader:'babel-loader',
            options:{
              presets:['@babel/preset-env'],
              plugins:[]
            }
          },
          // exclude排除文件
          exclude:/node_modules/
        },
        {
          test:/\.css$/,
          use:['vue-style-loader','css-loader']
        },
        {
          test:/\.vue$/,
          use:'vue-loader'
        }
      ]
    },
    plugins:[
      new VueLoaderPlugin(),
      new htmlWebpackPlugin({
        filename:'index.html',
        template:path.resolve(__dirname,'public/index.html')
      })
    ]
}