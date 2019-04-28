// localStorage sessionStorage cookie session 的区别
// localStorage 5M  不能跨域

// cookie 每次请求都可以携带(同域)  可以跨域带参数withCredentials
// 不能跨域设置cookie
// http请求是无状态的(记不住上一次是谁请求的)

// cookie不安全 容易被篡改 不会再cookie中存放敏感信息

let http = require('http')


http.createServer(function(req,res){
  let arr = []
  res.set = function(name,value,options){
    let args = []
    if(options.path){
       args.push(`path=${options.path}`) 
    }
    if(options.maxAge){
      args.push(`Max-Age=${options.maxAge}`) 
    }
    arr.push(`${name}=${value};args.join(; )`)
    res.setHeader('Set-Cookie',arr)
  }
  res.get = function(obj){
    let cookies = require('querystring').parse(req.headers['cookie'],'; ','=')
    return cookies[obj]
  }

  if(req.url === '/read'){
    //读取cookie
    let b = res.get('name')
    console.log(b)
    // console.log('---',b)

  }
  if(req.url === '/write'){
    //设置cookie
    res.set('name1','123',{path:'/',maxAge:200})
    res.set('name12','123',{path:'/',maxAge:200})
    
    // res.setHeader('Set-Cookie',['name=zsd; path=/','asd=123; path=/'])
    res.end('write ok')
  }
}).listen(3001,function(){
  console.log('123')
})

/*
浏览器 访问
  document.cookie 获取 也可以修改

浏览器 cookies 
  Domain 设置的域是谁  当前的子域等
  path 指的是当前访问路径有这个值才会设置
  Expires 绝对时间 在某个时间点上过期
  Max-Age 过多少秒后 过期
  httpOnly 浏览器只读(显示对勾的时候 就是只读)

  设置一个的情况
    res.setHeader('Set-Cookie','name=zsd; path=/read')
    = 是分割name 和 value值的
    ;空格 分割参数
  设置多个写成数组
    name一样也是被覆盖
    res.setHeader('Set-Cookie',['name1=zsd; path=/read','name2=zsd1111; path=/read'])
  
*/