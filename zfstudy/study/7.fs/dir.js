// 创建目录 删除目录

let fs = require('fs')
// 创建目录 需要保证创建的目录父级存在

//文件存在后不能再次创建
// 同步
// function mkdirSync(p){
//   let dirs = p.split('/') //[m,q,d]
//   for(let i=0;i<dirs.length;i++){
//     let a =  dirs.slice(0,i+1).join('/')
//     try {
//       fs.accessSync(a)
//     } catch (error) {
//       fs.mkdirSync(a)
//     }
//   }
// }
// mkdirSync('m/q/d')

//异步
function mkdir(p, callback) {
  let dirs = p.split('/');
  let len = 0
  function next() {
    if (len === dirs.length) return callback
    let a = dirs.slice(0, ++len).join('/')
    fs.access(a, err => {
      if (err) {
        fs.mkdir(a, err => {
          if (!err) {
            next()
          }
        })
      } else {
        next()
      }
    })
  }
  next()
}
mkdir('a/b', function () {
  console.log('创建完成')
})