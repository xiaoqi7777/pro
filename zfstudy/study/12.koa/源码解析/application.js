
let EventEmitter = require('events');
let http = require('http');
let context = require('./context')
let response = require('./response')
let request = require('./request')

class Application extends EventEmitter{
  constructor(){
    super();
    this.middlewares=[]
    this.context = Object.create(context)
    this.response = Object.create(response)
    this.request = Object.create(request)

  }
  compose(ctx,middlewares){
      //主要处理 promise
      function dispatch(index) {
        if(middlewares.length === index) return Promise.resolve(()=>{})
        let middleware = middlewares[index]
        //这里加return 是做异步处理  若下一个是promise 则上一个next应该等待  不加return 上一个next 接受到的是undefined
        return Promise.resolve(middleware(ctx,()=>dispatch(index+1))) 
      }
      return dispatch(0)
  }
  createContext(req,res){
    let ctx = this.context
        ctx.request = this.request //内部封装
        ctx.response = this.response //内部封装
        ctx.res = this.response.res = res
        ctx.req = this.request.req = req
    return ctx
  }
  //处理当前请求的方法
  handleRequest(req,res){
    // 先要创建一个context对象
    // 要把所有的中间件进行组合
    let ctx = this.createContext(req,res)
    // this.middlewares[0](ctx)
    //希望等待所有的中间件 执行完后  在取ctx.body 返回 回去
    res.statusCode = 404
    let p =  this.compose(ctx,this.middlewares)
    p.then(function(){
      let body = ctx.body;
      if(body instanceof Stream){
        body.pipi(res)
      }else if(typeof(body) === 'number'){
        res.setHeader('Content-Type', 'text/plain;charset=utf8');
        res.end(body.toString());
      }else if(typeof body == 'object'){
        res.setHeader('Content-Type','application/json;charset=utf8');
        res.end(JSON.stringify(body));
      }else if(typeof body === 'string' || Buffer.isBuffer(body)){
        res.setHeader('Content-Type', 'text/plain;charset=utf8');
        res.end(body);
      }else{
        res.end(`Not Found`);
      }
    }).catch(e=>{
      this.emit('error',e);
    });
  }
  use(callback){
    this.middlewares.push(callback)
  }
  listen(...args){
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)  
  }
}

module.exports = Application
