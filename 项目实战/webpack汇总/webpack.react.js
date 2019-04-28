
let path = require('path');
let Dllplugin = require('webpack/lib/Dllplugin');//内置的
module.exports = {
  entry:{
    react:['react','react-dom']
  },
  output:{
    filename:'_dll_[name].js',//打包后文件的名字
    path:path.resolve(__dirname,'dist'),
    libraryTarget:'var', // 不会挂到 var  会是exports[a] = function(){}()
                              // 如果是commonjs 会是 var a  = function(){}()
                              // 如果是commonjs2  会是module.exports = function(){}()
                              // 如果是this   就是this[a] = function(){}()
                              // global 默认是window[a] = function(){}()
                              // var 是 var a  = function(){}()
    library:'_dll_[name]', //生成后是一个闭包 这个配置 效果是 var a = 闭包
  },
  plugins:[
    new Dllplugin({
      name:'_dll_[name]',//产生出去的是一个JSON 文件
      path:path.resolve(__dirname,'dist','mainfile.json')
    })
  ]
}