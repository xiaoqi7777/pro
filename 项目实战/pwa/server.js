
// let fs = require('fs');
// let path = require('path')
// let json = []

 //i => 0到80 都有图片
 //https://www.fullstackjavascript.cn/conan/${i}.jpeg


// for(let i=0 ;i < 80; i++){
//   console.log(i)
//   json.push(`https://www.fullstackjavascript.cn/conan/${i}.jpeg`)
// }
// fs.writeFileSync(path.join(__dirname,'data.json'),JSON.stringify(json))


let express = require('express')
let app = express()
app.use(express.static(__dirname))
let json = require('./data.json')
app.get('/api/img',(req,res)=>{
  let start = Math.round(Math.random()*(json.length-20))
  res.json(json.slice(start,start+20))
})

app.listen(3000)