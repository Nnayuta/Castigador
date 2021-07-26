const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client;
require('discord-buttons')(client);
const mongoose = require("mongoose");

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Database Conectada')
}).catch((err) => { console.log(err); });


client.login(process.env.DISCORD_TOKEN);

// ADICIONADO APENAS PARA TESTAR