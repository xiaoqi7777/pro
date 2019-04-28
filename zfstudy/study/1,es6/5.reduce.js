
/*
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
function(total,currentValue, index,arr)	必需。用于执行每个数组元素的函数。
函数参数:
参数	描述
total	必需。初始值, 或者计算结束后的返回值。
currentValue	必需。当前元素
currentIndex	可选。当前元素的索引
arr	可选。当前元素所属的数组对象。
initialValue	可选。传递给函数的初始值
*/



// let arr = ['a','b','c','d']
// Array.prototype.reduce =function (callback,prev){
//   for(let i=0; i<this.length;i++){

//   if(typeof prev != 'undefined'){
//       // console.log('i1',i,this[i])
//       prev = callback(prev,this[i],i,this)
//     // console.log(prev)
//   }else{
//     // console.log('i2',i,this[i])
//     prev = callback(this[i],this[i+1],i+1,this)
//     //一次取了2个 所以需要i++ 看上面2个打印的
//     i++
//   }
// }
//   return prev
// }
// let a =arr.reduce((total,currentValue,currentIndex,arr)=>{
//     return total+currentValue
// })
// console.log('a',a)

//数组去重  数组 交集  并集  差集

let arr1 = [1,1,3,5,2,3,5]
let arr2 = [2,3,4,4,3]
let s = new Set()
//  数组   并集
let arr = new Set([...arr1,...arr2])
console.log('++++++++',arr)
//  数组   交集(先去重)
let a1 = new Set([...arr1])
let a2 = new Set([...arr2])
let a = [...a1].filter((item,index)=>{
  return a2.has(item)
})
console.log(a)
//  数组    差集
let aa1 = new Set([...arr1])
let aa2 = new Set([...arr2])
let aa = [...aa1].filter((item,index)=>{
  return !aa2.has(item)
})
console.log(aa)

