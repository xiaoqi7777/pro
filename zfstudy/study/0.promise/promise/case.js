let Promise1 = require('./promise')

let p = new Promise1((resolve,reject)=>{
  // setTimeout(()=>{
    // reject('成功1111111')
    reject('失败')
  // },1000)
})

//Promise1.reject('asd')
p.then()
.then(data=>{
  console.log(data)
},data=>{
  console.log(data)
})

// let a = p.then()
// .then(data=>{
//   console.log('+++++++++++',data)
// },data=>{
//   console.log('-----------',data)
// })
// .then(data=>{
//   console.log('data',data)
// })
// let a =  p.then()
// console.log(a)
// .then(data=>{
//   console.log(data)
// })

// p.then(null,data=>{
//   console.log(data)
// })