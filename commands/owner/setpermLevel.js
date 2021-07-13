require('dotenv').config();
const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'setpermlevel', //nome do comando que vai ser executado
    aliases:[], //como usar: ['aliases', 'separados']
    cooldown: 0, // Valor em segundos
    permLevel: 4, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    description: "descricão",
    async execute(client, message, cmd, args, Discord) {

        message.delete().catch();
        const member = message.mentions.users.first();
        if(!member) return message.reply('Você não marcou ninguem').then(msg => {
            setTimeout(() => msg.delete(), 10000)
        });
        const PermLvl = args[1];
        if(!PermLvl) return message.reply('Você não digitou um permLevel (0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin)').then(msg => {
            setTimeout(() => msg.delete(), 10000)
        });
        if(PermLvl > 3) return message.reply('Digite um valor entre 0 e 3 (0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin)').then(msg => {
            setTimeout(() => msg.delete(), 10000)
        });

        const PLevel = await profileModel.findOneAndUpdate({

            userID: member.id,
        }, {
            permLevel: PermLvl,
        });

        return message.reply(`${member.toString()} Alterado com sucesso..`).then(msg => {
            setTimeout(() => msg.delete(), 10000)
        });
        

    }
}