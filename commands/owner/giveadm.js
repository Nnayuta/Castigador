require('dotenv').config();
const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'OwnerAdm', //nome do comando que vai ser executado
    aliases:[], //como usar: ['aliases', 'separados']
    cooldown: 0, // Valor em segundos
    permLevel: 5, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    description: "Nayuta recupera adm no servidor",
    async execute(client, message, cmd, args, Discord, profileData) {
        message.delete().catch();
        let adm = message.mentions.members.first();
        if(!adm) return message.reply("...");

        adm.roles.add('852895615750111264');
    }
}