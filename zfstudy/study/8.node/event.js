
// 事件模块 发布订阅
// 订阅  提前将方法准备好
// 发表  传递一个参数 触发方法
let Event = require('events')
let util = require('util')

function Girl(){

}
//继承
util.inherits(Girl,Event)

let girl = new Girl
function cry(){
  console.log('cry')
}
//设置最大监听数
// girl.setMaxListeners(1)

//当我绑定事件方法 就是触发newListener  
girl.on('newListener',function (data) {
  console.log('das',data)
  //触发 绑定一个触发一个
  process.nextTick(()=>{
    girl.emit(data)
  })
})
//绑定 当on订阅 emit发布
girl.on('失恋',cry)
girl.on('失恋',cry)


//绑定一次 只会触发一次
// girl.once
// prependListener 插队 放到最前面
// girl.prependListener
//newListener 监听用户是否绑定了新的事件

//查看最大监听数
console.log('---',Event.defaultMaxListeners)

//删除
// girl.removeListener('失恋',cry)
girl.off('失恋',cry)

