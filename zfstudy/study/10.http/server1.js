
let http = require('http');
let path = require('path');
let url = require('url');
let util = require('util')
let fs = require('fs')
let stat = util.promisify(fs.stat)
let mime = require('mime')

let server = http.createServer(async (req,res)=>{
  //第一步 设置跨域的源 *代表所有
  res.setHeader('Access-Control-Allow-Origin','*');
  //第二步 允许什么方式提交
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
  //第三步 允许什么头提交
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  // res.setHeader('Access-Control-Max-Age',6000);
  /*
    记住  jaxa发送的过来的时候 会先发一个OPTIONS 做试探 
          如果 OPTIONS 收到东西之后 真正的 post 和post 才能发过来
          如果 OPTIONS 反过来没有给他任何反应 就会卡着
  */
  // 第四步 对OPTIONS 快速回应
  if(req.method === 'OPTIONS'){
    res.end(); // options就是preflight 可以断掉此请求会继续发送put或者post请求
  }
  let {pathname} = url.parse(req.url);
  //获取到真实的路径
  let pathUrl = path.join(__dirname,pathname);
 
  if(pathname === '/reg'){
    console.log('进来了')
    let arr = []
    req.on('data',(data)=>{
      arr.push(data)
    })
    
    req.on('end',(data)=>{
      let str = Buffer.concat(arr).toString()
      console.log('---1',Buffer.concat(arr))
      console.log('---2',req.headers['content-type'] )

      if(req.headers['content-type'] === 'application/json'){
        res.end('123')
      }
    })
  }


  try {
    res.setHeader('Content-Type',`${mime.getType(pathUrl)};charset=utf8`)
    // 当文件不存在的时候 会报错
    let statObj = await stat(pathUrl)
    if(statObj.isFile()){
      //是文件,读取文件返回
      fs.createReadStream(pathUrl).pipe(res)
    }else{
      //是目录,返回查看有没有index
      let rurl = path.join(__dirname,'index.html')
      let rStat = await stat(rurl)
      if(rStat.isFile()){
      console.log('333')

        return fs.createReadStream(rurl).pipe(res)
      }
  }
} catch (error) {
    res.statusCode =404
    console.log('444')
    res.end('no found')
  }
  


})

server.listen('3001','localhost',()=>{
  console.log('成功启动')
})