const {Controller} = require('egg');

class NewsController extends Controller {
  async env(){
    this.ctx.body = this.config.env + this.config.news.myUrl
  }
  async index(){
    let {ctx,service} = this;
    let list = await service.news.list();
    list.forEach(item => {
      // 显示 相对时间
      item.createAt = ctx.helper.fromNow(item.createAt)
    });
    // news 模板的名字 直接找view里面的
    // list是数据
    /**
     * 1、查找文件路径
     * 2、读取文件内容
     * 3、把模板内容 和数据进行混合渲染,得到最终的html
     */
    await ctx.render('news',{list});
  }
  async counter(){
    let {ctx} = this
    //设置cookies
    let count = ctx.cookies.get('count')
    count = count?Number(count) : 0
    //设置获取cookies
    ctx.cookies.set('count',++count)
    ctx.body =  count
  }
}

module.exports = NewsController

