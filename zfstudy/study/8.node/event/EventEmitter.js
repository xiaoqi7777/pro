
function EventEmitter(){
  this.obj = Object.create(null)
}
//{on:[fn1,fn2];on1:[fn1,fn2]}
//相同的事件可以绑定多个事件
EventEmitter.prototype.on = function (event,callback) {
  if(event != 'newListener'){
    this.obj['newListener'].forEach(fn=>{
      fn(event)
    })
  }
  this.obj[event] ? this.obj[event].push(callback) :this.obj[event] = [callback]
}
EventEmitter.prototype.emit = function (event,...args) {
  this.obj[event].forEach(item => {
    item.call(this,...args)
  });
}
EventEmitter.prototype.off = function (event,callback) {
  this.obj[event] = this.obj[event].filter(l=> l!=callback && l.l!=callback)
}
EventEmitter.prototype.once = function (event,callback) {
  function one(...args){
    callback(...args)
    this.off(event,one)
  }
  one.l = callback
  this.on(event,one)
}

module.exports = EventEmitter