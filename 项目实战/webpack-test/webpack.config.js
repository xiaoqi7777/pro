
let path = require('path')
let cleanWebpackPlugin = require('clean-webpack-plugin')
let Html = require('html-webpack-plugin')
let webpack = require('webpack')
module.exports={
  mode:'development', 
  entry:{
    main:'./src/index.js',
  },
  output:{
    filename:'[name].[hash:8].js',
    path:path.join(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[{
          loader:'babel-loader',
          options:{
            presets:[
              "@babel/preset-env"
            ],
            plugins:['@babel/plugin-syntax-dynamic-import']
          }
        }]
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
        use:[
          'css-loader',
          'postcss-loader'
        ]
        
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
  ]
}