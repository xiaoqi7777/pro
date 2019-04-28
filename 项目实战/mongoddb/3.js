let mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://localhost:27017/sg',{useNewUrlParser: true})

let UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    age:Number,
    createAt:{type:Date,default:Date.now}
})
let User = conn.model('user',UserSchema);
// let User = conn.model('U1',UserSchema);

(async ()=>{
    let user = await User.create({
        username:'lisi',
        age:10,
        password:'123456'
    })
    let arrs = []
    // 加入多个数据
    for(let i=1;i<=10;i++){
        arrs.push({username:'zfpx'+i,age:i,password:i})
    }
    // create加入数据
    // let rs1 = await User.create(arrs)
    // console.log('rs1',rs1)
    // let rs2 = await User.find({})
    // console.log(rs2)

    let pageNum = 2;
    let pageSize = 3;
    // skip 跳过指定的条数
    // limt 限制返回的条数
    let data =await User.find({}).sort({age:1}).skip(3).limit(3)
        console.log(data)
})()