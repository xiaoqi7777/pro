let p = require('./readStream')

let rs = new p('test.js',{
  highWaterMark:4
})

rs.on('data',(data)=>{
console.log(data)
})
//error 触发的时候 不会触发close事件
rs.on('error',(data)=>{
  console.log(data)
})
rs.on('end',data=>{
  console.log('end',data)
})
rs.on('close',data=>{
  console.log('close',data)
})