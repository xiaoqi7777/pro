
let fs = require('fs')
let {Readable} = require('stream')

fs.createReadStream('./test.js')
//自定义 读取流

class MyRead extends Readable{
  constructor(){
    super()
    this.index = 0
  }
  _read(){
    if(this.index === 9){
      this.push(null)
    }else{
      this.push(this.index++ + '')
    }
  }
}
let myread = new MyRead;
// 当监听data 事件的时候 会自动读取流
// 会触发_read() 当push方法执行的时候,有内容的时候 会发送data事件 this.emit('data')
// 这里就会监听到
myread.on('data',function (data) { 
  console.log(data)
 })
// 当push内容为空的时候  会触发end事件 
myread.on('end',function (data) { 
  console.log('end')
 })