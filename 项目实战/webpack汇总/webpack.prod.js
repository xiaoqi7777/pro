
let base = require('./webpack.base.js')

let merge = require('webpack-merge')

module.exports = merge(base,{
  mode:'production',
})

// 自己写的文件 react react-dom react-router-dom
// dll 动态链接库 每次我用的时候 都把他引入  只打包我写的东西
// 上线的时候  体积不变的 开发的打包的速度 应改会有明显的变化