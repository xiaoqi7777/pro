const BaseController = require('./base');

class RoleUserController extends BaseController {
  // 下面4个方法写死的
  constructor(...args){
    super(...args)
    this.model = 'roleUser'
  }
}
module.exports = RoleUserController;




