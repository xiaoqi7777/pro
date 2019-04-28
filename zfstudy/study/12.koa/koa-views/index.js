// 服务器渲染的页面ejs

let Koa = require('koa')
let app = new  Koa();
// 专门用来 使用模板引擎的中间件
let views = require('koa-views')

let path = require('path')
console.log(path.join(__dirname,'/koa-views'))
app.use(views(path.join(__dirname,'/koa-views'),{
  map:{//按照ejs的规则来渲染
    html:'ejs'
  }
}))//使用中间件后这个中间件会在上下文上添加一个render方法

app.use(async(ctx)=>{
  // ctx.body = 'xxx'
  await ctx.render('index.html',{name='zxda'}) //这个方法返回的是个promise
})

app.listen(3000,function(){
  console.log('server start +3000')
})