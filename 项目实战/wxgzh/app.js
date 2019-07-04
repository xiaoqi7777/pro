const  Koa = require('koa')
const Router = require('koa-router');
const cors = require('./router/cors')
const path = require('path')
const bodyparser = require('koa-bodyparser')  
const static = require('koa-static')

const router = new Router();
const app = new Koa()


var  routerIndex = require('./router/index')
var  routerWxPlay = require('./router/wxplay')
//跨域配置
app.use(cors)
// post 提交处理
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

// 静态文件处理
app.use(static(
  path.join( __dirname,  '/dist')
))

app.use(router.routes(),router.allowedMethods())
app.listen(3000,()=>{
  console.log('跑起来了')
})
