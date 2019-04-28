
// function *gen(){
//   yield new Promise((r,s)=>{
//     setTimeout(() => {
//       r('123')
//     }, 1000); 
//   }) 
//  yield new Promise((r,s)=>{
//     setTimeout(() => {
//       r('456')
//     }, 1000); 
//   })
// }
function a (data){
  return new Promise((r,s)=>{
    setTimeout(()=>{
      r(data)
    },1000)
  })
}
// let it = gen()
// let flag = false
 async function gen(){
  let x = await a('11')
  console.log(x)
  let y = await 123
  console.log(y)

 }
 gen()

// function co(it){
//   return new Promise((resolve,reject)=>{
//     function next(data){
//       let {value,done} = it.next(data)
//       console.log('111111',value,done)
//       if(!done){
//         value.then((data)=>{
//           next(data)
//         })
//       }else{
//       console.log('x',value)
//         resolve(value)
//       }
//     }
//     next()
//   })
// }
// co(it).then(data=>{
//  console.log('111111',data);
// })

