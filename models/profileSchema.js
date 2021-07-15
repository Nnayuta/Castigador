const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true },
    serverID: { type: String, require: true },
    Level: { type: Number, require: true, default: 0 },
    coins: { type: Number, default: 1000 },
    bank: { type: Number },
    permLevel: { type: Number, default: 0 },
    colorComands: { type: String, default: 'RANDOM' },
    Birthday: { type: Date },
    Description: {type: String},
})

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;