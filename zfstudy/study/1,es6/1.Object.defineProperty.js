//双向数据绑定 特点一般后加的属性不会被观察  需要提前把属性写上去
// 缺点  1、Object.defineProperty 不支持数组
//       2、先添加key值
let obj = {name:'zfpx',age:9,sg:{age:22}}

function update(){
  console.log('更新了')
}
function observer(obj) { 
  if(typeof obj != 'object') return obj;
  for(let key in obj){
    if(typeof obj[key] === 'object'){
      observer(obj[key])
    }else{
      defineReactive(obj,key,obj[key])
    }
  }
}
function defineReactive(obj,key,value){
  //obj 是多层的时候 用递归  获取 value不是一个object 就走下面
  // 要么在上面做判断  要么下下面 继续调
  //observer(value)
  Object.defineProperty(obj,key,{
    set(val){
      update()
      value = val
    },
    get(){
      return value
    }
  })
}

observer('obj')
// obj.sg.age = '123'
console.log('obj')