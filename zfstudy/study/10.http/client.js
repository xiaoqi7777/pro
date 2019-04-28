
let http = require('http')

// http.get() 他只能发get请求 不能加请求体
// http.requset() 他可以发不同方法 可以加请求体

let client =  http.request({
  host:'localhost',
  method:'post',
  port:3000,
  path:'/user',
  headers:{
    name:'sg'
  }
},function (data) { 
  //此时data 就是一个可读流
  data.on('data',function (res) { 
    console.log(res)
   })
 })
//请求体 这个 就类似于 调取的写流

// 下面这个一定要写
 client.end()