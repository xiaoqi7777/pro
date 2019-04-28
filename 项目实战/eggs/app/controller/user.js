const {Controller} = require('egg')
// 现在要测试一个get和post请求
let users = [];
class UserController extends Controller{
  //查看用户列表
  async list(){
    this.ctx.body = users
  }
  //打开添加用户页面
  async add(){
    let csrf = Date.now()+Math.random()+''
    this.ctx.session.csrf = csrf
    
    // 设置 session 下面的 属性不能带下划线  
    await this.ctx.render('user/add',{csrf});
    // await this.ctx.render('user/add',{_csrf});
  //  await this.ctx.body = "use123r"
  
  }
  //确定添加用户
  async doAdd(){
    console.log('doAdd')
    let {ctx} = this;
    let user = ctx.request.body;//得到请求体对象 post 提交过来的
    console.log('user',user)
    console.log('ctx.session',ctx.session)
    if(user.csrf === ctx.session.csrf){
      console.log('通过')
      delete user._csrf;
      ctx.session._csrf = null;
      user.id = users.length>0?users[users.length-1].id+1:1
      users.push(user);
      ctx.body = user
    }else{

      ctx.status = 403
      ctx.body = 'Not Allowed!'
    }
  }
}
module.exports = UserController
