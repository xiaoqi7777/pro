const {app,mock,assert} = require('egg-mock/bootstrap')

describe('app\service\news.js',function () {
  it('test news service',async function () {
    let ctx = app.mockContext();
    let data = await ctx.service.news.list()
    assert(data.length === 3)
  })
})