// 聊天室  可以设置昵称 可以广播

const net = require('net')
let clients = {};
let server = net.createServer(function(socket){
    socket.setEncoding();
    server.getConnections((err,count)=>{
        socket.write('欢迎光临聊天室,现在在线人数是'+count+'位,请输入你的昵称\r\n')
    })
    let username;
    socket.on('data',(data)=>{
        data = data.replace(/\r\n/,'')
        if(username){
            broadcast(username,`${username}:${data}`)
        }else{
            // 把用户输入的信息当初用户名
            username = data
            // 缓存用户的socket,方便以后广播用
            clients[username] = socket
            // 向所有客户端发送消息
            broadcast(username,`欢迎${username}加入聊天`)
        }
    })
    socket.on('end',()=>{
        broadcast(username,`欢送${username}离开聊天室`)
        clients[username] && clients[username].destroy();//销毁socket
        delete clients[username]
    })
})
function broadcast(username,msg){
    for(let name in clients){
        if(name != username){
            clients[name].write(msg+'\r\n');
        }
    }
}
server.listen(8080,()=>{
    console.log('TCP聊天室已经启动成功',server.address())
})