let eventsEmitter = require('events')
let http = require('http')
let context = require('./context')
let request = require('./request')
let response = require('./response')


class Application extends eventsEmitter{
  constructor(){
    super()
    this.middleware = []
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
  }
  createContext(req,res){
    let ctx  = this.context
      //内部封装
      ctx.request = this.request
      ctx.response = this.response
      
      ctx.req = ctx.request.req = req
      ctx.res = ctx.response.res =res


    return ctx
  }
  //处理当前请求
  handleRequest(req,res){
    //创建一个ctx  
    let ctx = this.createContext(req,res)
    //将ctx传入每一个中间件
    this.middleware[0](ctx)
  }
  use(callback){
    this.middleware.push(callback)
  }
  listen(...args){
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)
  }

}

module.exports = Application