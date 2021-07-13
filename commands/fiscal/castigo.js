module.exports = {
    name: 'castigo', //nome do comando que vai ser executado
    aliases:[], //como usar: ['aliases', 'separados']
    cooldown: 120, // Valor em segundos
    permlevel: 2, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    description: "descricão",
    async execute(client, message, cmd, args, Discord, profileData) {

        //DELETAR O COMANDO APOS SER ENVIADO.
        message.delete().catch();

        if (message.mentions.members.size === 0)
            return message.reply("Você não marcou quem eu deveria mandar pro castigo... é pra castigar todo mundo?").then(function (message) {
                message.react("👍")
            }).catch(function () {
                message.reply("Tudo bem punindo todo mundo...");
            });;

        if (!message.guild.me.permissions.has("MOVE_MEMBERS"))
            return message.reply("");

        let role = message.guild.roles.cache.find(r => r.name === "Castigo");
        let member = message.mentions.members.first();
        let canalatual = member.voice.channel.id;
        member.roles.add(role).catch(console.error);

        message.channel.send(message.mentions.users.first().toString() + " Vai para o castigo pobre.")

        //Conectar o usuario a este canal para castigalo
        member.voice.setChannel("857488932212178964").catch(console.error);

        // BOT SE CONECTAR JUNTO COM QUEM FOI ENVIADO PARA O CASTIGO PARA TER UMA CONVERSA
        const channel = client.channels.cache.get("857488932212178964");

        if (!channel) return console.error("Este canal não existe");
        channel.join().then(connection => {
            console.log("Estou castigando alguem");
        }).catch(e => {
            console.error(e);
        });

        // TEMPO DO CASTIGO
        setTimeout(() => {

            //REMOVENDO O CARGO DE CASTIGO
            member.roles.remove(role).catch(console.error);
            //MENSSAGEM AUTOMATICA
            message.channel.send("Tudo bem... você já pode sair");
            //DISCONECTANDO O BOT DO CANAL DE CASTIGO
            channel.leave();
            //DISCONECTANDO QUEM FOI ENVIADO E ENVIANDO DE VOLTA PRO CANAL ANTERIOR
            member.voice.setChannel(canalatual).catch(console.error);


        }, 10000);// 10 segundos em milesegundos
    }
}