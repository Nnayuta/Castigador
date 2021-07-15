require('dotenv').config();
const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'reactionrole', //nome do comando que vai ser executado
    aliases:[], //como usar: ['aliases', 'separados']
    cooldown: 0, // Valor em segundos
    permLevel: 5, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    description: "descricão",
    async execute(client, message, cmd, args, Discord, profileData) {

        message.delete().catch();

        const channel = '863226711779835975';
        const Valorant = message.guild.roles.cache.find(role => role.name === "Valorant");
        const Minecraft = message.guild.roles.cache.find(role => role.name === "Minecraft");
 
        const MinecraftEmoji = '🟩';
        const ValorantEmoji = '🟥';
 
        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Selecione os jogos que vc joga')
            .setDescription('AAAAAAAAA')
 
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(Valorant);
        messageEmbed.react(Minecraft);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === ValorantEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Valorant);
                }
                if (reaction.emoji.name === MinecraftEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(Minecraft);
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
                if (reaction.emoji.name === ValorantEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Valorant);
                }
                if (reaction.emoji.name === MinecraftEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(Minecraft);
                }
            } else {
                return;
            }
        });
    }
 
}