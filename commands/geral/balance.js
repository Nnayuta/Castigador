require('dotenv').config();

module.exports = {
    name: 'balance', //nome do comando que vai ser executado
    aliases:[], //como usar: ['aliases', 'separados']
    cooldown: 0, // Valor em segundos
    permlevel: 0, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    description: "descricão",
    async execute(client, message, cmd, args, Discord, profileData, valorantProfile)
    {
        message.channel.send(`Seu pobre dinheirinho é: ${profileData.coins},  seu banco: ${profileData.bank}`);
    }
}