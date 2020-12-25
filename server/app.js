// const http = require('http')
// const reqHanlder = (req, res) => {
//     console.log(`In comes a req to：${req.url}}`)
//     res.end('Hello, world!')
// }
// let app = http.createServer(reqHanlder)
// app.listen(port)

const express = require('express')
const app = express()
const port = 3001
const logger = require("morgan");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require('path')

app.set('view engine', 'ejs')

let entries = [];
app.locals.entries = entries;
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {
    console.log("req IP: " + req.url);
    console.log("req date: " + new Date());
    next()
});

app.use(function (req, res, next) {
    var filePath = path.join(__dirname, "public", req.url);
    fs.stat(filePath, function (err, fileInfo) {
        if (err) {
            next();
            return;
        }
        if (fileInfo.isFile()) {
            res.sendFile(filePath);
        } else {
            next();
        }
    });
});

app.get("/random/:min/:max", function (req, res) {
    var min = parseInt(req.params.min);
    var max = parseInt(req.params.max);
    if (isNaN(min) || isNaN(max)) {
        res.status(400);
        res.json({
            error: "Bad request."
        });
        return;
    }
    var result = Math.round((Math.random() * (max - min)) + min);
    res.json({
        result: result
    });
});

let guestbook = require("./routers/guestbook")
app.use(guestbook)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port} and now Class http://140.137.41.79:8039/ch4/ch4.html`)
})