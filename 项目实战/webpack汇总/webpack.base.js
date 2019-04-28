let path = require('path')
let Html = require('html-webpack-plugin')
let webpack = require('webpack')
module.exports = {
  entry:{
    bundle:'./src/index.js'
  },
  output:{
    filename:'[name].[hash:8].js',
    path:path.resolve(__dirname,'dist')
  },

  module:{
    rules:[
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:[
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  plugins:[
    new Html({
      template:'./public/index.html'
    }),
    new webpack.DefinePlugin({ //定义环境变量
      PRODUCTION:JSON.stringify("dev")
      // 最后获取到的都会取消一个引号  所以用JSON.stringify在套一个引号  变成 console.log("dev")
      // 当前环境 PRODUCTION 的值就是dev

    })
  ]
}
//  webpack-dev-server 内置了express 