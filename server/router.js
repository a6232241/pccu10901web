const index = require("routers/index.js")
const entry = require("routers/new-entry.js")

let router = [
    {
        name: 'index',
        router: index
    },
    {
        name: 'entry',
        router: entry
    }
]

module.exports = router