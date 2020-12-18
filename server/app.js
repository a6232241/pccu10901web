// const http = require('http')
// const reqHanlder = (req, res) => {
//     console.log(`In comes a req to：${req.url}}`)
//     res.end('Hello, world!')
// }
// let app = http.createServer(reqHanlder)
// app.listen(port)

const express = require('express')
const app = express()
const port = 3000
const logger = require("morgan");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require('path')
// const router = require('router')

var zipdb = require("zippity-do-dah");
var weather = require('openweather-apis');
weather.setLang('zh_tw');
weather.setAPPID("d30d4191ebe5d952f389eb4df4fa8df6");

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

app.get(/^\/(\d{5})$/, function (req, res, next) {
    var zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);
    if (!location.zipcode) {
        next();
        return;
    }
    var latitude = location.latitude;
    var longitude = location.longitude;
    weather.setCoordinate(latitude, longitude);
    weather.getAllWeather(function (err, JSONObj) {
        if (err) {
            next();
            return;
        }
        res.json({
            zipcode: zipcode,
            city: JSONObj.name,
            temperature: JSONObj.main.temp
        });
    });
});

app.use(function (req, res) {
    res.status(404).render("404");
});

// app.use(router)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port} and now Class http://140.137.41.79:8039/ch4/ch4.html`)
})