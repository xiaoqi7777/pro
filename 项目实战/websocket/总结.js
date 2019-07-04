/*
  单攻 单向通信
  半双攻 单双向通信
  双攻 全双向通信

  1、http特点
    http是半双工协议,也就是说,在同意时刻数据只能单向流动,客户端向服务器发送请求(单向),然后服务器响应请求(单向的)
    服务器不能主动推送数据给浏览器
  2、双向通信
    轮询 长轮询 和 iframe流 EventSource流
    轮询 是 客户端每隔一段时间就找服务器查询(还是基于http)
    长轮询 是 客户端每服务器发送消息 等接收到服务器的消息在发送
    iframe流 是 通过在HTML页面里嵌入一个隐藏的iframe,然后将这个iframe的src属性设为对一个长连接的请求,服务器端就能源源不断地往客户推送数据。
      - iframe 请求的数据 数据是一个script脚本 通过parent 赋值给父窗口内容 
      - iframe 和服务器连接时不会断开的
      - 服务器每隔一段时间 返回指定的内容 res.write方法返回  不能用res.end 他会关闭连接

      - res.end 是写入并且关闭
      - 在window中的写的所有属性都是 window 下的
      - 在iframe里获取 外面的window  parent就能获取 window下所有的属性
    EventSource 浏览器自带的
      使用:
        let eventSource = new EventSource('地址')
        // 监听服务器发过来的消息
        eventSource.onmessage = function(event){
          let message = event.data;
        }
        // 监听连接请求失败的错误事件
        eventSource.onerror = ()=>{}
      服务器对应
        格式 text/event-stream 基于http长连接
    websocket  
        属于应用层协议，它基于TCP传输协议，并复用HTTP的握手通道。
        node.js
          let express = require('express')
          let app = express();
          app.listen(3000)

          let WebSockerServer = require('ws').Server
          let server = new WebSockerServer({port:888})
          server.on('connection',(socket)=>{
            console.log('连接成功')
            soket.on('meessage',(meessage)=>{
              console.log('客户端连接过来的消息',meessage)
              soket.send('服务器说:'+meessage)
            })
          })
        html
          let socket = new WebSock('ws://localhost:8888')
          socket.onopen = ()=>{
            console.log('连接成功')
          } 
          socket.onmessage = (event)=>{
            console.log(event.data)
          }
      101 状态 升级协议

      socket.io
          结合express使用
          let express = require('express')
          let app = express();

          let server = require('http').createServer(app);
          let io = require('socket.io')(server)
          // 监听客户端连接事件,当客户端连接上来后,执行回调函数
          io.on('connection',function(socket){
              console.log('服务器接收')
              socket.on('message',function(message){
                socket.send('服务器说'+message)
              })
          })
          server.listen(3000)


      */