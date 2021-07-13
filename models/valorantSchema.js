const mongoose = require('mongoose');

const valorantSchema = new mongoose.Schema({
    userID: { type: String, require: true },
    serverID: { type: String, require: true },
    Tag: { type: String},
    CurrentRank: {type: String},
    MaxRank: {type: String},
    Agent: {type: String},
})

const model = mongoose.model('ValorantModels', valorantSchema);

module.exports = model;