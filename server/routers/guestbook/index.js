const express = require('express')
const app = express()
var api = express.Router();
const path = require('path')
app.set('views', path.join(__dirname, '../../views/guestbook'))
var guestbook = require('../../public/guestbookController');

api.route('/guestbook')
    .get(guestbook.list_all_entries)
    .post(guestbook.create_an_entry)
    .put(guestbook.update_an_entry)
    .delete(guestbook.delete_an_entry);

api.use(function (req, res, next) {
    res.status(404);
    if (req.accepts('json')) {
        return res.send({
            error: 'Not found'
        });
    }
    res.type('txt').send('Not found');
});

module.exports = app