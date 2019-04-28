let express = require('express')
let middle = require('webpack-dev-middleware')
let app = express();

// 在服务端导入webpack 下面配置 webpack-dev-middleware使用  
// 此时webpack 由node开启 前面不用开服务 前端可以直接访问3000
let webpack = require('webpack')
let config = require('./webpack.config.js');
let compiler = webpack(config)
app.use(middle(compiler))


app.get('/use',function(req,res){
  res.json({name:'zfpx'})
})

app.listen(3000)