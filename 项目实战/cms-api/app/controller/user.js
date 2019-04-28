const BaseController = require('./base');
const svgCaptcha = require('svg-captcha');
// jwt 的一个包 
const {sign} = require('jsonwebtoken')
class UserController extends BaseController {
  // 下面4个方法写死的
  constructor(...args){
    super(...args)
    this.model = 'user'
  }
  async signup(){
    let {ctx,app} = this
    let user = ctx.request.body;
    if(user.address)user.address = user.address.join('-')
    let captcha = user.captcha
    console.log('captcha',captcha,ctx.session)
    console.log('headers',ctx.request.headers)
    delete user.captcha
    delete user.confirm
    if(captcha == ctx.session.captcha){
      console.log('成功')
      let rs = await app.mysql.insert('user',user)
      // affectedRows 如果大于0就成功 等于0 就失败
      console.log('rs',rs)
      if(rs.affectedRows>0){
        this.success({code:0,data:'用户注册成功'})
      }else{
        this.error('用户注册失败')
      }
    }else{
      console.log('失败')
      this.error('验证码错误 校验失败')
    }
    

  }
  //通过这个接口生成验证码
  async captcha(){
    let {ctx} = this;
    // 生成的时候 分成两部分 一个是答案就是文本要记录在后台 一个是图片
    let captcha = svgCaptcha.create({});
    // 利用session 存答案
    ctx.session.captcha = captcha.text;
    ctx.set('Content-Type','image/svg+xml');
    ctx.body = captcha.data

  }
  async login() {
    let {ctx,app} = this
    let body = ctx.request.body
    // 查询 where是条件 select查询得到的是一个数组 里面的数据看着像对象 其实不是 需要JSON转换下
     let rs = await  app.mysql.select('user',{
      where:{
        username:body.username,
        password:body.password
      },
      limit:1
    })
    // console.log('rs',rs)// [RowDataPacket:{xx:xx}]
    
    if(rs && rs.length>0){
      let user = rs[0]
      // user不是真正的对象 
      user = JSON.parse(JSON.stringify(user))
      // 此处还要让user带上自己的权限 
      delete user.password;//签名删除密码
      //我们把用户拥有的菜单也放到user上
      // 比如说当前登录的用户ID为1的话
      // user.resources = [{id:1,name:'权限管理'},{id:2,name:'权限管理'},{id:3,name:'权限管理'},{id:4,name:'权限管理'}]
      // user.resources = [{id:1,name:'权限管理',children: [{id:2,name:'权限管理'},{id:3,name:'权限管理'},{id:4,name:'权限管理'}]}]
      // console.log('user',user)
      
      let resourceList = await app.mysql.query(`
        SELECT resource.* FROM
        role_user,role_resource,resource
        WHERE role_user.role_id = role_resource.role_id AND
              role_resource.resource_id = resource.id AND 
              role_user.user_id = ${user.id}`)
      // console.log('resourceList',JSON.parse(JSON.stringify(resourceList)))
      resourceList = JSON.parse(JSON.stringify(resourceList))
      console.log('resourceList',resourceList)
      let resources = [];
      let map = {}
      resourceList.forEach(item=>{
        
        item.children = []
        map[item.id] = item;
        if(item.parent_id == 0){
          resources.push(item)
        console.log('keng=',resources)
        }else{
          // parent_id 0开始  代表数组的层数
          map[item.parent_id].children.push(item)
        console.log('keng=',resources)
          
        }
      })
      // console.log(resources)
      user.resources = resources

      let token =  sign(user,this.config.jwtSecret)
      this.success(token)
    }else{
      this.error('登录失败')
    }

  }
}
module.exports = UserController;




