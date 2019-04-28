let path = require('path')
let fs = require('fs')


function rm(m){
 let st = fs.statSync(m)
 if(st.isDirectory()){
   //是文件夹,显示文件下的所有目录
   let dirs = fs.readdirSync(m)
   dirs = dirs.map(item=>path.join(m,item))
   //当 dirs 目录没有的时候 删除父目录
   dirs.forEach(item => {
    rm(item)
   });
   fs.rmdirSync(m)
 }else{
   fs.unlinkSync(m)
 }
}
rm('m')