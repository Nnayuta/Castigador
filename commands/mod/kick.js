require('dotenv').config();

module.exports = {
    name: 'kick', //nome do comando que vai ser executado
    aliases:[], //como usar: ['aliases', 'separados']
    cooldown: 0, // Valor em segundos
    permlevel: 3, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    description: "Expulsa um pobre do servidor.",
    async execute(client, message, cmd, args, Discord) {

        let canal = client.channels.cache.get("863031262147379220");

        const member = message.mentions.users.first();
        let rasao = args.slice(1).join(" ");

        if(!member) return message.reply("Quem deve ser expulso? TODO MUNDO?");
        if(member === message.author) return message.reply("Por qual motivo você iria expulsar a si mesmo?");

        if(!rasao) return message.reply(`Você precisa me da um motivo para expulsar esse pobre: ${message.mentions.users.first().toString()}`);

            let embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Expulsar Pobre')
            .setDescription(`${message.author.toString()} você realmente quer expulsar: ${message.mentions.users.first().toString()}? \r\n \r\n  Por Motivo: ${rasao}`);
 
        let messageEmbed = await canal.send(embed);

        const confirmar = '✅';
        const rejeitar = '❎'
        await messageEmbed.react(confirmar);
        await messageEmbed.react(rejeitar);

        const Filter = (reaction, user) => user.id == message.author.id;

        messageEmbed.awaitReactions(Filter, {max: 1, time: 30000, errors: ["time"]}).then(collected => {
            // Getting the first reaction in the collection.
            const reaction = collected.first();
            
            // Creating a switch statement for reaction.emoji.name.
            switch (reaction.emoji.name) {
                case "✅":

                    const memberTarget = message.guild.members.cache.get(member.id);
                    memberTarget.kick(rasao).then(() => {
                        let kicklog = client.channels.cache.get("863031262147379220");

                        let embed = new Discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('Pobre Expulso!')
                        .setDescription(`${message.author.toString()} Expulsou ${message.mentions.users.first().toString()} \r\n \r\n  Motivo: ${rasao}`);
             
                         kicklog.send(embed);
                      })
                      .catch(err => {
                        let kicklog = client.channels.cache.get("863031262147379220");

                        let embed = new Discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('Pobre muito poderoso!')
                        .setDescription(`${message.author.toString()} Não tenho poderes suficientes para expulsar ${message.mentions.users.first().toString()}`);
             
                         kicklog.send(embed);
                      });


                    break
                    case "❎":
                        let kicklog = client.channels.cache.get("863031262147379220");

                        let embed = new Discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('Estou Triste')
                        .setDescription(`${message.author.toString()} Como ousas me enganar? Pensei que iriamos expulsar um pobre :( `);
             
                         kicklog.send(embed);
                        break
            }
        })


    }
}