const express = require('express')

const app = express()

app.get('/', function(req, res) {
    res.send('you are in the right place')
})

app.listen(3000)