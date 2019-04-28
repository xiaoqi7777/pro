const BaseController = require('./base');

class RoleController extends BaseController {
  // 下面4个方法写死的
  constructor(...args){
    super(...args)
    this.model = 'role'
  }

  async getUser(){//获取所有的用户
    const {ctx,service} = this;
    const rs = await service.role.getUser()
    this.success(rs)
  }

  async setUser(){
    const {ctx,service} = this;
    let body = ctx.request.body;
    const rs = await service.role.setUser(body)
    this.success(rs)
  }

  async getResource(){
    const {ctx,service} = this;
    const rs = await service.role.getResource()
    this.success(rs)
  }

  async setResource(){
    const {ctx,service} = this;
    let body = ctx.request.body;
    const rs = await service.role.setResource(body)
    this.success(rs)
  }
}
module.exports = RoleController;




