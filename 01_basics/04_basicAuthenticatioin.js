const express = require('express');

const app = express();

app.use(express.json())

app.post('/signup', function(req, res) {
    res.json({msg:'you are singedup'})
})

app.post('/signin', function(req, res) {
    res.json({msg:'you are signed in'})
})


app.listen(3000);