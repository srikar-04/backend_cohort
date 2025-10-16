import grpc from "@grpc/grpc-js"
import protoLoader from '@grpc/proto-loader'

const packageDef = protoLoader.loadSync('todo.proto', {})
const grpcObj = grpc.loadPackageDefinition(packageDef)
const todoPackage = grpcObj.todoPackage

const todos = [
    {
        "id": 1,
        "text": 'this is initial todo'
    }
]


const server = new grpc.Server()

// adding the created todo service to the server
server.addService(todoPackage.Todo.service, {
    "createTodo": createTodo,
    "readTodos": readTodos
})

server.bindAsync('0.0.0.0:40000', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.error('Failed to bind server:', error);
        return;
    }
    console.log(`Server bound to port ${port}`);
    
    server.start(() => {
        console.log('Server started successfully');
    });
})

// call contains the entire information of the call (google it further)
// callback is used to send back the response
function createTodo(call, callback) {
    const todoItem = {
        "todoId": todos.length + 1,
        "text": call.request.text
    }

    console.log(call.request)

    todos.push(todoItem)

    console.log('in memory db : ', todos)
    callback(null, todoItem) 
    // the first argument is the error argument and the second argument
    // is the response argument
    // this is the syntax callback(error, response)
    // if there is error then first argument will throw error and second one will be null
}

function readTodos(call, callback) {
    if(todos.length == 0) {
        callback(new Error('todo is empty'), null)
    }
    const todoItems = {
        items: todos
    }
    
    callback(null, todoItems)
}