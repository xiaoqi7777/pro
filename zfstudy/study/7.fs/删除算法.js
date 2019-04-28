
// 异步 并行 删除目录
let fs = require('fs')
let path = require('path')

function rm(p,callback){
  fs.stat(p,(err,statObj)=>{
    if(statObj.isDirectory()){
      //是目录,读取目录下的内容
      fs.readdir(p,(err,dirs)=>{
        dirs = dirs.map(item=>path.join(p,item))//[m/b,m/q,m/js]
        //目录下多个文件 递归删除
        next=(index)=>{
          let currenPath = dirs[index] 
        }
        next(0)
      })
    }else{
      fs.unlink(p,callback)
    }
  })
}

rm('m',()=>{
  console.log('删除成功')
})








// // 同步 串行 先序深度优先 删除目录
// let fs = require('fs')
// let path = require('path')
// function rm(m) {
//   let st = fs.statSync(m)
//   if(st.isDirectory()){
//     let dirs = fs.readdirSync(m)
//     console.log('1',dirs)
//     dirs = dirs.map(item=>path.join(m,item))
//     dirs.forEach(item=>{
//       rm(item)
//     })
//     fs.rmdirSync(m)
//   }else{
//     fs.unlinkSync(m)
//   }
// }
// rm('m')
