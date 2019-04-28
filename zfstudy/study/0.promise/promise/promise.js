
class Promise{
  constructor(executor){
    //状态
    this.status = 'pending'
    this.value = null
    this.reason = null
    //有异步的时候 保存当前的值
    this.onResolvedcallbacks = []
    this.onRejectedcallbacks = []
    this.executor = executor(this._resolve.bind(this),this._reject.bind(this))
  };
  _resolve(data){
    //初始化 执行回调的时候 走这里的函数 保存当前的值
    if(this.status === 'pending'){
      this.status = 'resolved'
      this.value = data
      this.onResolvedcallbacks.forEach(fn=>{
        fn()
      })
    }
  }
  _reject(data){
    if(this.status === 'pending'){
      this.status = 'reject'
      this.reason = data
      this.onRejectedcallbacks.forEach(fn=>{
        fn()
      })
    }
  }
  then(onFulfilled,onRejected){
    onFulfilled = typeof onFulfilled === 'function' ?  onFulfilled : (data)=>{
      return data
    }
    console.log('----------',onFulfilled)
    onRejected = typeof onRejected === 'function' ? onRejected : (data)=>{
      throw data
    }

    // 链式写法    
    let promise2;
    promise2 = new Promise((resolve,reject)=>{
    //判断当前的状态
      if(this.status === 'resolved'){
        setTimeout(()=>{
          try {
            let x = onFulfilled(this.value)
            this.resolvePromise(x,promise2,resolve,reject) 
          } catch (error) {
            reject(error)
          }
        },0)
      }
      if(this.status === 'reject'){
        setTimeout(()=>{
          try {
            let x = onRejected(this.reason)
            this.resolvePromise(x,promise2,resolve,reject) 
          } catch (error) {
            reject(error)
          }
        },0)
      }
      if(this.status === 'pending'){
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
  resolvePromise(x,promise2,resolve,reject){
      if(x === promise2) {
        console.log('12311111111111111111')
        return reject(new TypeError('循环引用')) 
      }
      let called;
      if(typeof x === 'object') {
        try {
          let then = x.then
          if(typeof then === 'function'){
            //证明是一个promise,就用递归
            console.log('jinalil',x)
            then.call(x,(y)=>{
            if(!called){
              called = true
            }else{
              return
            }
            let a = this.resolvePromise(y,promise2,resolve,reject) 
            },(x)=>{
              if(!called){
                called = true
              }else{
                return
              } 
              reject(x)
            })
          }else{
            if(!called){
              called = true
            }else{
              return
            }
            //带then的对象
            resolve(x)
          }
        } catch (error) {
          reject(error)
        }
      }else{
        if(!called){
          called = true
        }else{
          return
        }
        resolve(x) 
      }
  }
  catch(data){
    return this.then(null,data)
  }
  finally(callback){
    return this.then((data)=>{
      callback()
      return Promise.resolve().then(data)
    },(reason)=>{
      callback()
      return Promise.resolve().then(()=>{
        throw reason
      })
    })
  }
}
Promise.all = (data)=>{
 return new Promise((resolve,reject)=>{
    let arr = []
    let leng
    function p(index,item){
      leng++;
      arr[index] = item
      if(data.leng === leng){
        resolve(arr)
      }
    }
    for(let i=0;i<data.length;i++){
      data[i].then((data)=>{
        console.log('data=>单个的结果')
        p(i,data)
      },reject)
    }
  })
}
Promise.resolve = (data)=>{
  return new Promise((resolve,reject)=>{
    resolve(data)
  })
}
Promise.reject = (data)=>{
  return new Promise((resolve,reject)=>{
    reject(data)
  })
}


module.exports = Promise