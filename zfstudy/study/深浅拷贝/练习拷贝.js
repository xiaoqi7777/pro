

let obj = { a:1,b:{name:'sg'},c:[{a:1},{b:2}] }

function deepClone(obj) { 
  if(typeof obj != 'object') return obj
  if(obj === null) return obj
  if(obj instanceof RegExp) return new RegExp(obj)
  if(obj instanceof Date) return new Date(obj)

  let newObj = new obj.constructor

  for(let key in obj){
    newObj[key] = deepClone(obj[key])
  }
  return newObj
}

let a = deepClone(obj)
console.log(a);
