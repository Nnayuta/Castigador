require('dotenv').config();
const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'help', //nome do comando que vai ser executado
    aliases:['h'], //como usar: ['aliases', 'separados']
    cooldown: 0, // Valor em segundos
    permLevel: 0, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    description: "Pega as informacoes dos comandos",
    async execute(client, message, cmd, args, Discord, profileData) 
    {

        console.log('teste');
        
    }
}