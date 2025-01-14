// LECTURE => 6.2 | Auth And Connecting FE To BE

const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors');
const JWT_SECRET = 'randomString';

const app = express();

app.use(cors())

app.use(express.json());

const users = [];

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
        res.json('user already exsists')
    }
    console.log(users);
})

app.post('/signin', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // let isPresent = false;
    let user = null

    user = users.find(user => user.username === username && user.password === password)

    let token = null

    if(user) {
        token = jwt.sign({
            username:username
        }, JWT_SECRET)
        user.token = token
        res.json({
            token: token,
        })
    } else {
        res.json({
            msg: 'usernot found, incorrect username or password'
        })
    }
    console.log(users);
})

app.get('/me', function(req, res) {
    const token = req.headers.token
    let info = null
    info = jwt.verify(token, JWT_SECRET);

    if(info) {
        users.map(user => {
            if(user.username === info.username) {
                res.json({
                    username: user.username,
                    password:user.password,
                    token: user.token
                })
            }
        })
    } else {
        res.send('invalid token')
    }
})

app.listen(3000);