
class Promise{ 
    constructor(executor){
      // 保存三个状态 pending resolved reject
      this.status = 'pending'
      // 保存当前的成功和失败的原因
      this.value = undefined;
      this.reason = undefined;
      // 专门存成功的回调
      this.onResolvedcallbacks = [];
      // 专门存失败的回调
      this.onRejectedcallbacks = [];
      //这里不能用apply和call 他们会立即调用 bind会返回新的函数
      //如果立即执行 他返回的不是函数 而是一个返回值undefined,我们需要将2个外抛出去,做回调
      
      //这个立即执行要放在最后
      this.executor = executor(this.resolve.bind(this),this.reject.bind(this))

    }
    resolve(data){
      //保存 初始化 传递进来的值 
      //在执行 then 传递进来的fn
      if(this.status === 'pending'){
        this.status = 'resolved'
        this.value = data
        console.log('已经竟来了 resolve')
        this.onResolvedcallbacks.forEach(fn=>{
          fn()
        })
      }
    }
    reject(data){
      if(this.status === 'pending'){
        this.status = 'reject'
        this.reason = data
        this.onRejectedcallbacks.forEach(fn=>{
          fn()
        }) 
      }
    }
}
//onFulfilled和onRejected
Promise.prototype.then =function(onFulfilled,onRejected){

    console.log(this.status)
    //判断三种状态,如果是resolved,返回onFulfilled
    if(this.status === 'resolved'){
        console.log('先，resolved')
        onFulfilled(this.value)
    }
    if(this.status === 'reject'){
        console.log('先，reject')
        onRejected(this.reason)
    }
    //有异步的情况才会先进入这儿,此时需要保存当前传进来的resolve函数和reject函数 
    //push 里面传入onFulfilled(this.value)  但是需要包装下不然直接执行了 用函数包装 在resolved和reject的时候执行即可
    if(this.status === 'pending'){
      console.log('先走着二')
      this.onResolvedcallbacks.push(()=>{onFulfilled(this.value)})
      this.onRejectedcallbacks.push(()=>{onRejected(this.reason)})
    }

}
// // 保存一下当前这个promise的状态(promise有三个状态)
// Promise.status = 'pending'
// // 保存成功的值和失败的原因 
// Promise.value = null
// Promise.reason = null


module.exports = Promise

/*
  1、new Promise() 的时候会传递一个函数, 在构造函数中立即执行
  2、这个时候要判断 当前状态(pending resolved reject)


*/