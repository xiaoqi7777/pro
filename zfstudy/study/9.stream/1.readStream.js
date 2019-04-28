//流 并不关心整体文件大小 每次读一次 从那个位子读取到哪儿
//流 分为可读流 写流 双工流

//流读取文件时 需要用到文件的流

let fs = require('fs') //fs.read
// rs就是可读流的对象 通过可读流 创建出来的实例  都是发布订阅
let rs =  fs.createReadStream('./a.md',{
  flags:'r',
  encoding:null,
  fd:null,
  //读2  写4 执行1
  mode:0o666,//(权限,默认可读可写)  
  start:0,
  end:6,// 包前又包后 read文件一起的大小
  highWaterMark:2,//每次可读取2K 默认 64*1024

}) //不用显示的调用fs.read方法

// 默认情况下 非流动模式,如果监听了on data事件,就会变成流动模式,不停的读取文件,将文件去读完毕,最后触发on end事件
rs.on('open',(data)=>{
  console.log('文件被打开了',data)
})

rs.on('data',(data)=>{
  console.log(data)
  rs.pause()//让当前的on('data')事件暂停
})
setTimeout(() => {
  rs.resume()//恢复触发on('data')事件
}, 1000);

rs.on('end',data=>{
  console.log('123',data)
})

rs.on('close',(data)=>{
  console.log('关闭',data)
})
rs.on('error',(data)=>{
  console.log('错误',data)  
})