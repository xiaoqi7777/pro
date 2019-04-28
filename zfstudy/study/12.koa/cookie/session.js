
let http = require('http');
let url = require('url')
let session = {};
let uuid = require('uuid')
const biaoshi = 'conenct.sid'//标识

let server = http.createServer(function(req,res){
  res.setHeader('Content-Type','text/plain;charset=utf8')
  let pathname = url.parse(req.url,true);
  // console.log('pathname',pathname)
    //解析客户端带过来的cooKie
    let cookies = require('querystring').parse(req.headers.cookie,';')
  if(pathname.path === '/towash'){
    console.log('进来了')
    let caId = cookies[biaoshi]
    if(caId && session[caId]){ //如果来过
      session[caId].count--
      console.log(session[caId].count)
    res.end(`次次来${session[caId].count}`)

    }else{
        let cardId = uuid.v4();//创造一个id
        session[cardId] = {count:10}
        res.setHeader('Set-Cookie',`${biaoshi}=${cardId}`)
        res.end('第一次来')
    }
  }
})
server.listen(3000,function(){
  console.log('1233333333333')
})