

let arr = '123454你123a'

// console.log(arr.split('你'))


let buf = Buffer.from('xasd你1你23123你012')

Buffer.prototype.split = function(p){
  let arr = []
  let buf = Buffer.from(this)
  let len = Buffer.from(p).length
  let offset = 0
  let index = buf.indexOf(p)
  // console.log(index)

  while(-1 != index){
    // console.log('123')
    let target = this.slice(offset,index)
    arr.push(target)
    offset = len + index
    index = buf.indexOf(p,offset)
  }
  arr.push(this.slice(offset))
  return arr.toString()
}

console.log(buf.split('你')) 
// console.log(buf.split)