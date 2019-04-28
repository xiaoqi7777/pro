
let fs = require('fs')

let ws = fs.WriteStream('test.js',{
  flags:'w',
  encoding:'utf8',
  autoClose:true,//写完是否自动关闭
  highWaterMark:1,//16*1024 预估每次写入的量
})

// ws可写流
// flag 代表写入的内容 是否>=hightWaterMark 是的话 返回false
let flag = ws.write('我','utf8',()=>{
  console.log('data')
})
console.log('flag-->',flag)

