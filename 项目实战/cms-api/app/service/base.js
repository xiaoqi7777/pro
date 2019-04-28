const { Service } = require('egg');
class BaseService extends Service {
  async list(pageNum,pageSize,where) {
    console.log('jinalai l ')
    const { app } = this;
    pageNum = isNaN(pageNum)?1:parseInt(pageNum)
    pageSize = isNaN(pageSize)?1:parseInt(pageSize)
    //select * from table where username = 'zfpx' order by id desc limit offset
    const list = await app.mysql.select(this.table,{
      where,
      //会按照id  desc降序 asc进行升序
      orders:[['id','asc']],
      offset:(pageNum-1)*pageSize,
      limit:pageSize
    });
    //count 默认的方法 返回的就是总数
    let total = await app.mysql.count(this.table,where)
    return {list,total};
  }
  async create(data) {
    console.log('进阿里i了')
    const { app } = this;
    const rs = await app.mysql.insert(this.table, data);
    return rs;
  }
  async update(data) {
    const { app } = this;
    // update uesr
    const rs = await app.mysql.update(this.table, data);
    return rs;
  }
  async destroy(ids) {
    const { app } = this;
    // delete uesr where id = ? delete from user where id in (1,2,3)
    const rs = await app.mysql.delete(this.table, { id:ids });
    return rs;
  }

}
module.exports = BaseService;
