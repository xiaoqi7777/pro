let express = require('express');
let app = express();
let fs = require('fs')
let path = require('path')

let Vue = require('vue')
// vue提供的服务端渲染的包
let VueServerRenderer = require('vue-server-renderer')
//  创建vue实例
let vm = new Vue({
  template:'<div>hello word</div>'
})

let template = fs.readFileSync(path.join(__dirname,'index.html'),'utf8')
// 创建渲染函数
let render = VueServerRenderer.createRenderer({
  template  
});


app.get('/',(req,res)=>{
  // 返回的是promise坑多 一般写回调
  render.renderToString(vm,function(err,html){
      res.send(html)
  })
})

app.listen(3000)