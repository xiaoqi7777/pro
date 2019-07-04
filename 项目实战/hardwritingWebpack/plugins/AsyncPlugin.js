// 异步
class AsyncPlugin {
  apply(compiler){
    console.log('222222222222')
    compiler.hooks.emit.tapAsync('AsyncPlugin',(compliation,cb)=>{
        setTimeout(()=>{
          console.log('编译完成~~22')
          cb()
        },1000)
    });
    compiler.hooks.emit.tapPromise('AsyncPlugin',(compliation)=>{
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          console.log('编译完成~~333')
          resolve()
        },1000)
      })
  });
  }
}

module.exports = AsyncPlugin