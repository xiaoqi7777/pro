let path = require('path');
let VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  mode:"production",  
  output:{
      filename:'[name].bundle.js',
      path:path.join(__dirname,'../dist')
    },
    module:{
      rules:[
        {
          test:/\.js$/,
          use:{
            loader:'babel-loader',
            options:{
              presets:['@babel/preset-env'],
              //动态插件导入 @babel/plugin-syntax-dynamic-import  
              plugins:['@babel/plugin-syntax-dynamic-import']
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

    ]
}