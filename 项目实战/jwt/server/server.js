let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let jwt = require('jwt-simple');
let moment = require('moment')
app.use(bodyParser.json())
let users = [];
//密钥
const JWT_SECRET = 'zfpx';
app.post('/signup',(req,res)=>{
  let user = req.body;
  users.push(user)
  console.log(user)
  res.json(users)
})

app.post('/signin',(req,res)=>{
  let user = req.body;
  let oldUser =  users.find(item=>user.username == item.username && user.password == item.password)
  console.log('oldUser',oldUser)
  if(oldUser){
    // 得到一个7天后的时间戳
    let exp = moment().add(7,'days').valueOf()
    let token = jwt.encode({
      user:{username:user.username},  
      exp
    },JWT_SECRET);
    res.json({code:0,data:token})
  }else{
    res.json({code:1,error:'登录失败'})
  }
})

app.get('/user',(req,res)=>{
  // 访问/user 得时候  要把用户信息解开返回
  let authorization = req.headers['authorization']
  let token = authorization.split(' ')[1]
  //验证jwt签名
  let result = jwt.decode(token,JWT_SECRET)
  res.json({dode:0,data:result.user})
})


app.listen(8080)


console.log(Math.floor(Math.sqrt(4)))