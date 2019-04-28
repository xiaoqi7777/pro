let fs = require('fs')
let path = require('path')
// 只能读取当前目录下的一层文件
let dirs = fs.readdirSync('m')
console.log(dirs)
// let p = dirs.map(item=>{
//   return path.join('a',item)  
// })

// p.forEach(item=>{
//   let a = fs.statSync(item)
//   if(a.isDirectory()){
//     fs.rmdirSync(item)
//   }else{
//     fs.unlinkSync(item)
//   }
// })
// fs.rmdirSync('a')
// fs.rmdirSync 删除目录(要保证 父文件下没有文件)

// fs.unlinkSync 删除文件

// let a = fs.statSync() 判断当前路径的状态 返回一个对象
// a.isDirectory() 是否是文件夹   a.isFile() 是否是文件

