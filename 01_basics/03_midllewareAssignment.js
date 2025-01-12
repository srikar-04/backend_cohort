const express = require('express')
//method url and timestamp

const app = express()

function middelware(req, res, next) {
    console.log('the method is : '+ req.method);

    console.log(`the url is : ${req.protocol}://${req.get('host')} ${req.originalUrl}}`);

    const now = new Date()

    console.log(`the timestamp is ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds}`)
    
    next();
}


app.get('/', middelware, function(req, res) {
    res.send('you are at the right port')
})



app.listen(5000)