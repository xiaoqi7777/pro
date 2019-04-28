
const {app,mock,assert} = require('egg-mock/bootstrap')
// 异步测试有三种方式
// 1、promise 2、callback 3、async awiat
describe('app\controller\home.test.js',function(){
  
  it('promise',function(){
    // expect第一个参数 200 期待返回值200 第二个返回的值是否是()里面的  
    return app.httpRequest().get('/home').expect(200).expect('home')
  })
  it('callback',function(done) {
    app.httpRequest().get('/home').expect(200,done);
  })
  it('async&await',async function() {
    await app.httpRequest().get('/home').expect(200).expect('home');
  })

})

