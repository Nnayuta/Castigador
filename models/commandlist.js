const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    cmd: String,
    aliases: String,
    permlevel: Number,
    desc: String,
})

module.exports = mongoose.model('cmdlist', schema)