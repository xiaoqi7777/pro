let Koa = require('koa2');

let app = new Koa();

let session = require('koa-session');
let Router = require('koa-router');
app.use(session({},app));

let router = new Router();
app.keys = ['123']
router.get('/visit',async ctx=>{
  if(ctx.session.visit){
    ctx.body = ctx.session.visit++
  }else{
    ctx.session.visit = 1;
    ctx.body = 'di yi ci fangwen'
  }
})
app.use(router.routes())
app.listen(3000)