const {app,mock,assert} = require('egg-mock/bootstrap')
describe('application',function () {
  it('isChrome',async function () {
    let ctx =  app.mockContext({
      headers:{'User-Agent':'zh-cn  chrome sss'}
    })
    assert(ctx.request.isChrome == true)
  })
  it('isNotChrome',async function () {
    let ctx =  app.mockContext({
      headers:{'User-Agent':'zh-cn  firefox sss'}
    })
    assert(ctx.request.isChrome == false)
  })
})