
const {app,mock,assert} = require('egg-mock/bootstrap')
// 如何测试控制器 app.httpRequest()
describe('app\controller\home.test.js',function(){
  it('test get /home',async function(){
    // 返回值就是想要对象 response
    let rs = await app.httpRequest().get('/home').expect(200)
    // assert 查看返回的内容是不是我们想要的
    assert(rs.status === 200);
    assert(rs.text === 'home');
  })
})

