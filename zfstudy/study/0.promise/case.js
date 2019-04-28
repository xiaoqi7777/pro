let Promise = require('./promise')
// let Promise = require('./es5promise')

 
let p = new Promise((resolve,reject)=>{
  // resolve('成功')
  reject('失败111111111')
})

p.then(function(data){
  return 1
}).
then().
then().
then()
.then(data=>{
  console.log(data)
},e=>{
  console.log('e',e)
})

// p1.then(data=>{
//   console.log('获取',data)
// },data=>{
//   console.log('失败',data)
// })


