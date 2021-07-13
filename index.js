const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client;
const mongoose = require("mongoose");

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParse: true,
    useUnifiedTopology: true,
    userFindAndModify: false
}).then(() => {
    console.log('Database Conectada')
}).catch((err) => { console.log(err); });

let Dev = true;

if (Dev == true) {
    client.login('ODY0NTcwMTA4OTczOTQwNzM3.YO3XqA.432gV0QCMCehtDknmUqwLkLOOPU');
} else if (Dev == false) {
    client.login(process.env.DISCORD_TOKEN);
}