

let fs = require('fs')
let evnts = require('events')

class ReadStream extends evnts{
  constructor(path,options){
    super()
    this.path = path
    this.highWaterMark = options.highWaterMark || 16*1024
    this.flags = 'w'
    this.fd = null
    this.open()
    this.writing = false
    this.cache = []
    this.pos = null
    this.len = null
    this.needDrain = false
  }
  open(){
    fs.open(this.path,this.flags,(err,fd)=>{
      if(err){
        this.emit('error',err)
      }else{
        this.fd = fd
        this.emit('open',this.fd)
      }  
    })
  }
  write(chunk, encoding = this.encoding, callback){

    chunk = Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk)
    console.log('flags11111111',chunk)

    this.len +=chunk.length
    let flags = this.len>=this.highWaterMark ;
    if(flags){
      this.needDrain = true;
    }
    if(typeof this.fd != 'number'){
        this.once('open',()=>this.write(chunk, encoding, callback))
    }else{
      //写
      if(this.writing){
        this.cache.push({
          chunk,
          encoding,
          callback
        })
      }else{

        //开始写第一个 后面的全部进cache数组
        this.writing = true
        this._write(chunk, encoding,()=>this.clearBuffer())
      }
    }
    return this.len<this.highWaterMark
  }
  clearBuffer(){

    let obj = this.cache.shift()
    if(obj){
      this._write(obj.chunk,obj.encoding,()=>this.clearBuffer())
    }else{
    console.log('123',this.needDrain)

      //被清空的情况 需要触发drain
      if(this.needDrain){
        this.writing = false
        this.needDrain = false
        this.emit('drain')
      }
      
    }
  }
  _write(chunk, encoding, callback){
    fs.write(this.fd,chunk,0,chunk.length,this.pos,(err,wirten)=>{
      this.pos += wirten
      this.len -= wirten
      //清空数组下一项
      callback()
    })
  }
}

module.exports = ReadStream