const { Service } = require('egg');
class BaseService extends Service {
  /**
   * index => get
   * create => post
   * update => put
   * destroy => delete
   * 
   */   
  success(data) {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data,
    };
  }
  error(error) {
    const { ctx } = this;
    ctx.body = {
      code: 1,
      error,
    };
  }
  async index() {
    const { ctx, service } = this;
    // 规定分页的条件是放在查询字符串过来的
    let {pageNum,pageSize,...where} = ctx.query
    const rs = await service[this.model].list(pageNum,pageSize,where);
    this.success(rs);
  }
  async create() {
    console.log('create-----------')
    const { ctx, service } = this;
    console.log('post params',ctx.params)
    // //获取post提交的请求体
    const entity = ctx.request.body;
    const rs = await service[this.model].create(entity);
    // rs.affectedRows 代表印象的行数
    if (rs.affectedRows > 0) {
      this.success(rs.insertId);
    } else {
      this.error('添加失败');
    }
  }
  async update() {
    const { ctx, service } = this;
    console.log(ctx.params)
    // ctx.params获取路径的参数 
    const id = ctx.params.id;
    const updateUser = ctx.request.body;
    updateUser.id = id;
    const rs = await service[this.model].update(updateUser);
    if (rs.affectedRows > 0) {
      this.success('更新成功');
    } else {
      this.error('更新失败');
    }
  }
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    let ids = ctx.request.body;
    console.log('=========', id, ids)
    if(!ids){
      ids = [id] 
    }
    const rs = await service[this.model].destroy(ids);
    if (rs.affectedRows > 0) {
      this.success('删除成功');
    } else {
      this.error('删除失败');
    }
  }
}
module.exports = BaseService;
