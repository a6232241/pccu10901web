const {
    query
} = require("express")

// const express = require('express')
// const app = express()
const port = 3000

// 2.1-1
const Mustache = require('mustache')
let result = Mustache.render('Hi, {{first}} {{last}}!', {
    first: 'Nicolas',
    last: 'Cage'
});
console.log(result)

// 2.2-3
const randomInt = require('./src/js/random-integer')
console.log(randomInt())

const http = require('http')
const requestHanlder = (req, res) => {
    console.log(`In comes a request to：${req.url}}`)
    res.end('Hello, world!')
}
let app = http.createServer(requestHanlder)
app.listen(port)

// app.get('/', (res, req) => {
//     res.send('Hello')
// })

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })