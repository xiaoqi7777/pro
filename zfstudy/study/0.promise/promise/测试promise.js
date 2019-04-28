
class Promise{
  static resolve(data){
    return new Promise((resolve,reject)=>{
      resolve(data)
    })
  }
  static reject(data){
    return new Promise((resolve,reject)=>{
      reject(data)
    })
  }
  static all(args){
    return new Promise((resolve,reject)=>{
      let count=null
      let arr = []
      function fn(index,item){
        count++;
        arr.push(item)
        if(count === args.length){
          resolve(arr)
        }
      }
      for(let i=0;i<args.length;i++){
        args[i].then(data=>{
          fn(i,data)
        },reject)
      }
    })
  }
  static race(args){
    return new Promise((resolve,reject)=>{
      for(let i=0;i<args.length;i++){
        args[i].then(resolve,reject)
      }
    })
  }
  constructor(executor){
    this.s = '1'
    //状态
    this.status = 'pedding' 
    //保存 初始化的结果
    this.value = null
    this.reason = null
    //保存 异步存放的函数
    this.onResolveFn = []
    this.onRejectFn = []

    this.resolve = (data)=>{
      if(this.status === 'pedding'){
        this.status = 'resolved'
        this.value = data
        //异步的时候 执行回调
        this.onResolveFn.forEach((fn)=>{
          fn()
        })
        // console.log('resolve',data,this.status)
      }
    }
    this.reject = (data)=>{
      if(this.status === 'pedding'){
        this.status = 'rejected'
        this.reason = data
        this.onRejectFn.forEach((fn)=>{
          fn()
        })
        // console.log('reject',data,this.status)
      }
    }
    try {
      executor(this.resolve,this.reject)
    } catch (error) {
      this.reject(error)   
    }
  }
  then(onResolve,onReject){
    onResolve = typeof onResolve === 'function'?onResolve:(data)=>{
        return data
    }
    onReject = typeof onReject === 'function'?onReject:(err)=>{
      throw err
  }
    let promise2;
    promise2 = new Promise((resolve,reject)=>{
      if(this.status === 'resolved'){
        setTimeout(()=>{
          try {
            let x = onResolve(this.value)
            this.resolvePromise(x,promise2,resolve,reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if(this.status === 'rejected'){
        setTimeout(()=>{
          try {
            let x = onReject(this.reason)
            this.resolvePromise(x,promise2,resolve,reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if(this.status === 'pedding'){
        this.onResolveFn.push(()=>{
          setTimeout(()=>{
            try {
              let x = onResolve(this.value)
              this.resolvePromise(x,promise2,resolve,reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        this.onRejectFn.push(()=>{
          setTimeout(()=>{
            try {
              let x = onReject(this.reason)
              this.resolvePromise(x,promise2,resolve,reject)
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })
    return promise2
  }
  resolvePromise(x,promise2,resolve,reject){
    // console.log(x,promise2,resolve,reject)
    if(x === promise2) return reject(new TypeError('循环引用'))
    if(x !=null && (typeof x === 'function' || typeof x === 'object')){
      try {
        let then = x.then
        let called = false
        if(typeof then === 'function'){
          //说明是一个primose
          then.call(x,(y)=>{
            if(!called){
              called = true
              this.resolvePromise(y,promise2,resolve,reject)
            }else{
              return
            }
          },(r)=>{
            if(!called){
              called = true
              reject(r)
            }else{
              return
            }
          })
        }else{
          if(!called){
            called = true
            resolve(x)
          }else{
            return
          }
        }
      } catch (error) {
        reject(x)
      }
    }else{
      resolve(x)
    }
  }
  finally(callback){
    return this.then((data)=>{
      callback()
      return Promise.resolve(data)
    },(err)=>{
      callback(err)
      return Promise.reject(err)
    })
  }



}
module.exports = Promise