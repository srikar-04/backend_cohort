import grpc from "@grpc/grpc-js"
import protoLoader from '@grpc/proto-loader'

const packageDef = protoLoader.loadSync('todo.proto', {})
const grpcObj = grpc.loadPackageDefinition(packageDef)
const todoPackage = grpcObj.todoPackage

const client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure())

// client.createTodo({
//     "id": -1,
//     "text": 'complete socket.io today'
// }, (err, response) => {
//     console.log('received from server : ', response)
// })

client.readTodos({}, (err, response) => {
    if(err) {
        console.log("Error response from server : ", err.details)
    } else {
        console.log('response from server : ', response)
    }
})