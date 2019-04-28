let http = require('http')
let fs = require('fs')
let path = require('path')
// url 模块下的parse(url,boolean) 能解析 url  boolean为true时 取到的query是一个对象(?后面的)
// require('querystring').parse(str,'&@','#=') 解析str 第一个参数 是对象之前分割 第二个参数是 key 和 value分割
let url = require('url');
// let {pathname,query} = url.parse('http://www.baidu.com:8080/s?a==1',true)
// console.log(pathname,query)

let server = http.createServer();
//创建服务后,回调的方式，当请求到来时才会执行次方法
//会把请求过来的信息 socket => req+res，分配号后出发一个request方法
server.on('request',function(req,res){
  let {pathname}  = url.parse(req.url)
  let pathUrl = path.join(__dirname,pathname)
  console.log(pathUrl)
  fs.access(pathUrl,(err)=>{
    if(err){
      //路径不存在 可能是接口
      if(req.url === '/login'){
        let arr = []
        req.on('data',function (data) { 
          arr.push(data)
        })
        req.on('end',function () {
            let  str = Buffer.concat(arr).toString()
            // let str = 'username#=123&@password#=456'
            let obj = require('querystring').parse(str,'&@','#=')
    
            console.log(obj)
    
    
          return  res.end(obj) //这个里面只能放string 和 Buffer  一般用JSON.stringify(obj)
          //将字符串 变成一个对象 (用正则)
          // let reg = /([^=&*])=([^=&])/g
          // let obj = {}
    
          // str.replace(reg,function () { 
          //   obj[arguments[1]] = arguments[2]
          //  })
          //  console.log(obj)
        })
      }else{
        // 都不是返回 404
        res.statusCode = 404
        res.end('no fond')
      }
    }else{
      //返回页面
      res.setHeader('Content-Type',require('mime').getType(pathname))
      fs.createReadStream(pathUrl).pipe(res)
    }
  })


  // if(req.url === '/ajax.html'){
  //   //  会被解析成html  
  //   //  res.setHeader('Content-Type','text/html;charset=utf8')
    
  //   //  会被解析成文本
  //   res.setHeader('Content-Type','text/plain;charset=utf8')
  //   return fs.createReadStream(path.join(__dirname,'/ajax.html')).pipe(res)
  // }
  
  // res.end('123--------')

}).listen(3000,'localhost',function(data){
  console.log('服务开启')
})
//mime 就是用来获取 请求头 映射对应的类型
let mime = require('mime')
console.log(mime.getType('1.js'))