
let Koa = require('./koa2')
let server = new Koa()

server.use((ctx)=>{
  console.log('123')
  //request 和 response 一样
  console.log('1->',ctx.req.url )
  console.log('2->',ctx.request.req.url)
  console.log('3->',ctx.request.url)
  console.log('4->',ctx.url)
  // ctx.body = '23232'
  // ctx.response.body  = '111111'
  // console.log(ctx.body) 
  // console.log(ctx.request.path)//获取路径

  // console.log(ctx.url)//做了一层拦截 当我们在ctx上取值 会去ctx.request上去取值

})

server.listen('3000','localhost',()=>{
  console.log('server start 3000')
})