import express from "express"
import { Server } from "socket.io"
import { createServer } from "http"

const app = express()
const server = createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
    res.send('hello from the / endpoint')
})

io.on('connection', (socket) => {
    console.log('a user is connected');
    console.log("socket id : ", socket.id);

    socket.on('chat message', (msg) => {
        console.log('user message', msg)
    })

    io.on('disconnect', () => {
        console.log('a user disconnected');
    })
})

server.listen(3000, () => {
    console.log('server is listening on port 3000');
})
