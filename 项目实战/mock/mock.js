let express = require('express')
let Mock = require('mockjs')
let app = express()
app.get('/user',function(req,res){
let result = Mock.mock({
  code:0,
  message:'成功',
  "data|20":[{
      "name":"@cname",
      "userId":"@id",
      "createAt":"@datetime"
    }]
  })
  res.json(result)
})
app.listen(7000)

// 文档 http://mockjs.com/examples.html
// github使用 https://github.com/nuysoft/Mock/wiki/Getting-Started