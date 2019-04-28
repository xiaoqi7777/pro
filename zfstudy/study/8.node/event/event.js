let p=require('./EventEmitter')
let {inherits} = require('util')
function Gril(){
  //需要call一下this 不然this指向不对
  p.call(this)
}
inherits(Gril,p)
let gril = new Gril
gril.on('女号',function a(data){
  console.log('123',data)
})
gril.once('女号1',function a(data){
  console.log('123',data)
})
gril.emit('女号1','123')
gril.emit('女号1','123')
