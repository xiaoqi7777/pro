let Koa = require('koa2')
let crypto = require('crypto')
let app = new Koa()

let Router = require('koa-router')
let router= new Router()
router.get('/read',async(ctx)=>{
  console.log(ctx.cookies.get('name'))
  console.log(ctx.cookies.get('name.sig'))
  
  ctx.body = ctx.cookies.get('name',{
    signed:true
  }) || 'cookie not found'
})
app.keys = ['hello']
//带签名的cookie,防止客服端篡改
router.get('/write',async(ctx)=>{
  //cookie signed 加载算法
  // 通过cookie 和 app.keys 进行加盐算法 
  let r = crypto.createHmac('sha1','hello').update('name=zfpx').digest('base64')
  console.log(r)
  // 签名 缓存的概念
  // name = zfpx  通过 'hello' 进行加盐签名 =>ubOdpxPy2BJpv-Lx9YQlnlWaE6k
  ctx.cookies.set('name','zfpx',{
    expires:new Date(Date.now()+1000*100),//10秒过期
    signed:true,// 签名 密钥 需要设置app.keys 
  })
  // 前端会生产2个cookie 一个没签名的 一个签名后的
  ctx.body = 'write ok'
})
app.use(router.routes())
app.listen(3000)