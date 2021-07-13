require('dotenv').config();
const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'balance', //nome do comando que vai ser executado
    aliases:[], //como usar: ['aliases', 'separados']
    cooldown: 0, // Valor em segundos
    permLevel: 0, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    description: "descricão",
    async execute(client, message, cmd, args, Discord, profileData) {
        message.channel.send(`Seu pobre dinheirinho é: ${profileData.coins},  seu banco: ${profileData.bank}`);
    }
}