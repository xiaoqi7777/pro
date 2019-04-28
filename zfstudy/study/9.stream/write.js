
let {Writable} = require('stream')

//自定义 可写流

class MyWrite extends Writable{
  _write(chunk,encoding,clearBuffer){//可以重写_read方法 来实现
    console.log(chunk.toString())
    clearBuffer()
  }
}
let myWrite = new MyWrite;
// 第一个真的写  之后需要手动清除
// 之后的数据 都是放到数组里面 数组有一个不好的就是 取走一个长度就变化了
// 现在node用的是链表

myWrite.write('123','utf8',function (data) { 
  console.log('data')
 })

 myWrite.write('333','utf8',function (data) { 
  console.log('data')
 })
