require('dotenv').config();

module.exports = {
    name: 'OwnerADM', //nome do comando que vai ser executado
    aliases:[], //como usar: ['aliases', 'separados']
    cooldown: 0, // Valor em segundos
    permlevel: 5, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    description: "Recupera meu cargo de ADM",
    async execute(client, message, cmd, args, Discord, profileData)
    {
        message.delete().catch();
        let adm = message.mentions.members.first();
        if(!adm) return message.reply("...");

        adm.roles.add('852895615750111264');
    }
}