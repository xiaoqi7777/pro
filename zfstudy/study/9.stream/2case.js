let WriteStream = require('./WriteStream')
//我有一个需求 想把10个数写到文件中 但是只用1个字节的内存

let ws = new WriteStream('test.js',{
  highWaterMark:1
})

// ws.write('1123')
// ws.write('2')
// ws.write('3')
// ws.write('4')
// ws.write('为说的')
let flag = true
let i = 1
function write(){
  while(flag && i<9){
    flag = ws.write(i++ +'')
    console.log(flag,)
  }
}
write()

ws.on('drain',()=>{
  console.log('1')
  flag = true
  write()
})
