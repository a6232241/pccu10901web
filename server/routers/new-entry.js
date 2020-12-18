const express = require('express')
const app = express()

app.get('/new-entry', (req, res, next) => {
    if (!req.body.title || !req.body.body) {
        res.status(400)
            .send("Entries must have a title and a body.");
        return;
    }

    entries.push({
        title: req.body.title,
        content: req.body.body,
        published: new Date()
    });

    res.redirect("/");
})

module.exports = app