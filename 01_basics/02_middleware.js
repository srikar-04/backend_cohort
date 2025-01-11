const express = require('express')

const app = express()

app.get('/', function(req, res) {
    res.json({
        ride1: '/ride1 is the route',
        ride2: '/ride2 is the route'
    })
})

const isAllowed = (req, res, next) => {
    // middleware by default has acess to req, res and next functions
    if(!(req.query.n) || req.query.n < 10) {
        res.status(411).send('you are not allowed to this ride or the param is msissing')
    } else {
        next();     // gives control to the next middleware or the   final route
    }
}

// if we want to inject middleware to all the routes which uses app then this is the code 

//app.use(isAllowed) => middleware is applied to all the routes using app, we need not to use them in every single route seperately

app.get('/ride1', isAllowed, function(req, res) {
    res.json({msg: 'sucesfully ridden ride1'})
})

app.get('/ride2', isAllowed, function(req, res) {
    res.json({msg: 'sucesfully ridden ride2'})
})

app.listen(3000)