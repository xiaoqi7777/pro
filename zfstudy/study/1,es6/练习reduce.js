
// 去重
let arr1 = [1,1,3,5,2,3,5]
let arr2 = [2,3,4,4,3]
let newArr = new Set(arr1)
// console.log(newArr)

//并 集
let newArr1 = new Set([...arr1,...arr2])
// console.log(newArr1)

//交 集
// let a1 = new Set(arr1) 
// let a2 = new Set(arr2) 
// let a = [...a1].filter(item=>{
//   return a2.has(item)
// })
// console.log(a1,a2,a)

// 差集
// let aa1 = new Set(arr1) 
// let aa2 = new Set(arr2) 
// let aa = [...aa1].filter(item=>{
//   return aa2.has(item)
// })
// console.log(aa)
// let arr = ['a','b','c','d']
let arr = [2,3,1,2]
Array.prototype.reduce = function(callback,prev){
  for(let i=0;i<this.length;i++){
    if(typeof prev != 'undefined'){
      prev = callback(prev,this[i],i,this)
    }else{
      prev = callback(this[i],this[i+1],i+1,this)
    }
  }
  console.log('123')
  return prev
}

let a = arr.reduce((total,value,index,arr)=>{
  console.log('1',total,index)
  return total+value
},0)
console.log(a)
