let net = require('net')
let path = require('path')

let ws = require('fs').createWriteStream(path.join(__dirname,'msg.txt'))
//socket 代表客户端的连接

let server = net.createServer((socket)=>{
    // 设置客户端的超时时间 如果客户端一直不输入超过一定的时间就认为超时了
    socket.setTimeout(3*1000)
    // end:false 指的是 写完后别关闭  默认是关闭
    socket.on('timeout',()=>{
        //等待超时 在执行
        socket.pipe(ws,{end:false})
    })
})
// 65535 最大 tcp头里面用一个16数的bit 表示端口号 
server.listen(65536)