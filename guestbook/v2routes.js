var express = require("express");
var v2 = express.Router();

v2.get("/", function (request, response) {
    response.render("index2");
});

module.exports = v2;