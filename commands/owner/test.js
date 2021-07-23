const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'test', //nome do comando que vai ser executado
    aliases: [], //como usar: ['aliases', 'separados']
    cooldown: 36000, // Valor em segundos
    permLevel: 5, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    CoinCost: 2, // Custo da moeda do servidor para usar comandos
    description: "descricão",
    async execute(client, message, cmd, args, Discord, profileData) {

        console.log(message.author.username);
	message.channel.send('testando 123 testando');

    }
}