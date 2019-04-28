module.exports = (options,app) => {
  return async function(ctx,next) {
    const source = ctx.get('user-agent')||'';
    const matched = options.ua.some(ua => ua.test(source))
    if(matched){
      ctx.status = 304;
      ctx.body = '你没有权限访问'
    }else{
      await next()
    }
  }
}