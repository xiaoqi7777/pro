//fs file system 文件操作系统 操作文件相关的内容
// 坑 git 的相对目录是文件的当前  vscode的相对目录 是当前的跟文件夹

let fs = require('fs')
// fs 方法中一般会有同步和异步两种方法 同步可以马上拿到返回结果，
// 异步就通过callback的形式，异步只能error-first来获取错误
fs.readFile('test.js','utf8',(err,data)=>{
  if(!err){
    console.log(data)
  }
})
// 写入时 文件不存在会创建文件 如果有内容会情况文件 
fs.writeFile('test1.js',123,(err,data)=>{
  if(!err){
    console.log(data)
  }
  console.log(err)
})
//拷贝功能 readFile 会讲内容整个读取到内存中，不可能读取比内存大的文件
//同时操纵一个文件 可能会错乱
fs.copyFile('原','目标')
fs.appendFile()

// 读文件 fs.readFile/readFileSync
// 写入时 文件不存在会创建文件 如果有内容会情况文件
// 写文件 fs.writeFile/writeFileSync

// fs.readFileSync('./test.js','utf8',(err,data)=>{
// console.log(data)
// })
// fs.readFile('test.js','utf8',(err,data)=>{
//   if(!err){
//     console.log(data)
//   }
// })

// 写入时 文件不存在会创建文件 如果有内容会情况文件

// fs.writeFile('test1.js',123,(err,data)=>{
//   if(!err){
//     console.log(data)
//   }
//   console.log(err)
// })

// 拷贝功能 readFile 会讲内容整个读取到内存中，不可能读取比内存大的文件
// 同时操纵一个文件 可能会错乱
// fs.copyFile('原','目标') 
// fs.appendFile() //调用的就是writeFile 把flag改为a

// {flag:r/读取,r+/读取并且写入,w/写入,w+/读取并且写入,a/追加} 
// flag位子不能放反
// fs.writeFile('test.js','1',{flag:'a'},(a)=>{
//   console.log(a)
// })
// fs.readFile('test.js',{flag:'r',encodibg:'utf8'},(a)=>{
//   console.log(a)
// })
