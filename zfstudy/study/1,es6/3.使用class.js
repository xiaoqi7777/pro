// es6 继承
class Animal{
  //静态方法  通过类来调用 Animal.flag
  static flag(){ 
    return '好玩'
  }
  constructor(type){
    this.type = type
  }
  eat(){
    console.log('this')
  }
}
class Cat extends Animal{ //内置了call 也继承了共有属性
  constructor(type){
    super(type)//Animal.call(this,type)
  }
}
//静态方法  子类可以继承
let animal = new Cat('123')
console.log(Animal.flag())
// animal.eat()