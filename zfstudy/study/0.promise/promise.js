
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
    if(this.status === 'pending'){
      this.status = 'resolved'
      this.value = data
      this.onResolvedcallbacks.forEach((fn)=>{
        fn()
      })
    }
  }
  reject(data){
    if(this.status === 'pending'){
      this.status = 'reject'
      this.reason = data
      this.onRejectedcallbacks.forEach((fn)=>{
        fn()
      })
    }
  }
}
// 解析链式调用的 （他还要和其他的promise进行结合）
Promise.prototype.resolvePromise = (x,promise2,resolve,reject)=>{
if(x === promise2) {return reject(new TypeError('循环引用'))}
if( x!=null &&(typeof x=== 'function' ||typeof x === 'object')){
  //是一个函数或者promise 对象 promise下面肯定有then
  try{
    // x可能是对象可能是对象,所以需要try catch
    // 下面这种情况 返回一个错误 就直接跳出
    // Object.defineProperty(x,'then',{
    //   get(){
    //     return new TypeError('循环引用')
    //   }
    // })
    let then = x.then //getter定义
    let called ;
    if(typeof then === 'function'){
      //x 肯定是一个promise 执行回调
      then.call(x,(y)=>{
        //y 可能是一个promise 这个时候不能返回 直到是一个常量才返回 用递归
        //同时 要考虑用户既调用成功又调用失败 y和r只能同时只能调一个
        if(!called){
          called = true
        }else{
          return
        }
        this.resolvePromise(y,promise2,resolve,reject)
      },(r)=>{
        if(!called){
          called = true
        }else{
          return
        }
        reject(r)
      })
    }else{
      if(!called){
        called = true
      }else{
        return
      }
      //x =>{then:1} 说明是一个对象 或者函数,直接返回
      resolve(x)
    }
  }catch(e){
    reject(x)
  }
  
}else{
  if(!called){
    called = true
  }else{
    return
  }
  //是一个字符串
  resolve(x)
}
}
//onFulfilled和onRejected
Promise.prototype.then =function(onFulfilled,onRejected){
//onRejected和onFulfilled 是可选参数可能有可能没有
//当啥都不传的时候 返回一个函数(将值返回出去),在下次调用then的时候可以接收到
//值的穿透
onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : function (data) {
  return data;
}
onRejected = typeof onRejected === 'function' ? onRejected:function (err) {
  throw err;
}
//链式写法
let promise2;
 promise2 = new Promise((resolve,reject)=>{
  // 判断三种状态,如果是resolved,返回onFulfilled
  // 看一看是不是promise 如果是promise 就让promise执行，取到最终这个promise的执行结果 ，让返回的promise 成功或者失败
  // 如果x是普通值就让这个返回的promise 变成成功态
  if(this.status === 'resolved'){
    setTimeout(()=>{
      try{
        //这里加try 防止then方法传递一个 new TypeError
        // console.log('走resolved')
        let x = onFulfilled(this.value)
        //若X没有返回值(即then的时候 没有return)) 下面用不到
        //若X有指定返回值,则调用下面的方法进行判断(可能是string,promise等))
        this.resolvePromise(x,promise2,resolve,reject)
      }catch(e){
        reject(e)
      }
    },0)
  }
  if(this.status === 'reject'){
    setTimeout(()=>{
      try{
        let x = onRejected(this.reason)
        this.resolvePromise(x,promise2,resolve,reject)
      }catch(e){
        reject(e)
      }
    },0)
  }
  //有异步的情况才会先进入这儿,此时需要保存当前传进来的 resolve函数和reject函数
  //push 里面传入onFulfilled(this.value)  但是需要包装下不然直接执行了 用函数包装 在resolved和reject的时候执行即可
  if(this.status === 'pending'){
    // console.log('走pending')
    this.onResolvedcallbacks.push(()=>{
      let x = onFulfilled(this.value)
      this.resolvePromise(x,promise2,resolve,reject)
    })
    this.onRejectedcallbacks.push(()=>{      
      let x = onRejected(this.reason)
      this.resolvePromise(x,promise2,resolve,reject)
    })
  }
})
return promise2
}

// // 保存一下当前这个promise的状态(promise有三个状态)
// Promise.status = 'pending'
// // 保存成功的值和失败的原因 
// Promise.value = null
// Promise.reason = null
Promise.prototype.catch = function(err){
  return this.then(null,err)
}
Promise.prototype.resolve = function(data){
  return new Promise((resolve,reject)=>{
    resolve(data)
  })
}
Promise.prototype.reject = function(err){
  return new Promise((resolve,reject)=>{
    reject(err)
  })
}
Promise.prototype.finally = function(callback){
  return this.then((resolve)=>{
    callback()
    return this.then(data=>{
      return data
    })
  },(reject)=>{
    callback()
    return this.then(err=>{
      throw err
    })
  })
}

Promise.defer = Promise.deferred = ()=>{
  let dfd = {}
  dfd.promise = new Promise((resolve,reject)=>{
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = Promise

/*
1、new Promise() 的时候会传递一个函数, 在构造函数中立即执行
2、这个时候要判断 当前状态(pending resolved reject)


*/