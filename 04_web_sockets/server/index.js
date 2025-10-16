import express from "express";
import {createServer} from 'http'
import { Server } from "socket.io";

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {

})

io.on('connection', (socket) => {
    console.log('a new websocket connection is eshtablished ', socket.id)

    socket.on('chat', (payload) => {
        console.log('this is payload : ', payload)
        io.emit('chat', payload)
    })

})


httpServer.listen(3000, () => {
    console.log('server is running on port 3000')
})