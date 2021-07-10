require('dotenv').config();

module.exports = {
    name: 'vazapobre', //nome do comando que vai ser executado
    aliases:[], //como usar: ['aliases', 'separados']
    cooldown: 120, // Valor em segundos
    permlevel: 2, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    description: "Expulsa um pobre da call",
    async execute(client, message, cmd, args, Discord) {

    message.delete().catch();

    let pobre = message.mentions.members.first();
    if(!pobre) return message.reply("Qual pobre eu devo estourar");
    pobre.voice.setChannel(null).catch(console.error);

    message.channel.send(` ${pobre.toString()} Otárrio `);

    }
}