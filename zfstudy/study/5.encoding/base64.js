
// // 1、Buffer.from('珠') 3个字节 都是十六进制
// console.log(Buffer.from('珠')) // e7 8f a0   

// // 2、转化为二进制 
console.log((0x2e).toString(2)) //11100111
console.log((0x8f).toString(2)) //10001111
console.log((0xa0).toString(2)) //10100000

// // 00 00 00 00  3*8=>4*6的格式=>每个字节都化成10进制

// // 11100111  10001111  10100000 截取6个前面用0补
// // 00111001 00111000 00111110 00100000  在转化为十进制

// console.log(parseInt('00111001',2)) //57
// console.log(parseInt('00111000',2)) //56
// console.log(parseInt('00111110',2)) //62
// console.log(parseInt('00100000',2)) //32

// let str = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()
// str += 'abcdefghijklmnopqrstuvwxyz'
// str += '0123456789'
// str += '+/'
// // 下面的结果就是base64编码
// console.log(str[57]+str[56]+str[62]+str[32])


//第一步 十六进制

// console.log(Buffer.from('./mm.jpg')) // 2e 2f 6d 6d 2e 6a 70 67

// //第二步 二进制
// console.log((0x2e).toString(2)) // 00101110
// console.log((0x2f).toString(2)) // 00101111
// console.log((0x6d).toString(2)) // 01101101
// console.log((0x2e).toString(2)) // 00101110
// console.log((0x6a).toString(2)) // 01101010
// console.log((0x70).toString(2)) // 01110000
// console.log((0x67).toString(2)) // 01100111
 
// // 00101110 00101111  01101101 00101110 01101010 01110000 01100111
// // 00001011 00100010 00111101 00101101 00001011 00100110 00101001 00110000 00011001 00000011

// console.log(parseInt('00001011',2)) //11
// console.log(parseInt('00100010',2)) //34
// console.log(parseInt('00111101',2)) //61
// console.log(parseInt('00101101',2)) //45
// console.log(parseInt('00001011',2)) //11
// console.log(parseInt('00100110',2)) //38
// console.log(parseInt('00101001',2)) //41
// console.log(parseInt('00110000',2)) //48
// console.log(parseInt('00011001',2)) //25
// console.log(parseInt('00000011',2)) //3


// let str = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()
// str += 'abcdefghijklmnopqrstuvwxyz'
// str += '0123456789'
// str += '+/'
// // 下面的结果就是base64编码
// console.log(str[11]+str[34]+str[61]+str[45]+str[11]+str[38]+str[41]+str[48]+str[25]+str[3])

let fs = require(fs)
fs.read