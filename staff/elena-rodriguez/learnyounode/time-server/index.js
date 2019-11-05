const net = require('net')
const { argv : [, , port = 8080] } = process

//socket significa que hay una conexión, este callback solo se ejecuta cuando hay conexión
const server = net.createServer(socket => {
socket.setEncoding('utf8')
let content = ''
socket.on('data', chunk => content += chunk)
socket.on('end' , () => console.log(content)) 

})

server.listen(port)
