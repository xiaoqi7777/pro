
// 主外键 绑定
let mongoose = require('mongoose');
// ObjectId 类型是 mongoose 自带的
let ObjectId = mongoose.Schema.Types.ObjectId
const conn = mongoose.createConnection('mongodb://localhost:27017/sg',{useNewUrlParser: true})

let UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    createAt:{type:Date,default:Date.now}
})
let UserModel = conn.model('User12',UserSchema);

let ArticleShema = new mongoose.Schema({
    title:String,
    content:String,
    // 类似主外键 ref 指向 要绑定的User
    User1:{type:ObjectId,ref:'User12'},
})
let ArticleModel = conn.model('Article',ArticleShema);

// 联表操作
(async function () {
    let user = await UserModel.create({username:'wangwu'});
    let article = await ArticleModel.create({title:'标题',content:'内容',User1:user._id})  
    //populate 里面的值 要指向ArticleModel 的key
    let rs = await ArticleModel.findById(article._id).populate('User1');
    console.log('article',rs)
    /*
        let userId = article.user;
        let rs = await User.findById(userId)
        console.log('rs',rs)
     */
})()