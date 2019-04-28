
function deepClone(obj){
  if(typeof obj === null) return obj
  if(typeof obj !== 'object' ) return obj
  if(obj instanceof RegExp) return new RegExp()
  if(obj instanceof Date) return new Date()
  let newObj = new obj.constructor
  for(let i in obj){
    newObj[i] = deepClone(obj[i])
  }
  return newObj
}


