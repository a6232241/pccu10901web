const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
    res.send('主業')
})

app.get('/guestbook', (req, res, next) => {
    res.render('guestbook')
})

module.exports = app