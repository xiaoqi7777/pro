
let proto={}

function defineGetter(property,key){
  //只要proto.key获取值的时候 就触发 proto.__defineGetter__(key,()=>{})
  proto.__defineGetter__(key,function(){
    return this[property][key]
  }) 
}
function defineSetter(property,key){
  //只要proto.key被赋值参数的时候 就触发 proto.__defineSetter__(key,(val)=>{})
  proto.__defineSetter__(key,function(val){
    // console.log('val',val)
    this[property][key] = val
  })
}
defineGetter('request','url');
defineGetter('request','path')
defineGetter('response','body')
defineSetter('response','body')
module.exports = proto

// let obj = {
//   req:{
//     url:'/asd'
//   }
// }
// function defineGetter(property,key){
//   obj.__defineGetter__(key,function(){
//     return this[property][key]
//   }) 
// }
// defineGetter('req','url');
// console.log(obj.url)


// let obj = {
//   req:{
//     url:'/asd'
//   }
// }
// function defineSetter(property,key){
//   obj.__defineSetter__(key,function(val){
//     console.log('val',val)
//     obj[property][key] = val
//   })
// }
// defineSetter('req','url')
// obj.url = '123'
// console.log(obj.req.url)

