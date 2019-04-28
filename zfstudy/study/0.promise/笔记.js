
/*
  有一个函数可以接受一个函数,
  可以根据条件选择执行这个函数
  高阶函数:函数嵌套函数

  检验promise是否规范
  安装 npm install promises-aplus-tests -g
  用法 promises-aplus-tests promise.js
  在promise文档中 写一个入口
  Promise.defer = Promise.deferred = ()=>{
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
      dfd.resolve = resolve
      dfd.reject = reject
    })
    return dfd
  }

 
*/