// 原生的构造函数 继承

function Animal(type){
  this.type = type
}
//静态方法
Animal.fn = function(){
  console.log('fn')
}
Animal.prototype.eat = function(){
  return 'eat'
}
// 继承
function Cat(type){
  Animal.call(this,type)
}
// Object.create 原理
// function Create(parentPrototype){
//   let Fn = function () {  }
//   Fn.prototype = parentPrototype
//   let fn = new Fn()
//   //还需要指定构造函数
//   fn.constructor = 'Cat'
//   return fn
// }

// 继承原型上的方法  1与2 3的区别  1需要指定constructor 23不需要额外指定
//1 Cat.prototype = Object.create(Animal.prototype,{constructor:{value:Cat}})
  
//2
  // Object.setPrototypeOf(Cat.prototype,Animal.prototype)
//3  
// Cat.prototype.__proto__ = Animal.prototype
let cat = new  Cat()
console.log(cat.constructor)