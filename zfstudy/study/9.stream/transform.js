let {Transform}  =  require('stream')

class MyStream extends Transform{
  //双工流
  _transform(chunk,encoding,callback){
    //参数和_write是一样的
    let a =  chunk.toString().toUpperCase()
    //读流 里面的
    this.push(a)
    callback()
  }
}
// 标准输入  process.stdin 是一个可读流  在控制台上操作
// 标准输出  process.stdout 是一个可写  将内容输出到控制台
// process.stdout.write('123') 在控制台输入123

// 控制台会监听我们输入的内容 
let myStream = new MyStream()
//将控制台输入的流导入到可写流(myStream)里
//转化流是一个双工流,将读流导入导入到转化流,转化流在导到输出流
process.stdin.pipe(myStream).pipe(process.stdout)

// 四种流 读fs.createReadStream  写fs.createWriteStream 
// 双工 socket  转化  gzip压缩




// process.stdin.on('data',function (data) {
//   console.log(data)
//   // 0d 0a  代表换行 回撤
// })