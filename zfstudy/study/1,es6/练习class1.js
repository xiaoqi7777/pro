// class

function _classCallCheck(sub,constr){
  if(!(sub instanceof constr)){
    throw new Error('没有new')
  }
}
function fna(target,props){
   for(let key in props){
      Object.defineProperty(target,props[key].key,
      {
        value:props[key].value
      }
      );
      
   }
}


function _createClass(obj,a1,a2){
  if(a1){
    fna(obj.prototype,a1)
  }
  if(a2){
    fna(obj,a2)
  }
}


let Animal =function(){
  function fn(type){
    //检测 是否有new
    _classCallCheck(this,fn)
    this.type = type
  }
  _createClass(fn,[
    {
      key:'eat',
      value:function(){
        console.log('吃')
      }
    },
    {
      key:'drink',
      value:function(){
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
  return fn
}()
function _inherits(subClass,parentClass){
  Object.setPrototypeOf(subClass,parentClass)
}

let a = new Animal('123')
console.log(Animal.flag())
