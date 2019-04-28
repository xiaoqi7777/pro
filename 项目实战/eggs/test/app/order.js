
const {app,mock,assert} = require('egg-mock/bootstrap')
// before beforeEach after afterEach
describe('app\controller\home.test.js',function(){
  //在整个测试脚本开始之前运行
  before(()=>{
    console.log('before')
  })
  //在每个单元测试开始之前执行
  beforeEach(()=>{
    console.log('beforeEach')
  })
  //在每个单元测试执行完成之后执行
  after(()=>{
    console.log('after')
  })
  //在整个测试脚本运行完毕之后执行
  afterEach(()=>{
    console.log('afterEach')
  })
  it('test1',function(){
    console.log('这是一个单元测试!!!')
  })
  it('test2',function(){
    console.log('这是一个单元测试!!!')
  })
})


//  describe表示分组,用来定义一组测试用例
 
// let assert = require('power-assert')
// describe('测试计算器',function () {
//     it('测试加法',function () {
//       assert(1+1 == 2);
//     })
//     it('测试减法',function () {
//       assert(1-1==0);
//     })
//   })
  
  