

let  animal =function(){
  this.a = '123'
}

let a = new animal()
console.log(animal.a)

// console.log(a.__proto__ === animal.prototype)