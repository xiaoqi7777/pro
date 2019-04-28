// localStorage sessionStorage cookie session 的区别
// localStorage 5M  不能跨域

// cookie 每次请求都可以携带(同域)  可以跨域带参数withCredentials
// 不能跨域设置cookie
// http请求是无状态的(记不住上一次是谁请求的)

// cookie不安全 容易被篡改 不会再cookie中存放敏感信息

let http = require('http')


http.createServer(function(req,res){
  let arr = []
  res.set = function(key,value,opts){
    let args = []
    if(opts.path){
      args.push(`path=${opts.path}`);
    }
    if(opts.maxAge){
      args.push(`Max-Age=${opts.maxAge}`);
    }
    arr.push(`${key}=${value};${args.join(';')}`)
    res.setHeader('Set-Cookie',arr)
  }
  req.cookies = require('querystring').parse(req.headers['cookie'],';','=')
  res.get = function (key) {
    return req.cookies[key]
    }
  if(req.url === '/read'){
    //读
    res.end(res.get('name'))
    console.log(req.cookies)
    console.log(res.get('name'))
  }
  if(req.url === '/write'){
    res.set('name','sg',{path:'/',maxAge:20})
    //写 
    // 多个就就数组
    // res.setHeader('Set-Cookie',[`sg=123;path=/;Max-Age=10;httpOnly`,`age=9`])
    res.end('write ok')
  }
}).listen(3001,function(){
  console.log('123')
})
/*
浏览器 cookies 
  Domain 设置的域是谁  当前的子域等
  path 指的是当前访问路径有这个值才会设置
  Expires 绝对时间 在某个时间点上过期
  Max-Age 过多少秒后 过期
  httpOnly 浏览器只读
*/