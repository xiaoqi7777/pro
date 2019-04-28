
let http = require('http')


//req 相当于是客户端的请求  可读流
//res 是代表响应的东西      可写流
http.createServer(function(req,res){
  console.log(req.method)
  //请求头 是小写 content-type
  console.log(req.headers)


  //怎么获取 传递过来的请求体
  //相当于取请求体 取数据  也就是 req是可读流   on('data')
  //没有请求体 不会触发data事件
  let arr = []
  req.on('data',function(data){
    arr.push(data)
      console.log('获取到的请求体',data)
  })
  req.on('end',function(data){
    console.log(Buffer.concat(arr).toString())
    res.write('hell')
    res.end()
  })
}).listen(80,'localhost',function(data){
  console.log('3000端口启动了')
})