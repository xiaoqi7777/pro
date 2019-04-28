let mongoose = require('mongoose');
//useNewUrlParser这个属性会在url里识别验证用户所需的db
const conn = mongoose.createConnection('mongodb://localhost:27017/test',{useNewUrlParser:true})

let UserSchema = new mongoose.Schema({
    username:{type:String,required:true},
    password:String,
    age:Number,
    createAt:{type:Date,default:Date.now}
},{collection:'user'})
//集合的名字是来自于模型的名字, 模型名>小写>复数
let User = conn.model('sd',UserSchema);
//插入文档 可放单个 也可以放文档
(async ()=>{
    //  User.create添加数据
    let user = await User.create({
        username:'lisi',
        age:10,
        password:'123456'
    })
    console.log('user',user)
    // User.updateOne 更新第一条数据
    // User.updateMany 更新多条
    // 第一个参数是更新的条件 第二个参数是要更新的内容
    let updateResult = await User.updateMany({username:'lisi'},{age:121})
    console.log(updateResult)
    // User.find 查询数据
    // User.findOne 查询一条
    let queryResult = await User.find({username:'lisi'},{username:1,age:1})
    // 通过ID查找
    let rs1 = await User.findById('5ca0c6e7c4b03802b8f03587')
    // $exist:true 表示age字段要存在  $gt:1,$lte:10 表示age 1<age=<10  username在lisi或者张三之间
    let rs2 = await User.find({age:{$exist:true},age:{$gt:1,$lte:1000},username:{$in:['lisi','张三']}})
    console.log('queryResult',rs2)
})()
