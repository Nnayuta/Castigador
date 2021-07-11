require('dotenv').config();
const fetch = require('node-fetch');

module.exports = {
    name: 'valorant', //nome do comando que vai ser executado
    aliases:["va", "vava", "Vrank"], //como usar: ['aliases', 'separados']
    cooldown: 5, // Valor em segundos
    permlevel: 0, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    description: "descricão",
    async execute(client, message, cmd, args, Discord) {

        let target = message.mentions.members.first();

       // if(!target) return message.reply("Você precisa marcar 'Exemplo: $target @hgznnn' quem você quer saber as informações ");


        fetch('./db/valorant.json')
            .then(res => res.json())
            .then(json => console.log(json));




    }
}