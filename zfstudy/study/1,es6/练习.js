// //数据双向绑定


// let arr = [1,3,5,7,9]
// function a(){
//   console.log('更新了111111')
// }

// let p = new Proxy(arr,{
//   set(target,key,val){
//     if(key === 'length') return true;
//     a()
//     return Reflect.set(target,key,val)
//   },
//   get(target,key){
//     return Reflect.get(target,key)
//   }
// })


// p[0] = 2












// let obj = [a,1]

// function observer(obj) { 
//   if(typeof obj !='object') return object
//   for(let key in obj){
//     if(typeof obj[key] != 'object'){
//       a(obj,key,obj[key])
//     }else{
//       observer(obj[key])
//     }
//   }
// }
// function updata(){
//   console.log('更新了');
  
// }
// function a (obj,key,value){
//   Object.defineProperty(obj,key,{
//     set(){
//       updata()
//     },
//     get(){
//       return value
//     }
//   })
// }
// observer(obj)
// obj[0] = 1