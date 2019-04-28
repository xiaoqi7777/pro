let fs = require('fs')

let rs = fs.createReadStream('1.txt',{
  highWaterMark:1
})

let ws = fs.createWriteStream('2.txt',{
  highWaterMark:4
})
//边读边写
rs.pipe(ws)










// 读流 我们调read方法 实际是 触发的Readable 下面的 read方法 然后在回调的_read()



// fs.createReadStream=> 他会调用下面这个方法
function createReadStream(){
  //ReadStream 是自己定义的类
  return  new ReadStream()
}
//ReadStream 继承 Readable 所有的属性和方法
//Readable 是 stream 里面的
function ReadStream(){
  Readable.call(this,options)

  util.inherits(ReadStream,Readable)
}
// read 是 Readable继承过来的方法  Readable 本身没有read
Readable.prototype.read = function () {  
  // 这里会掉 this._read() 也就是ReadStream.prototype._read 
}

ReadStream.prototype._read = function () {  
  // 这里做真正fs.read 读取内容,
  // 只要读取到内容  就会this.push(数据)  push 也是Readable里面的
  
  // push被触发之后  紧接着就 触发emit('data',chunk)
  // 监听on('data',()=>{})
} 

