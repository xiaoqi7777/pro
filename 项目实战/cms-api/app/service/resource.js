const  BaseService  = require('./base');
class ResourceService extends BaseService {
    constructor(...args){
      super(...args)
      this.table = 'resource'
    }
}
module.exports = ResourceService;
