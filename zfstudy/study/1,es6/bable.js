let a = 1

class A{
  // a=1
  static b = 2
}
//es6 不支持  可以用属性解析器就支持
// 可以在类中 写  a=1
// 不用写constructor(){a:1}
// 如果加上static 就是类上的属性
let b = new A()

console.log(b.b)
console.log(A.b)