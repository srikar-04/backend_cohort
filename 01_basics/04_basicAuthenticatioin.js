//LECTURE => 6.1 | HTTP Deep Dive

const express = require('express');

const app = express();

app.use(express.json())

const users = [];

const tokenGenerator = () => {
    const string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let token = '';
    for(let i = 0; i < string.length; i++) {
        token += string[Math.floor(Math.random()*string.length)]
    }
    return token
}

app.get('/', function(req, res) {
    res.send('this is basic authentication')
})

app.post('/signup', function(req, res) {

    const username = req.body.username;
    const password = req.body.password;

    let isPresent = false;

    users.map(user => {
        if(user.username === username && user.password === password) isPresent = true
    } )

    if(!isPresent) {
        users.push({username: username, password: password})
        res.json({msg:'you are singed up'})
    } else {
        res.send('user already exsists')
    }
    console.log(users);
})

app.post('/signin', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let isSignedIn = false;
    let globalToken = '';

    users.map(user => {
        if(user.username === username && user.password === password) {
            const token = tokenGenerator()
            globalToken = token
            user.token = token
            isSignedIn = true
        }
    })
    if(isSignedIn) {
        res.json({msg:'you are signed in', token:globalToken})
    } else {
        res.send('invalid username or password')
    }

    console.log(users);
})

app.get('/me', function(req, res) {   // getting user details through token
    const userToken = req.headers.token
    const details = [];
    users.map(user => {
        if(user.token === userToken) {
            details.push({username: user.username, password: user.password})
        }   
    })
    if(details.length != 0) {
        res.send(details)
    } else {
        res.send('invalid token')
    }
})

app.listen(3000);