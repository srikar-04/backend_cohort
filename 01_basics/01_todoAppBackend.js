const express = require('express')

const todos = [
    {
        id: 1,
        content: 'go to gym'
    },
    {
        id:2,
        content: 'watch oppenheimer'
    },
]

const app = express()

app.use(express.json())

app.get('/', function(req, res) {
    // res.send(todos.map(todo => todo.content))
    res.send(todos)
})

app.post('/create', function(req, res) {
    const content = req.body.content
    if(content) {
        todos.push({id:todos.length+1, content: content})
        console.log(todos);
        res.json({msg:'create operation done'})
    } else {
        res.json({msg:'cannot do create operation, something is wrong'})
    }

})

app.listen(3000)