const BaseController = require('./base');

class RoleResourceController extends BaseController {
  // 下面4个方法写死的
  constructor(...args){
    super(...args)
    this.model = 'roleResource'
  }
}
module.exports = RoleResourceController;




