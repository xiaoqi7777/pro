//拷贝 

//  第一种 JSON.stringify 和JSON.parse  

// let obj = { name: { schoolName: 'zfpx' }, a: 1 ,reg:undefined};
// let newObj = JSON.parse(JSON.stringify(obj));
// console.log(newObj)

// 第二种 ...obj 浅拷贝 (深拷贝 指得是拷贝后的内容是全新的)
// let obj = { name: { schoolName: 'zfpx' }, a: 1 ,reg:undefined};
// let newObj = {...obj,name:{...obj.name}};


// 深拷贝
  let obj = { a:1,b:{name:'sg'},c:[{a:1},{b:2}] }
  function deepClone(obj){
    console.log('--1',obj.constructor)
    if(typeof obj != 'object') return obj
    if(obj === null) return obj
    if(obj instanceof RegExp) return new RegExp(obj)
    if(obj instanceof Date) return new Date(obj)
    // 否则就是对象
    let newObj = new obj.constructor
    console.log('--',obj.constructor)
    for(let key in obj){
      newObj[key] = deepClone(obj[key]);
    }
    return newObj
  }
  let a = deepClone(obj)
  console.log(a)
//  let o = {}  , Object.assign(o,原对象1,原对象) 返回 新对象,同时o也变了，跟新对象一样
// 只会拷贝对象本身的属性（不会拷贝继承属性）
  // let a={name:'sg',name1: { schoolName: 'zfpx' }}
  // let b={age:123}
  // let o = {}
  // console.log(Object.assign(o,a,b),o)

  // instanceof 和 constructor 区别
  /*
    用法 实例 instanceof 构造函数   返回true  所有的实例 instanceof Object为true
    实例的constructor  用来判断 是否是实例是否是构造函数直接new出来的 
  */

