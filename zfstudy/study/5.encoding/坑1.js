let fs = require('fs')

const BUFFER_SIZE = 3;
fs.open('test.js','r',(err,rfd)=>{
  fs.open('test1.js','w',(err,wfd)=>{
    let buf = Buffer.alloc(BUFFER_SIZE)
    function next(){
      fs.read(rfd,buf,0,BUFFER_SIZE,null,(err,bytesRead,data)=>{
        if(bytesRead>0){
            fs.write(wfd,buf,0,bytesRead,null,(err1,data)=>{
              next()
            })
        }else{
          console.log('拷贝完成')

            fs.close(wfd,err=>{
              console.log(err)
            })
            fs.close(rfd,err=>{
              console.log(err)
            })
        }
      })
    }
    next()
  })  
})
console.log(123)


