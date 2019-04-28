const {Service} = require('egg')
class NewsService extends Service{
  async list(){
    let {ctx} = this
    const {newsUrl} = this.config.news;
    // ctx.curl egg 自带的请求
    let result = await ctx.curl(newsUrl,{
        method:'GET',
        dataType:'json'
    })
    return result.data
  }
}
module.exports = NewsService