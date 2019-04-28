// let  Promise = require('./测试promise')
let  Promise1 = require('./测试promise')


let p = new Promise1((resolve,reject)=>{
  // setTimeout(() => {
    resolve('成功11')
    reject('失败1')
  // },1000)
})
Promise1.race([Promise.resolve('1213'),Promise.resolve('123')])
.then(data=>{
  console.log(data)
})


// let x = p.then(()=>{
//   return Promise.resolve('123--')
// })
// .finally((data)=>{
//   console.log('data',data)
// })
// .then(data=>{
//   console.log('======',data)
// })
// let x = p.then(data=>{
//   return new Promise((resolve,reject)=>{
//       resolve('成功11')
//   })
// },data=>{
//   console.log('2',data)
// }).then((data)=>{
//   console.log('111111111',data)
// })

// p.then(data=>{
//   console.log('1',data)
// },data=>{
//   console.log('2',data)
// })
// 
// let x = p.then().then().then(data=>{
//   console.log('1',data)
// },data=>{
//   console.log('2',data)
// })
// console.log('---------',x)