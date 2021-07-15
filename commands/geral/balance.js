require('dotenv').config();
const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'balance', //nome do comando que vai ser executado
    aliases: [], //como usar: ['aliases', 'separados']
    cooldown: 3, // Valor em segundos
    permLevel: 0, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    description: "Mostra seu dinheiro",
    async execute(client, message, cmd, args, Discord, profileData) {

        const money = new Discord.MessageEmbed()
            .setColor(profileData.colorComands)
            .setTitle(`Carteira de ${message.author.username}`)
            .setDescription(`
            \u200B
            🪙 ${profileData.coins} - PobreCoin
            \u200B
            `)
            .setFooter('Ajudando pobres desde - 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
            message.channel.send(money);
    }
}