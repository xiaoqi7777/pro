let express = require('express')
let app = express()
let jwt = require('jsonwebtoken')

var bodyParser = require('body-parser');//解析,用req.body获取post参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let whitList = ['http://localhost:8080']
app.use((req,res,next)=>{
    let origin = req.headers.origin
     if(whitList.includes(origin)){
        res.setHeader('Access-Control-Allow-Origin',origin)
        res.setHeader('Access-Control-Allow-Headers','name,xx,Authorization,Content-Type')
        res.setHeader('Access-Control-Allow-Methods','PUT')
        res.setHeader('Access-Control-Allow-Credentials',true)
        res.setHeader('Access-Control-Expose-Headers','name,ss,xx')
        res.setHeader('Access-Control-Max-Age',10)
        if(req.method === 'options'){
            res.end()
        }
    }
    next()
})

app.get('/user',(req,res)=>{
  setTimeout(()=>{
    res.json({name:1})
  },2500)
})
const secret = 'cf'
app.post('/login',(req,res)=>{
  let {username} = req.body
  console.log('username',username)
  if(username === 'admin'){
    res.json({
      code:0,
      username:'admin',
      token:jwt.sign({username:'admin'},secret,{
        expiresIn:20
      })
    })
  }else{
    res.json({
      code:1,
      data:'用户名不存在'
    })
  }
})
// 查看token是否有效  前端路由只要变化就请求查看
app.get('/validate',(req,res)=>{
  let token = req.headers.authorization;
  jwt.verify(token,secret,(err,decode)=>{
    console.log('decode',decode)
    if(err){
      return res.json({
        code:1,
        data:'token失效了'
      })
    }else{
      res.json({
        username:decode.username,
        code:0,
        token:jwt.sign({username:'admin'},secret,{
          expiresIn:20
        })
      })
    }
  })
})

app.listen(3000,()=>{
    console.log('listen start')
})