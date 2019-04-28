let express = require('express');
let app = express();
let fs = require('fs')
let path = require('path')
let VueServerRenderer = require('vue-server-renderer')


let serverBundle = fs.readFileSync(path.join(__dirname,'dist/server.bundle.js'),'utf8')
let template = fs.readFileSync(path.join(__dirname,'dist/index.ssr.html'),'utf8')
let render = VueServerRenderer.createBundleRenderer(serverBundle,{
  template
})


app.get('/',(req,res)=>{
  // 把渲染好的字符串仍给客户端
  // 只是返回一个字符串 并没有vue实际功能
  render.renderToString((err,html)=>{
        res.send(html)
      });
})
// 顺序要保证
app.use(express.static(path.join(__dirname,'dist')))

app.listen(3000)