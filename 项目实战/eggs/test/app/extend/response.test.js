const {app,mock,assert} = require('egg-mock/bootstrap')
describe('response',function () {
  it('isSuccess',async function () {
    let ctx =  app.mockContext()
    ctx.status = 200
    assert(ctx.response.isSuccess)
  })
  it('isNotFound',async function () {
    let ctx =  app.mockContext()
    ctx.status = 404
    assert(ctx.response.isNotFound)
  })
})