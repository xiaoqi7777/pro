let net = require('net')
//当客户端连接上来的时候 会执行对于的回调函数
//socker其实是一个可读可写流,是一个双工流
let server = net.createServer({},function(socket){
    //表示客户端连接的总数量是2个
    // server.maxConnections = 2;
    server.getConnections((err,count)=>{
        console.log(`现在连接的客户端总数是${count}个,客户端总数量${server.maxConnections}`)
    })

    console.log(socket.address())
    // 如何获取可读流的数据 获取的是buf
    // buf 变成字符串 要么指定utf8编码 要么toString
    socket.setEncoding('utf8')
    socket.on('data',(data)=>{
        console.log('服务端接收客户端发送过来的数据',data)
        socket.write('服务器回应:'+data)
    })
    //服务器收到客户端发出的关闭请求,会触发end事件
    //这个地方客户端没有真正关闭,只是开始关闭,当真正关闭的时候会触发一个close事件
    socket.on('end',()=>{
        console.log('客户端已关闭')
        //一旦调用此方法,则当所有的客户端关闭跟本服务器的连接后,将关闭服务器
        // server.unref()
    })
    // setTimeout(()=>{
    //     //close 服务器端游一个方法叫close,close的意思是如果执行了此方法,那么次客户端将不再接受新的连接
    //     // server.close()
    // },10000)
    socket.on('close',(hasError)=>{
        //hasError 为true 为异常关闭  否则表示正常关闭
        console.log('客户端真正关闭',hasError)
    })
})
// server.on('connect',()=>{
//     // createServer 第二个参数 也可以放到这儿
// })

server.on('close',()=>{
    console.log('服务器端已关闭')
})

server.on('error',(data)=>{
    console.log('error',data)
})

server.listen(8080,()=>{
    console.log(server.address())
    console.log('start')
})

