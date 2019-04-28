let fs = require('fs')
//流的原理  发布订阅
// 最简单的 copy文件
function copy(source,target,callback) {
  fs.open(source,'r',(err,fdr)=>{
    fs.open(target,'w',(err,fdw)=>{
      let buf = Buffer.alloc(12)
      function next(){
        fs.read(fdr,buf,0,12,null,(err,bytesRead)=>{
          if(bytesRead>0){
            fs.write(fdw,buf,0,bytesRead,null,(err,writen)=>{
              next()
            })
          }else{
            fs.close(fdr);
            fs.close(fdw);

            callback()
          }
        })
      }
      next()
    })
  })  
}
copy('test.js','test1.js',()=>{
  console.log('copy完成')
})