let mongoose = require('mongoose');
//创建连接
const conn = mongoose.createConnection('mongodb://localhost:27017/test',{useNewUrlParser:true})

// 定义一个schema 规定了一个集合中文档的属性名和属性的类型
// 光靠schema是不能直接操作 数据库 
// 一个Schema对应一个表 对应一个集合
let UserSchema = new mongoose.Schema({
    username:{type:String,required:true},
    // type类型 required必填  default默认
    password:String,
    createAt:{type:Date,default:Date.now}
})

//定义数据库的操作模型  如果调用model方法的时候 传了两个参数,表示注册一个模块
// User建立一个表 把UserSchema实例化
let User = conn.model('User',UserSchema);

//Entity 实体  模型VS实体
//模型是一个类  实体就一个对象(就一个save方法) 
let zhangsan = new  User({username:'zhangsan',age:'123'})
zhangsan.age = 123;
zhangsan.save((err,rs)=>{
    console.log(rs)
})

/*
可以用promise
User.create({username:'zf',age:10},(err,rs)=>{
    console.log('err',err)
    console.log('rs',rs)
})
*/
/*
(async function () {
    // mongoose的任何方法都会返回一个promise
    try{
        let rs = await User.create({username:'zf',age:10})
        console.log('rs',rs)
    }catch(err){
        console.log(err)
    }
})()
*/

// conn.on('error',(err)=>{
//     console.error(err)
// })
// conn.on('open',()=>{
//     console.log('创建成功')
// })