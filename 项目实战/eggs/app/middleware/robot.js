// options 代表本中间件的配置对象
// app 代表整个应用对象
// 实现 判断chrome访问 返回403
// options对应着config.robot的值
module.exports = (options,app) => {
  return async function (ctx,next) {
    //next 表示调用下一个中间件
    // ctx.get取当前的请求头 字符串
    let userAgent = ctx.get('user-agent')||'';
    const matched = options.ua.some(ua=>ua.test(userAgent))
    if(matched){
      ctx.status = 403
      ctx.body = '没有权限'
    }else{
      await next();
    }
  }
}