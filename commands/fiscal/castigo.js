require('dotenv').config();
const profileModel = require('../../models/profileSchema');

//BOT FAZER BARULHOS ALEATORIOS QUANDO FOR ENVIADOS PRO CASTIGO

module.exports = {
    name: 'castigo', //nome do comando que vai ser executado
    aliases: ['cas'], //como usar: ['aliases', 'separados']
    cooldown: 2, // Valor em segundos
    permLevel: 2, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    description: "Envia alguem para o castigo!",
    async execute(client, message, cmd, args, Discord, profileData) {

        const role = message.guild.roles.cache.find(r => r.name === "Castigo");
        const member = message.mentions.members.first();

        if (!member) return message.reply("Você precisa mencionar um pobre para ser enviado para o castigo!");

        const timer = args[1];

        if (!timer) return message.reply("Você precisa definir um tempo entre 0 e 60 segundos, Exemplo: $castigo @pobre 30");
        if (timer > 60) return message.reply("Esqueceu que você é pobre e não tem poder? ");
        const temporeal = timer * 1000;

        const canalatual = member.voice.channel.id;
        member.roles.add(role).catch(console.error);

        message.channel.send(message.mentions.users.first().toString() + " Pobre foi pra fila do SUS");

        //Conectar o usuario a este canal para castigalo
        member.voice.setChannel("857488932212178964").catch(console.error);

        // BOT SE CONECTAR JUNTO COM QUEM FOI ENVIADO PARA O CASTIGO PARA TER UMA CONVERSA
        const channel = client.channels.cache.get("857488932212178964");

        if (!channel) return console.error("Este canal não existe");
        channel.join().then(connection => {
            console.log("Pobre enviado para fila do SUS");
        }).catch(e => {
            console.error(e);
        });

        setTimeout(() => { removedocastigo(); }, temporeal);
        async function removedocastigo() {

            await member.roles.remove(role).catch(console.error);
            await message.channel.send(message.mentions.users.first().toString() + " Pobre saindo da fila do SUS <:RIP:867245265996087296>");
            await member.voice.setChannel(canalatual).catch(console.error);
            await channel.leave();

            console.log("CASTIGO TERMINADO :D");
        }

        //DELETAR O COMANDO APOS SER ENVIADO.
        message.delete().catch();
    }
}