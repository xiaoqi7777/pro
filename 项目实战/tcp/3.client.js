let net = require('net');
let socket  = new net.Socket();

socket.connect(8080,'localhost',()=>{
    socket.write('hello')
})
socket.setEncoding('utf8');
socket.on('data',(data)=>{
    console.log(data)
})
setTimeout(()=>{
    socket.end()
},5000)