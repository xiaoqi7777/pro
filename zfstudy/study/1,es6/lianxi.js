

let obj = {key:1}

let  p = new Proxy(obj,{
  get(target,key){
    console.log('get',key)
    let a= Reflect.get(target,key)
    if(a){
      return Reflect.get(target,key)
    }
    console.log('get1')

    return new TypeError('错误')
  },
  set(target,key,value){
    console.log('set')
    return Reflect.set(target,key,value)
  }
})

// p.key =  12
console.log('p.key',p.key1)
