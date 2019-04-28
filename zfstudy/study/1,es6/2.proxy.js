// proxy 代理 
// Object.defineProperty 数组不支持 需要先添加 key proxy都无视
// Reflect 用来操作对象的 参数和proxy 一样

// 数组 在set的时候 length属性会变 一般会多触发一个set方法,当他是length的时候就返回一个 true
let  arr = [1,2,3,5]

// let arr = {name:'sg',obj:{age:12,name:'zfpx'}}
let  p = new Proxy(arr,{
  get(target,key){
    // console.log(target,key)
    return Reflect.get(target,key)
  },
  set(target,key,value){
    if(key === 'length') return true;
    console.log(target,key,value)
    return Reflect.set(target,key,value)
  }
})
// p.name = '123'
p.push(1)
console.log(p.name) 