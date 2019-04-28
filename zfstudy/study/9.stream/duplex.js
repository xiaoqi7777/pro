let {Duplex} = require('stream')

class MyStream extends Duplex{
  _write(chunk,encoding,clearBuffer){
    console.log(chunk)
    clearBuffer()
  }
  _read(){
    this.push('123')
    this.push(null)
  }
}

let myStream = new MyStream()
// 双工流 read和write 可以没有关系
myStream.on('data',function (data) {
  console.log(data)
})
myStream.write('1111111')

//压缩