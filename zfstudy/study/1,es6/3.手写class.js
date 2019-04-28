


function _classCallCheck(sub,constructor){
  if(!(sub instanceof constructor)){
    throw new Error('cannot with new')
  }
}

function defineProperties(target,props) {   
  for(let i=0;i<props.length;i++){
  // console.log('进来了',props)
    Object.defineProperty(target,props[i].key,{
      ...props[i]
    })
  }
}

function _createClass(constructor,protoProperties,staticProperties){
  if(protoProperties){
    defineProperties(constructor.prototype,protoProperties)
  }
  if(staticProperties){
    defineProperties(constructor,staticProperties)
  }
}

let Animal = function(){
  function Animal(data){
    //类的调用检测
    _classCallCheck(this,Animal)
    this.data = data
  }
  // 第一个参数定义哪一个类  第二个参数就是定义类上的属性 第三个参数就是类上的属性(static 只有改类才能调用 不能被继承)
  _createClass(Animal,[
    {
      key:'eat',
      value:function () {
        // console.log('吃')
      }
    },
    {
      key:'drink',
      value:function () {
        // console.log('喝')
      }
    }
  ],[
    {
      key:'flag',
      value:function(){
        return '好玩'
      }
    }
  ])
  return Animal
}()
function _inherits(subClass,parentClass){
  subClass:prototype = Object.create(parentClass.prototype,{constructor:{value:subClass}})
  //继承静态属性
  Object.setPrototypeOf(subClass,parentClass)
}

// 子类
let Cat = function(Animal){
  _inherits(Cat,Animal);
  function Cat(type) {
    _classCallCheck(this, Cat);
    Animal.call(this, type)
  }
  return Cat
}(Animal)

let a = new Cat('sf')
console.log(a.eat())