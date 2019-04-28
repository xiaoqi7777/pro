'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  it('should GET /user',async () => {
    const rs = await app.httpRequest()
      .get('/user')
      .expect(200);
    // get请求的内容都在body里面      
    assert(rs.body.code == 0)
  });
  it('should post /user',async () => {
    const rs = await app.httpRequest()
      .post('/user')
      .expect(200);
    // post请求的内容都在body里面      
    console.log('===',rs.body);
    assert(rs.body.code == 0)
  });
});

