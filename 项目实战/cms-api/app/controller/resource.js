const BaseController = require('./base');

class ResourceController extends BaseController {
  // 下面4个方法写死的
  constructor(...args){
    super(...args)
    this.model = 'resource'
  }
}
module.exports = ResourceController;




