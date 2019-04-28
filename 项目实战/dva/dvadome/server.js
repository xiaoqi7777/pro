let express = require('express');
let cors = require('cors')
let app = express();
app.use(cors())
app.get('/amount',(req,res)=>{
  console.log('进来了')
  res.send({
    code:0,
    data:3
  })
})
app.listen(3001)