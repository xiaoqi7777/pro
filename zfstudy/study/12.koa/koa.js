let Koa = require('koa2')
let app = new Koa()

// app.use((ctx,next)=>{
//   // ctx 上有req属性 req属性就是原生的req
//   // ctx 上有request属性 和 response属性 是自己封装的
//   // 我们默认在ctx取值 是在requset封装上 取的
//   //request 和 response 一样
//   console.log(ctx.req.url === ctx.request.req.url)
//   console.log(ctx.url === ctx.request.url)
//   console.log(ctx.request.path)//获取路径

//   console.log(ctx.url)//做了一层拦截 当我们在ctx上取值 会去ctx.request上去取值
// })
// app.use((ctx,next)=>{
//   console.log('1233')
//   //返回给页面的
//   ctx.body = 'c'
//   next()
//   ctx.body = 'd'
// })

app.use((ctx,next) => {
  console.log('1');
  // next();
  console.log('2');
});
app.use((ctx,next) => {
  console.log('3');
 next();
  console.log('4');
});
app.listen('3000',()=>{
  console.log('123')
})