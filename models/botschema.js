const mongoose = require('mongoose');

const botSchema = new mongoose.Schema({
    Status: {type: String},
    Description1: {type: String},
    Description2: {type: String},
    Description3: {type: String},
    Description4: {type: String},
})

const model = mongoose.model('BotStatus', botSchema);

module.exports = model;