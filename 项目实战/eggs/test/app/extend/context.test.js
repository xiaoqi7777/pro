const {app,mock,assert} = require('egg-mock/bootstrap')
describe('application',function () {
  it('accept-language',async function () {
    let ctx =  app.mockContext({
      headers:{'accept-language':'zh-cn'}
    })
    assert(ctx.language() == 'zh-cn')
  })
})