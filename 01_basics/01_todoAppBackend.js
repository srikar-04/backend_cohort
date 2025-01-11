const express = require('express')

let todos = [
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

app.put('/update', function(req,res) {
    const n = req.query.n
    const content = req.body.content
    todos = todos.map(todo => {
        if(todo.id != n) return todo
        else return {...todo, content}
    })
    res.json({msg: 'update operation done'})
})

app.delete('/delete', function(req, res) {
    const n = req.query.n;
    if(!n) {
        res.json({msg:'param not foung'})
    }
    todos = todos.filter(todo => todo.id != n)

    res.json({msg:'delete operation done'})
})

app.listen(3000)