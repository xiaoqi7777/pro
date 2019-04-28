class Promise {
  constructor(executor) {
    //三个状态
    this.status = 'pending'
    //保存 失败 成功的回调值
    this.value = null
    this.reason = null
    //有定时器 报错传进来的函数
    this.onResolvedcallbacks = [];
    this.onRejectedcallbacks = [];
    this.executor = executor(this._resolve.bind(this), this._reject.bind(this))
  }
  _resolve(data) {
    if (this.status === 'pending') {
      this.status = 'resolved'
      this.value = data
      //有定时器 下面才有值会进行回调
      this.onResolvedcallbacks.forEach(fn => {
        fn()
      })
    }
  }
  _reject(data) {
    if (this.status === 'pending') {
      this.status = 'reject'
      this.reason = data
      this.onRejectedcallbacks.forEach(fn => {
        fn()
      })
    }
  }
  then(onFulfilled, onRejected) {
    //判断 传进来的如果是函数 就是正常  如果不是 就是重写一个函数 返回当前的值
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (data) => {
      return data
    }
    onRejected = typeof onRejected === 'function' ? onRejected : (err) => {
      throw err
    }
    let promise2;
    promise2 = new Promise((resolve, reject) => {
      //非异步,直接回调
      if (this.status === 'resolved') {
        setTimeout(() => {
          //try catch 防止onFulfilled接收的是一个err
          try {
            let x = onFulfilled(this.value)
            this.resolvePromise(x, promise2, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      }
      if (this.status === 'reject') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            this.resolvePromise(x, promise2, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      }
      //有定时器 保存传进来的值,在定时器结束(初始化那两个函数回调)
      if (this.status === 'pending') {
        this.onResolvedcallbacks.push(() => {
          setTimeout(() => {

            try {
              let x = onFulfilled(this.value)
              this.resolvePromise(x, promise2, resolve, reject)
            } catch (err) {
              reject(err)
            }
          }, 0)

        })
        this.onRejectedcallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              this.resolvePromise(x, promise2, resolve, reject)
            } catch (err) {
              reject(err)
            }
          }, 0)

        })
      }
    })
    return promise2
  }
  finally(callback) {
    return this.then((data) => {
      callback(data)
      // return  Promise.resolve(callback(data))  
      // 上面的写法 不会往后传递参数了  下面的写法 继续接着 链式
      return Promise.resolve(callback()).then(() => data)
    }, (err) => {
      callback(err)
    })
  }
  //这里this 要指向调用的对象 他下面有then方法
  catch (err) {
    console.log('err', err)
    return this.then(null, err)
  }
  //处理 解析链式(同时解析 别人写的promise)
  resolvePromise(x, promise2, resolve, reject) {
    // console.log('--------',x,'------------',promise2)
    //防止resolve 和 reject 只走一个
    let called;
    //防止回调自己 例子let p1 = p.then(()=>{return p1})  p1.then(null,data=>{console.log(dat)})
    if (x === promise2) {
      return reject(new TypeError('循环引用'))
    }
    //若是一个非对象 直接原路返回, 则接收的是return 过来的
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        //try 防止x.then返回异常
        let then = x.then //通过x.then 是不是一个方法进行循环
        if (typeof then === 'function') {
          // 是promise 直接处理
          then.call(x, (y) => {
            //选一个走
            if (!called) {
              called = true
            } else {
              return
            }
            // 此时 防止 y 是又是一个promise 不能返回resolve(y) 
            // 递归 当 y不是一个object的时候 才出去
            this.resolvePromise(y, promise2, resolve, reject)
          }, (r) => {
            //选一个走
            if (!called) {
              called = true
            } else {
              return
            }
            reject(r)
          })
        } else {
          //一个对象{then:123},跟字符串一样直接返回
          //选一个走
          if (!called) {
            called = true
          } else {
            return
          }
          resolve(x)
        }
      } catch (err) {
        //选一个走
        if (!called) {
          called = true
        } else {
          return
        }
        reject(err)
      }
    } else {
      resolve(x)
    }
  }
}
//这个不能加载prototype 上面 调用的时候 没有初始化Promise()
Promise.resolve = (data) => {
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}

Promise.reject = (err) => {
  return new Promise((resolve, reject) => {
    reject(err)
  })
}
// 核心 记录成功的次数,将promises一条一条处理在集中返回 要是有一条不满足的直接reject
Promise.all = (promises) => {
  return new Promise((resolve, reject) => {
    let arr = []
    let currentIndex = 0
    let fn = (item, index) => {
      arr[index] = item
      currentIndex++
      if (arr.length === currentIndex) {
        resolve(arr)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((data) => {
        fn(data, index)
      }, reject)
    }
  })
}
Promise.race = (promises) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject)
    }
  })
}

module.exports = Promise