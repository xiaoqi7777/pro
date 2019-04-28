let Promise = require('./1.promise')
// let Promise = require('./es5promise')
 

let p = new Promise((resolve,reject)=>{
  // setTimeout(()=>{
    resolve('成功')
    reject('失败')
  // },1000)
})
p
.then(data=>{
  console.log('then',data)
})
// console.log(  'asd',   p.then() )

 
