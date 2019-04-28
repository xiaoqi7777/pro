
let http = require('http')
let fs = require('fs')
let statObj = fs.statSync('1.txt')
console.log(statObj.size)
http.createServer((req,res)=>{
  let range = req.headers.range;
  if(range){
    let [,start,end] = range.match(/bytes=(\d*)-(\d*)/)
    start = start?Number(start):0
    //如果没有开始默认是0 如果没有结束 默认结束是总大小-1
    end = end?Number(end): statObj.size -1
    res.statusCode = 206
    res.setHeader('Content-Range',`byres${start}-${end}/${statObj.size}`)
    res.setHeader('Accept-Ranges','btyes')
    fs.createReadStream('1.txt',{start,end}).pipe(res)
    console.log(start,end) 
  }else{
    fs.createReadStream('1.txt').pipe(res)
  }
}).listen(3000,(data)=>{
  console.log('开启')
})
// curl -v --header "Range:bytes=3-5" http://localhost:3000
