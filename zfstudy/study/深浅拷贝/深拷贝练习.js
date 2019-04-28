

let  obj = {name:1,name1:1,sg:[{sh:123}]}

function deepClone(obj){
  if(obj === null) return obj
  if(typeof obj != 'object') return obj
  if(obj instanceof Date) return new Date(obj)
  if(obj instanceof RegExp) return new RegExp(obj)
  let newObj = new obj.constructor
  for(let key in obj){
    newObj[key] =deepClone(obj[key])
  }
  return newObj
  
}

console.log(deepClone(obj))