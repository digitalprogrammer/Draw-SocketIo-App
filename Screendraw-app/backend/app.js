const express = require('express')
const app = express()
const http = require('http')
const socketio = require('socket.io')


const server = http.createServer(app)

const io = socketio(server)


server.listen(3000, () =>
{
    console.log('connected')
})

app.use(express.static(`${__dirname}/../frontend`))

const historico = []

io.on('connection',(socket) =>
{
    console.log("New Connection")
    historico.forEach(linha =>
        {
            socket.emit('desenhar', linha)
        })
        
    socket.on('desenhar', (linha)=>
    {
        historico.push(linha)
        io.emit('desenhar',linha)
    })
})