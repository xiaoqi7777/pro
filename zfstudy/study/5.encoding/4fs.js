// 希望有限的内存 读取无限的数据

let fs = require('fs')
// node中默认会占用0,1,2 三个描述符
/*
  process.stdin  0
  process.stdout 1
  process.stderr 2

*/
// (openSync 同步) 
// fs.open异步 文件夹  flag如果操作 回调第二个参数是描述符  

// fs.open('./test.js','r',function(err,fd){
//   let buffer = Buffer.alloc(3)
//   /*
//     fd文件描述符 buffer读取到哪儿
//     0 代表的是从buffer的那个位子读取
//     3 代表的是读取的个数
//     0 代表的是读取文件的位子
//   */
//   console.log('-----',fd)
//   fs.read(fd,buffer,0,3,0,(err,bayesRead)=>{
//     // bayesRead 真实读取的字节数
//     console.log('data',buffer)
//     fs.close(fd,()=>{
//       console.log('关闭')
//     })
//   })
// })

fs.open('test.js','w',function (err,fd) {
  let buffer = Buffer.from('宋格')
  console.log(buffer.length)
  /*
    fd代表的是文件描述符
    0 代表的是把buffer的写入的位子
    2 代表写入的个数(字节数)
    0 写入文件的那个位置
  */
  fs.write(fd,buffer,0,6,0,function(err,wirtten){
    console.log('写入成功')
    //一般都是先把内容写到文件内存 在从内存写到文件里面
    //最后应该调用此方法，更新内存将文件写入磁盘中
    fs.fsync();
  })
}) 