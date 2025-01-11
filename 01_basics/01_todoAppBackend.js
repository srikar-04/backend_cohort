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
    res.send(
        [
            'crud operation => todo-app',
            {
                create: '/create',
                update: '/update',
                delete: '/delete'
            }
        ]
    )
})

app.listen(3000)