let fs = require('fs')

// fs.open('test.js','r',(err,fd)=>{
//   if(err){
//     console.log(err)
//   }
//   let buf = Buffer.alloc(6)
//   fs.read(fd,buf,0,6,0,(err,bytesRead,data)=>{
//     console.log(buf.toString())
//   })
  
// })

const BUFFERLENGTH = 3;
fs.open('test.js','r',(err,fdr)=>{
  fs.open('test1.js','w',(err,fdw)=>{
    let buf = Buffer.alloc(BUFFERLENGTH)
    function next(){
      fs.read(fdr,buf,0,BUFFERLENGTH,null,(err,bytesRead,data)=>{
        if(bytesRead>0){
          if(err){
            console.log('读的时候报错',err)
          }else{
            fs.write(fdw,buf,0,bytesRead,null,(err1,data)=>{
              if(err){
                console.log('写的时候报错',data)
              }
              next()
            })
          }
        }else{
            fs.close(fdw,err=>{
              console.log(err)
            })
            fs.close(fdr,err=>{
              console.log(err)
            })
            console.log('拷贝完成')
        }
        
      })
    }
    next()
  })  
})
console.log(123)


