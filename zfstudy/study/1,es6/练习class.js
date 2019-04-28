

function _classCallCheck(sub, constr){
  if(!(sub instanceof constr)){
    throw new Error('需要new')
  }
}

function _createClass(constructor,protoPropeties,staticPropeties){
  if(protoPropeties){
    console.log('走上')
    // 3、公共方法要放在 原型上
    defineProperties(constructor.prototype,protoPropeties)
  }
  if(staticPropeties){
    console.log('走下')
    defineProperties(constructor,staticPropeties)
  }
}
function defineProperties(target,props) { 
  for(let i=0;i<props.length;i++){
    // console.log('jinlai l ',props[i].key,props[i].value)
    Object.defineProperty(target,props[i].key,{
        value:props[i].value
      // ...props[i]

    })

  }
}

let Animal = function () {
    function Animal(type){
      //1、类型检测 console.log('谁new 就向谁',this) 
      _classCallCheck(this,Animal)
      this.type = type
    }
    // 2、描述类  不能枚举  三个参数 1、定义那个类  2、共有属性  3、类上的属性  
    _createClass(Animal,[
      {
        key:'eat',
        value:function () {
          console.log('吃')
          }
      },
      {
        key:'drink',
        value:function () {
          console.log('喝')
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
  // Object.create()
  Object.setPrototypeOf(subClass,parentClass)
}

  //子类继承
 let Cat = function(Animal){
   _inherits(Cat,Animal)
    function Cat(type){
      _classCallCheck(this,Cat)
      let that = this
      let a = Animal.call(this,type)
      //4 如果原 构造函数有返回值 且是一个对象  此时this就指向他
      if(typeof a === 'object'){
        that = a
      }
      return that
    }
    return Cat

 }(Animal)


 let a = new Animal('仆人')
//  console.log(Animal.flag()) 
console.log(a.type) 

//  console.log(a.drink()) 