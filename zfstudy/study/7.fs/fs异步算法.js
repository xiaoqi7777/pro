let path = require('path')
let fs = require('fs')

let {
  promisify
} = require('util')
let stat = promisify(fs.stat)
let readdir = promisify(fs.readdir)
let unlink = promisify(fs.unlink)
let rmdir = promisify(fs.rmdir)

function wide(p){
  let arr = new Array(p)
  let index = 0
  let currenPath = ''
  while(currenPath = arr[index++]){
    //判断出去的条件  arr push下一层的目录 若目录为空 则出去
    let stat = fs.statSync(currenPath)
    if(stat.isDirectory()){
      let dirs = fs.readdirSync(currenPath)
      dirs = dirs.map(d=>path.join(currenPath,d))
      arr = [...arr,...dirs]
    }
  }
  for(let i=arr.length-1;i>=0;i--){
    let statObj = fs.statSync(arr[i])
    if(statObj.isDirectory()){
      fs.rmdirSync(arr[i])
    }else{
      fs.unlinkSync(arr[i])
    }
  }
}
wide('m')

// promise 并联
// async function rm(p) {
//   let statObj = await stat(p);
//   if (statObj.isDirectory()) {
//     let dirs = await readdir(p)
//     dirs = dirs.map(d => rm(path.join(p, d))) //[m/s,m/m,m/1.js] 把里面的都包装成promise
//     //下面两行 是递归关键  
//     await Promise.all(dirs)
//     await rmdir(p)
//   } else {
//     await unlink(p)
//   }
// }
// rm('m').then(data => {
//   console.log('成功', data)
// })








// promise 并联
// function rm(p){
//   return new Promise((resolve,reject)=>{
//     fs.stat(p,(err,statObj)=>{
//       if(statObj.isDirectory()){
//         fs.readdir(p,(err,dirs)=>{
//           dirs = dirs.map(d=>rm(path.join(p,d)))//[m/s,m/m,m/1.js] 把里面的都包装成promise
//           //退出条件 当dirs里面只有父级文件夹  dirs为空 Promise.all 删除父级文件夹
//           // fs.rmdir(p,resolve) 都会删除掉自己 最后删除自己
//           Promise.all(dirs).then(data=>{
//             fs.rmdir(p,resolve)
//           })
//         })
//       }else{
//         fs.unlink(p,resolve)
//       }
//     })
//   })
// }

// rm('m').then(data=>{
//   console.log('成功',data)
// })



//并联
// function rm(p,callback){
//   fs.stat(p,(err,statObj)=>{
//     if(statObj.isDirectory()){
//       //是目录
//       fs.readdir(p,(err,dirs)=>{
//         dirs = dirs.map(item=>path.join(p,item))
//         if(dirs.length >0){
//           let index = 0
//           function done(){
//             index++;
//             //删文件夹的 条件
//             if(index === dirs.length){
//               fs.rmdir(p,callback) 
//             }
//           }
//           dirs.forEach(d=>{
//             rm(d,done)
//           })
//         }else{
//           fs.rmdir(p,callback)
//         }
//       })
//     }else{
//       fs.unlink(p,callback)
//     }
//   })
// }
// rm('m',()=>{
//   console.log('成功')
// })
// 串联
// function rm(p,callback){
//   fs.stat(p,(err,statObj)=>{
//     if(statObj.isDirectory()){
//       //是目录 查看有多少文件
//       fs.readdir(p,(err,dirs)=>{
//         dirs = dirs.map(item=>path.join(p,item)) //[m/s,m/m,m/1.js]
//         //循环 就用递归  当dirs.length = 0 退出
//         //串联 删完一个删下一个
//         function next(index){
//           if(index === dirs.length) return fs.rmdir(p,callback)
//           //处理第一个
//           let currenPath = dirs[index] 
//           //获取到路径走回调 若没有则删除父级
//           rm(currenPath,()=>next(index+1)) 
//         }
//         next(0)
//       })
//     }else{
//       fs.unlink(p)
//     }
//   })
// }

// rm('m',()=>{
//   console.log('成功')
// })