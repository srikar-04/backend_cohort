import express from "express"
import { Server } from "socket.io"
import { createServer } from "http"

const app = express()
const server = createServer(app)
const io = new Server(server)

// server.get('/', (req, res) => {
//     console.log('this is the / endpoint')
// })
app.get('/', (req, res) => {
    res.send('hello from the / endpoint')
})

server.listen(3000, () => {
    console.log('server is listening on port 3000');
})
