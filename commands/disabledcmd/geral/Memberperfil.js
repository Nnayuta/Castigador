require('dotenv').config();
const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'perfil', //nome do comando que vai ser executado
    aliases: ['pf', 'p'], //como usar: ['aliases', 'separados']
    cooldown: 0, // Valor em segundos
    permLevel: 0, // 0 Geral , 1 Fiscal , 2 Admin, 3 SAdmin, 4 ServerOwner, 5 BotOwner
    description: "Editar seu perfil",
    async execute(client, message, cmd, args, Discord, profileData) {
        message.delete().catch();
        const PerfilMenu = args[0];


        switch (PerfilMenu) {

            default:
                VerSeuPerfil();
                break

            case 'cor':
                ColorPerfil();
                break
        }

        async function AtualizarCorPerfil(PerfilCorID) {
            const ChangeColor1 = await profileModel.findOneAndUpdate({
                userID: message.author.id,
            }, {
                colorComands: PerfilCorID,
            });

            message.reply('Sua cor de perfil foi atualizada :D').then(msg => {
                msg.delete({ timeout: 10000 })
            });
        }

        async function ColorPerfil() {
            const ColorEmbed = new Discord.MessageEmbed()
                .setColor(profileData.colorComands)
                .setTitle(`Perfil: ${message.author.username}`)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(`
                REAJA A UMA DAS CORES ABAIXO PARA TROCAR SUA COR DE MENSSAGEM
              `)
                .setFooter('Ajudando pobres desde - 2021', 'https://image.flaticon.com/icons/png/512/1396/1396219.png')
            let ColorReaction = await message.channel.send(ColorEmbed);
            await ColorReaction.react('🟪');
            await ColorReaction.react('🟥');
            await ColorReaction.react('⬛');
            await ColorReaction.react('🟦');

            const Filter = (reaction, user) => user.id == message.author.id;
            ColorReaction.awaitReactions(Filter, { max: 1, time: 30000, errors: ["time"] }).then(collected => {

                const reaction = collected.first();
                reaction.message.delete();

                if (reaction.emoji.name == '🟪') {

                    AtualizarCorPerfil('#9400d3');

                } else if (reaction.emoji.name == '🟥') {

                    AtualizarCorPerfil('#ff0000');
                }
                else if (reaction.emoji.name == '⬛') {
                    AtualizarCorPerfil('#000000');
                }
                else if (reaction.emoji.name == '🟦') {

                    AtualizarCorPerfil('#0000ff');
                }
            })


        }

        async function VerSeuPerfil() {

            console.log('EM BREVE');

            /*
            var userinf = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setThumbnail(message.author.avatarURL)
                .setDescription("Guild: " + message.guild)
                .setColor(profileData.colorComands)
                .addField("Full Username: ", `${message.author.username}#${message.author.discriminator}`, true)
                .addField("ID:", message.author.id, true)
                .addField('Current Nickname: ', message.author.toString(), true)
                .addField("Current Status: ", message.author.presence.status, true)
                .addField("Currently Playing: ", message.author.presence.game || "Nothing", true)
                .addField("Joined On: ", message.member.joinedAt, true)
                .addField("Account Type: ", client[message.author.bot], true)
                .setFooter("aaaaaaaaaaaa", client.user.avatarURL)

            message.channel.send(userinf);
            */

        }



    }
}