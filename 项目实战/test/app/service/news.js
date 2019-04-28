const {Service} = require('egg');

class NewsService extends Service{
  async index(){
    let {ctx} = this
    let {newsUrl} = this.config.news
    let  rs = await ctx.curl(newsUrl,{
      methods:'GET',
      dataType:'json'
    })
    return rs.data
  }
}

module.exports = NewsService;
