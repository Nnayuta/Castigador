require('dotenv').config();
const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'contaai', //nome do comando que vai ser executado
    aliases: [], //como usar: ['aliases', 'separados']
    cooldown: 0, // Valor em segundos
    permLevel: 0, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    CoinCost: 0, // Custo da moeda do servidor para usar comandos
    description: "descricão",
    async execute(client, message, cmd, args, Discord, profileData) {

        let time = Number(args[0]);

        for (let i = 0; i >= time; i++) {
            message.channel.send(time);
        }
    }
}