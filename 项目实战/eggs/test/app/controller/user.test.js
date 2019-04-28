
const {app,mock,assert} = require('egg-mock/bootstrap')
// 如何测试控制器 app.httpRequest()
describe('app\controller\home.test.js',function(){
  it('test get /users/add',async function(){
    // 返回值就是想要对象 response
    let rs = await app.httpRequest().get('/users/add')
    // assert 查看返回的内容是不是我们想要的
    assert(rs.status === 200);
    assert(rs.text.indexOf('username') != -1);
  })
  it('test post /users/doAdd',async function(){
    // send 发送的是请求体
    let rs = await app.httpRequest()
      .post('/users/doAdd').send("username=zfpx1")
    assert(rs.status === 200);
    assert(rs.body.id == 1);
  })
})

