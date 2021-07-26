require('dotenv').config();
const profileModel = require('../../models/profileSchema');

const fs = require('fs');

module.exports = {
    name: 'roleupdatelist', //nome do comando que vai ser executado
    aliases: [], //como usar: ['aliases', 'separados']
    cooldown: 0, // Valor em segundos
    permLevel: 5, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    CoinCost: 0, // Custo da moeda do servidor para usar comandos
    description: "descricão",
    async execute(client, message, cmd, args, Discord, profileData) {


        const guild = client.guilds.cache.get('830235047512637470');

        guild.members.cache.array().forEach(member => {

             if(member.roles.cache.has("862784246530441307")){
                member.voice.setChannel("857488932212178964").catch(console.error);
             }

        });

    }
}