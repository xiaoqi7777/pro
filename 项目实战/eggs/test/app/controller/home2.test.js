
const {app,mock,assert} = require('egg-mock/bootstrap')
// 如何测试控制器 ctx 请求上下文对象 context
describe('app\controller\home.test.js',function(){
  it('test ctx',async function(){
    //通过app模拟创建出来一个 ctx 这个ctx等同于egg里面的service
    let ctx = app.mockContext({
      session:{name:'zfpx'}
    })
    assert(ctx.method == 'GET')
    assert(ctx.url == '/')
    assert(ctx.session.name === 'zfpx')
  })
})

