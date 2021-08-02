const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    categ: String,
    cmdName: String,
    aliases: String,
    permlevel: Number,
    desc: String,
})

module.exports = mongoose.model('cmdlist', schema)