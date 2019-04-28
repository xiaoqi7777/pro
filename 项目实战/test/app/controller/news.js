const {Controller} = require('egg')

class NewsController extends Controller{
  async index(){
    const  {ctx,service} = this;
    let list = await service.news.index()
    // ctx.body = '123'
    console.log('sum',ctx.helper.sum(1,3))
   await ctx.render('news',{list})
  }
}

module.exports = NewsController