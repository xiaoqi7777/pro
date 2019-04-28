const  BaseService  = require('./base');
class RoleService extends BaseService {
    constructor(...args){
      super(...args)
      this.table = 'role'
    }

    async getUser(){//获取所有的用户
      const {app} = this;
      return await app.mysql.select('user')
    }
  
    async setUser(values){
      const {app} = this;
      let {roleId,userIds} = values;
      // 1、先删除 所有的关联记录
      await app.mysql.query(`DELETE FROM role_user WHERE role_id=?`,[roleId])
      // 2、插入新的关联记录
      console.log('进来了==============')
      for(let i=0;i<userIds.length;i++){
        let userId = userIds[i];
        await app.mysql.insert('role_user',{role_id:roleId,user_id:userId})
      }
      return '给角色分配用户成功!'
    }
  
    async getResource(){
      const {app} = this;
      return await app.mysql.select('resource')
    }
  
    async setResource(values){
      const {app} = this;
      let {roleId,resourceIds} = values;
      // 1、先删除 所有的关联记录
      console.log('123')
      await app.mysql.query(`DELETE FROM role_resource WHERE role_id=?`,[roleId])
      // 2、插入新的关联记录
      console.log('456')
      for(let i=0;i<resourceIds.length;i++){
        let resourceId = resourceIds[i];
        await app.mysql.insert('role_resource',{role_id:roleId,resource_id:resourceId})
      }
      return '给角色分配资源成功!'
    }
}
module.exports = RoleService;
