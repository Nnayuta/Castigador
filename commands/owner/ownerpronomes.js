require('dotenv').config();

module.exports = {
    name: 'ReactPronomes', //nome do comando que vai ser executado
    aliases:[], //como usar: ['aliases', 'separados']
    cooldown: 0, // Valor em segundos
    permlevel: 5, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    description: "Criar react de pronomes",
    async execute(client, message, cmd, args, Discord) {

        message.delete().catch();

        const channel = '863226711779835975';
        const FemRole = message.guild.roles.cache.find(role => role.name === "Feminino");
        const SpRole = message.guild.roles.cache.find(role => role.name === "Sem Preferencia");
        const MaleRole = message.guild.roles.cache.find(role => role.name === "Masculino");
    
 
        const FeminoEmoji = '♀️';
        const SemPreferenciaEmoji = '◻️';
        const MasculinoEmoji = '♂️';

        let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Pronomes')
        .setDescription('Reaja!')
        .addField(FeminoEmoji, 'Feminino', true)
        .addField(SemPreferenciaEmoji, 'Sem Preferencia/Tanto Faz', true)
        .addField(MasculinoEmoji, 'Masculino', true)
        .setFooter('Sempre respeite as regras!')

    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(FeminoEmoji);
    messageEmbed.react(SemPreferenciaEmoji);
    messageEmbed.react(MasculinoEmoji);
    


    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === FeminoEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(FemRole);
            }

            if (reaction.emoji.name === SemPreferenciaEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(SpRole);
            }

            if (reaction.emoji.name === MasculinoEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(MaleRole);
            }
        } else {
            return;
        }

    });

    client.on('messageReactionRemove', async (reaction, user) => {

        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;


        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === FeminoEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(FemRole);
            }

            if (reaction.emoji.name === SemPreferenciaEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(SpRole);
            }

            if (reaction.emoji.name === MasculinoEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(MaleRole);
            }
        } else {
            return;
        }
    });


 }}